import { useState } from "react";

import React from 'react'
import { IUsuario } from "../../interface/IUsuario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestPermissions } from "./Permisos";
import { launchCamera } from "react-native-image-picker";

export const useUsuario = () => {
  const [info, setInfo] = useState<IUsuario>({
    idUsuario: '',
    nombre: '',
    apellido: '',
    foto: ''
  })
  const [arrayInfo, setArrayInfo] = useState<IUsuario[]>([])
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const storeData = async (data: IUsuario[]) => {
    try {
      await AsyncStorage.setItem('miinfo', JSON.stringify(data));
    } catch (e) {
    }
  };
  const [imageUri, setImageUri] = useState<string | null>(null);

  const openCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      console.log('Permisos denegados');
      return;
    }

    launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
      if (response.didCancel) return;
      const asset = response.assets?.[0];
      if (asset?.uri) {
        setImageUri(asset.uri);
        setInfo((prev) => ({ ...prev, foto: asset.uri || '' }));
      }
    });
  };


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('miinfo');
      const notas: IUsuario[] = jsonValue ? JSON.parse(jsonValue) : [];
      setArrayInfo(notas);
    } catch (e) {
      console.log('Error leyendo datos', e);
    }
  };

  const deleteData = async (idData: string) => {
    try {
      console.log('ddddfffff', idData)
      const filtrar = arrayInfo.filter(x => x.idUsuario != idData);
      await AsyncStorage.setItem('miinfo', JSON.stringify(filtrar));
      setArrayInfo(filtrar);
    } catch (e) {
      console.log('Error leyendo datos', e);
    }
  };
  return {
    info,
    setInfo,
    setArrayInfo,
    arrayInfo,
    setIsEdit,
    isEdit,
    storeData,
    setImageUri,
    imageUri,
    openCamera,
    getData,
    deleteData

  }
}
