import { View, ScrollView, TouchableOpacity, StyleSheet, Text, Button } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Input } from 'react-native-elements';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {IP_ADDRESS} from '../../.env';

export default function Update({ route }) {
//Formulario para actualizar una idea del usuario
//Recibe la informacion del producto y la muestra para modificarla
    var id = route.params.productoId
    var nombre = route.params.nombre
    var descripcion = route.params.descripcion
    var imagen = route.params.imagen
    var contador = route.params.contador
    contador = contador + 1
    var [newNombre, setNewNombre] = useState("");
    var [newDescripcion, setNewDescripcion] = useState("");
    var [newImagen, setNewImagen] = useState("");
    
    
    const navigation = useNavigation();

    //Si el usuario no rellena un campo envia el original
    const handleFormSubmit = () => {
        if (newNombre === '') {
            newNombre = nombre
        }
        if (newDescripcion === '') {
            newDescripcion = descripcion
        }
        if (newImagen === '') {
            newImagen = imagen
        } 

        var cleanImage = encodeURIComponent(newImagen)
        fetch('http://' + IP_ADDRESS + ':8080/updateIdeas/' + id + '/' + newNombre + '/' + newDescripcion + '/' + cleanImage)
        navigation.navigate('MiIdea',{ productoId: id, contador: contador })
    };



    return (
        <SafeAreaView>
            <Header></Header>
            <TouchableOpacity style={{ marginTop: 10, marginStart: 10 }} onPress={() => navigation.navigate('Profile', {contador: contador})}>
                <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={styles.cardouthead}>Nombre de la Idea:</Text>
                    <Input style={styles.inputContainer}
                        placeholder={nombre}
                        placeholderTextColor="grey"
                        value={newNombre}
                        onChangeText={setNewNombre}
                    />
                    <Text style={styles.cardouthead}>Descripcion de la Idea:</Text>
                    <Input style={styles.inputContainer}
                        placeholder={descripcion}
                        placeholderTextColor="grey"
                        value={newDescripcion}
                        onChangeText={setNewDescripcion}
                    />

                    <Text style={styles.cardouthead}>Imagen Conceptual:</Text>
                    <Input style={styles.inputContainer}
                        placeholder={imagen}
                        placeholderTextColor="grey"
                        value={newImagen}
                        onChangeText={setNewImagen}
                    />
                        <Button
                            title='Enviar'
                            onPress={handleFormSubmit}
                            containerStyle={{ marginTop: 20, marginStart: 10, width: '45%'  }}
                        >
                        </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    cardouthead: {
        color: 'blue',
        width: '90%',
        fontSize: 30,
        fontWeight: '200',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    formContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
})