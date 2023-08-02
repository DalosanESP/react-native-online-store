import { View, ScrollView, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { usuario } from './Login';
import {IP_ADDRESS} from '../../.env';

export default function Form() {
//Formulario ara añadir una idea
    const navigation = useNavigation();
    //Estas constantes almacenan la informacion del formulario
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");

    //Elimina los datos del formulario anteriuor para poder utilizar el mismo de nuevo
    const limpiarFormulario = () => {
        setNombre('');
        setDescripcion('');
        setImagen('');
      };
    
    //Envia los datos del formualrio al servidor, si falta algun campo, muestra un mensaje de error y no envia nada
    const handleFormSubmit = () => {
        if (nombre === '' || descripcion === '' || imagen === '' ) {
            Alert.alert(
                //title
                'Formulario Incorrecto',
                //body
                'Por favor, rellene todos los campos',
                [
                    {
                        text: 'Ok',
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
            return;
        }else{    
        var cleanImage = encodeURIComponent(imagen)
        console.log(cleanImage)
        fetch('http://' + IP_ADDRESS + ':8080/insertIdeas/' + nombre +'/'+ descripcion+'/'+cleanImage+'/'+usuario.email+'/'+usuario.name)
        navigation.navigate('Ideas')
        } 
    };



    return (
        <SafeAreaView>
            <Header></Header>
            <TouchableOpacity style={{ marginTop: 10, marginStart: 10 }} onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.formContainer}>
                <Text style={styles.cardouthead}>Nombre de la Ieda:</Text>
                    <Input
                        placeholder="Nombre del Producto"
                        placeholderTextColor="grey"
                        value={nombre}
                        required={true}
                        onChangeText={setNombre}
                    />
                     <Text style={styles.cardouthead}>Descripcion de la Idea:</Text>
                    <Input
                        placeholder="Descripcion"
                        placeholderTextColor="grey"
                        value={descripcion}
                        required={true}
                        onChangeText={setDescripcion}
                    />

                     <Text style={styles.cardouthead}>Imagen Conceptual:</Text>
                    <Input
                        placeholder="URL de la imagen"
                        placeholderTextColor="grey"
                        value={imagen}
                        required={true}
                        onChangeText={setImagen}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            title='Enviar'
                            onPress={handleFormSubmit}
                            containerStyle={{ marginTop: 20, marginStart: 10, width: '45%'  }}
                        >
                        </Button>
                        <Button
                            title='Limpiar'
                            onPress={limpiarFormulario}
                            containerStyle={{ marginTop: 20,  marginStart: 20, width: '45%' }}
                        >
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    cardouthead: {
        color: 'blue',
        fontSize: 30,
        fontWeight: '200',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    formContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
    }
})