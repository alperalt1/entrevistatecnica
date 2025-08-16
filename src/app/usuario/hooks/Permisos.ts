import { PermissionsAndroid, Platform } from "react-native";

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ];

    // Android 13+
    if (Platform.Version >= 33) {
      permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
    }

    const granted = await PermissionsAndroid.requestMultiple(permissions);
    return (
      granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
      (granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.READ_MEDIA_IMAGES'] === PermissionsAndroid.RESULTS.GRANTED)
    );
  }
  return true;
};
