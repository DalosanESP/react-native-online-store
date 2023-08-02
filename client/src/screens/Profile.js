import * as React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert} from 'react-native';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usuario } from './Login';
import Header from './Header';
import {IP_ADDRESS} from '../../.env';

export default function () {
  //Muestra la pantalla del usuario, donde puede ver sus ideas y añadir una nueva, asi como salir de la app
    const [user, setUser] = useState(usuario);
    const navigation = useNavigation();
    //Imagen de fodndo
    const image = { uri: 'https://cdn.wallpapersafari.com/96/36/ZacTKP.jpg' };
    var contador = 0
    contador = contador + 1

    //Solicita al servidor la informacion del usuario
    useEffect(function () {
        async function fetchData() {
            const response = await fetch('http://' + IP_ADDRESS + ':8080/users/', usuario.email);
            const json = await response.json();
            console.log("cargo perfil")
            setUser(json)
        }
        fetchData();
    }, []);

    //Cerrar sesion del usuario
    const doUserLogOut = async function () {
        Alert.alert(
            //title
            '¿Seguro desea salir?',
            //body
            'Se cerrara su sesión, pero el carrito se guardara',
            [
                { text: 'Salir', onPress: (handleLogout) },
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancelo'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }


    const handleLogout = () => {
        // Eliminar los datos del usuario de la sesión actual
        setUser(null);
        // Redirigir al usuario de vuelta a la pantalla de login
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    useEffect(() => {
        if (!user) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }, [user, navigation]);

    if (!user) {
        return null; // asegura que no se renderice nada más en la pantalla
    }

        return (
            
            <View style={styles.container}>
                <Header></Header>
                <ImageBackground source={image} style={styles.image}>
              <View style={styles.header}>
                <Image
                  source={{ uri: usuario.picture }}
                  style={styles.avatar}
                />
                <Text style={styles.name}>{usuario.name}</Text>
                <Text style={styles.email}>{usuario.email}</Text>
              </View>
              </ImageBackground>
              <View style={styles.content}>
                <Text style={styles.sectionTitle}>¡Te escuchamos!</Text>
                <Text style={styles.text}>Si te gusta el universo de DC Comics y estas buscando una figura para agregar a tu coleccion que no esta en nuestro catálogo,
                                        puedes agregar una idea de su diseño con una imagen y una breve descripcion de como te gustaría que fuese la figura</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}  onPress={() => navigation.navigate('Form')}>Añadir Idea</Text>
                </TouchableOpacity>
                <Text style={styles.sectionTitle} >Mis Ideas</Text>
                <Text style={styles.text}>¡Consulta las ideas que has subido haciendo click en el botón de abajo! Si ya no estas 
                                        interesado en una idea que subiste puedes eliminarla o si quieres darle otro enfoque puedes
                                        editarla a tu gusto para tener tu figura ideal</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MisIdeas',{ contador: contador })}>
                  <Text style={styles.buttonText} >Ver Mis Ideas</Text>
                </TouchableOpacity>
                
              </View>
              <View>
              <Button style={{ width: '100%', marginTop: -100}}
                title="Salir" onPress={doUserLogOut}
              />
              </View>
            </View>
          );
        }
        
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
          },
          image: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            alignItems: 'center',
          },
          header: {
            paddingVertical: 30,
            alignItems: 'center',
          },
          avatar: {
            width: 150,
            height: 150,
            borderRadius: 75,
            marginBottom: 20,
          },
          name: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 10,
          },
          email: {
            fontSize: 18,
            color: '#fff',
          },
          content: {
            padding: 10,
          },
          sectionTitle: {
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 10,
          },
          text: {
            fontSize: 16,
            marginBottom: 10,
            justifyContent: 'center',
            textAlign: 'justify',
            alignItems: 'center',
          },
          button: {
            backgroundColor: '#4caf50',
            paddingVertical: 6,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignSelf: 'stretch',
            marginBottom: 20,
          },
          buttonText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          },
        });