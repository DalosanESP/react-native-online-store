import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {IP_ADDRESS} from '../../.env';
import { Entypo } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

//Loggin de la app

//Creamos la variable usuario para poder exportarla mas adelatne
var usuario;
export default function App() {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = React.useState(null); //Constante del token de google necesaria para realizar el loggin
  const [user, setUser] = React.useState(null); //Constante que envia el usuairo al servidor para almacenar los datos
  const [request, response, promptAsync] = Google.useAuthRequest({ //Estas son las credenciales de la API de google que nos permite utilizar esta herramienta
    clientId: "808534312119-6ksgphp054achp78itsa3hn1tlv9ob8p.apps.googleusercontent.com",
    iosClientId: "808534312119-os3nrp8slpiu7igst6mba11csvi47p24.apps.googleusercontent.com",
    androidClientId: "721874123915-9drei6htfdaphc2uhat4m3kdppedpajp.apps.googleusercontent.com"
  });

//Gestiona si las credenciales son correctas
  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken])

  //Aqui mandamos los datos del usuario al servidor de google para que realicen el loggin
  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const useInfo = await response.json();
    setUser(useInfo);
    sendUser(useInfo);
  }

  //Enviamos los datos al servidor de la aplicacion para que almacene los datos del usuario
  const sendUser = async (user) => {
    try {
      usuario = user
      const response = await fetch('http://' + IP_ADDRESS + ':8080/createUser', user);
    } catch (error) {
      console.error(error);
    }
  };

//Si un usuario ha iniciado sesion, lo reedirige a la pagina principal
  const Home = () => {
    React.useEffect(()=>{
      if (user) {
        navigation.navigate('Home')
      }
    },[user, navigation])
   
  }

  const handlePress = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      {user && <Home />}
      {user === null &&
        <>
        <View>
        <TouchableOpacity onPress={handlePress}>
          <Entypo name="circle-with-cross" size={24} color="black" style={{marginTop: -150, marginStart: 350}} />
          </TouchableOpacity>
          </View>
          <Image source={require("../images/login/DCLogo.png")} style={{ width: 300, height: 300}} />
          <Image source={require("../images/login/mcFarlane.png")} style={{ width: 350, height: 40}} />
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <Image source={require("../images/login/googleButton.png")} style={{ width: 250, height: 52 }} />
          </TouchableOpacity>
        </>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//Exportamos la variable usuario para que sea utilizada en otros componentes de la aplicacion
export {usuario}