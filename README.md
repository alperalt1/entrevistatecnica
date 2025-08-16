This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

Se desarrollo una aplicacion movil en base a los requerimientos.
Se mantiene la siguiente estructura:
src
└── app
├── interface # Interfaces de TypeScript para tipar objetos
└── usuario
├── components # Componentes de UI personalizados, como botones e inputs
├── hooks # Hooks personalizados para permisos del dispositivo y otra lógica
└── pages # Pantallas o páginas de la aplicación, por ejemplo, UsuarioPage

## Step 1 Paso 1 - Componentes y Hooks

Componentes Personalizados
CustomButton: Componente de botón reutilizable con estilos y comportamiento personalizados.
CustomInput: Componente de input reutilizable que incluye título, placeholder y soporte para onChange.

Hooks
requestPermissions: Gestiona los permisos de cámara y almacenamiento interno tanto en Android como en iOS.
useUsuario: Gestiona toda la logica de negocio.

Registro de Páginas
UsuarioPage: Página principal donde los usuarios pueden crear, editar y eliminar usuarios.
Integra CustomButton y CustomInput.
Permite tomar fotos con la cámara y guardar la información del usuario en AsyncStorage.
Muestra la lista de usuarios con imágenes de perfil en forma circular y funcionalidades de editar/eliminar.

Registros agregados
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />

## Step 1 Paso 2 - Características Clave

Captura imágenes con la cámara del dispositivo y las guarda localmente.
Gestión de datos de usuarios usando AsyncStorage (crear, editar, eliminar).
UI consistente y reutilizable mediante componentes personalizados.
Los permisos se solicitan de manera dinámica usando un hook personalizado.
Las imágenes de perfil se muestran en formato circular para mejorar la interfaz.

# Preguntas

1. Diferencia principal entre React Native y ReactJS
   ReactJS sirve para hacer páginas web y genera HTML que ves en el navegador.
   React Native sirve para hacer apps móviles y usa componentes que se ven y funcionan como elementos nativos de Android o iOS (View, Text, Image, etc.).

2. Ciclo de vida de un componente en React Native
   Es el proceso que sigue un componente desde que aparece en pantalla hasta que desaparece:
   Montaje: El componente se crea y se muestra por primera vez. Aquí se puede usar useEffect para cargar datos.
   Actualización: Cuando cambian sus datos o propiedades. Se puede usar useEffect con dependencias para reaccionar a esos cambios.
   Desmontaje: Cuando se elimina de la pantalla. Se puede limpiar recursos como timers o listeners usando useEffect con retorno de limpieza.

3. Qué es AsyncStorage y cuándo usarlo
   AsyncStorage guarda información de manera local en el dispositivo como pares clave-valor. Sirve para guardar cosas como:
   Tokens de login.
   Configuraciones del usuario.
   Listas o datos temporales que no necesitan servidor.
   No es bueno para datos muy grandes o información sensible sin cifrado.

4. Diferencia entre FlatList y ScrollView
   ScrollView: Muestra todos los elementos de golpe. Bueno para listas cortas, pero lento si hay muchos.
   FlatList: Solo muestra los elementos visibles y va cargando más al hacer scroll. Mejor para listas grandes o dinámicas.
