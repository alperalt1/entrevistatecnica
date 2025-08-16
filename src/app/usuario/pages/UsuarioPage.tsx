import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, Pressable, SafeAreaViewBase, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomInput } from '../components/CustomInput'
import { CustomButton } from '../components/CustomButton'
import { IUsuario } from '../../interface/IUsuario'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { launchCamera } from 'react-native-image-picker';
import { requestPermissions } from '../hooks/Permisos'
import { useUsuario } from '../hooks/UsuarioHooks'

export const UsuarioPage = () => {
  const { info, setInfo, arrayInfo, setArrayInfo, isEdit, setIsEdit, storeData, imageUri, setImageUri, openCamera, getData, deleteData } = useUsuario()

  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView>
      <CustomInput
        title='Nombre'
        value={info.nombre}
        onchange={(e) => setInfo((prev) => ({
          ...prev,
          nombre: e
        }))}
      />
      <CustomInput
        value={info.apellido}
        title='Apellido'
        onchange={(e) => setInfo((prev) => ({
          ...prev,
          apellido: e
        }))}
      />
      <CustomButton title="Agregar Imagen" onPress={openCamera} />
      {imageUri && (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: imageUri }}
            style={{ width: 120, height: 120, marginTop: 10, borderRadius: 10 }}
          />
        </View>
      )}
      <CustomButton
        title={isEdit ? 'Editar Usuario' : 'Crear Usuario'}
        onPress={() => {
          if (!isEdit) {
            const fecha = new Date();
            const payload: IUsuario = {
              ...info,
              idUsuario: fecha.toLocaleTimeString(),
              foto: imageUri || '' // asegúrate de guardar la foto seleccionada
            };
            const updatedArray = [payload, ...arrayInfo];
            setArrayInfo(updatedArray);
            storeData(updatedArray);
          } else {
            const filtrar = arrayInfo.filter(x => x.idUsuario != info.idUsuario);
            const payload: IUsuario = {
              ...info,
              foto: imageUri || info.foto // mantiene la foto si no cambiaste
            };
            const updatedArray = [...filtrar, payload];
            setArrayInfo(updatedArray);
            storeData(updatedArray);
            setIsEdit(false);
          }

          // Limpiar los estados
          setInfo({
            idUsuario: '',
            nombre: '',
            apellido: '',
            foto: ''
          });
          setImageUri(null);
        }}
      />
      <View style={{ height: imageUri ? '41%' : '61%' }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={arrayInfo}
          renderItem={(info) =>
            <View style={{
              backgroundColor: '#828282ff',
              borderRadius: 10,
              marginVertical: 10,
              marginHorizontal: 10
            }}>
              <View style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexDirection: 'row',
                padding: 0,
                margin: 0
              }}>
                <CustomButton
                  title='Editar'
                  onPress={() => {
                    console.log("Editar", info.item)
                    setIsEdit(true)
                    setInfo(info.item)
                  }}
                />
                <CustomButton
                  title='Eliminar'
                  onPress={() => {
                    console.log("Editar", info.item)
                    deleteData(info.item.idUsuario)
                  }}
                />
              </View>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <View>
                  <Text style={{ paddingHorizontal: 10 }}>{info.item.nombre}</Text>
                  <Text style={{ paddingHorizontal: 10 }}>{info.item.apellido}</Text>
                </View>
                <View>
                  {info.item.foto ? (
                    <Image
                      source={{ uri: info.item.foto }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 40,
                        marginBottom: 10,
                        marginRight: 10
                      }}
                    />
                  ) : (
                    <Text>Sin foto</Text>
                  )}
                </View>
              </View>

            </View>
          }
        />

      </View>
    </SafeAreaView >


  )
}
