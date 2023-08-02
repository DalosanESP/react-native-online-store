import * as React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, BackHandler, SafeAreaView, TextInput } from 'react-native';
import { widthToDp, heightToDp } from "rn-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { Fontisto } from '@expo/vector-icons';
import { IP_ADDRESS } from '../../.env';

export default function Products() {
    //Muestra todos los productos disponibles
    const [productos, setProductos] = useState(null) //Constante para almacenar prdocutos
    const navigation = useNavigation(); // Utiliza las funciones de la navegacion para poder redireccionar a otra pantalla desde un elememto 
    const [search, setSearch] = useState('') //Constantes para gestionar la barra de busqueda

    //useEffect que bloquea el boton del dispositivo de ir hacia atras
    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    //Realizamos la constulta a el servidor para obtener los datos de los productos
    useEffect(function () {
        async function fetchData() {
            const response = await fetch('http://' + IP_ADDRESS + ':8080/all');
            const json = await response.json();
            setProductos(json)
        }
        fetchData();
    }, []);


    return (
        <SafeAreaView>
            <Header></Header>
            <View style={styles.row}>
                <Text style={styles.head}>Productos</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ color: 'white' }}>..<Text></Text></Text>
                <Fontisto name="search" size={24} color="black" style={{ marginEnd: 10, borderColor: '#ecf0f1', borderWidth: 1 }} />

                <TextInput style={{ backgroundColor: 'white', borderWidth: 1 }} placeholder="  Search                                                                                    " onChangeText={(e) => {
                    setSearch(e)
                }} />
            </View>
            {/* Barra de busqueda para encontrar un producto filtrando por el nombre */}
            {search != '' && <View style={{}}>
                <FlatList style={{}} data={productos} renderItem={
                    ({ item }) => {
                        if (item.nombre.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                //Si hacemos clic en el producto, nos reedireciona a la vista del susodicho
                                <TouchableOpacity style={{ borderWidth: 1 }} onPress={() => navigation.navigate('Product', { productoId: item.id })}>
                                    <View style={styles.result}>
                                        <Image
                                            source={{ uri: item.imagen1, }} style={{ height: 99, width: 100 }}
                                        />
                                        <View>
                                            <Text style={styles.title} numberOfLines={1}>
                                                {item.nombre}
                                            </Text>
                                            <Text style={styles.descripcion} numberOfLines={4}>
                                                {item.descripcion}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    }
                } />
            </View>
            }
            <FlatList
            //El flat list nos permite mostrar los datos de todos los productos como si fuera un bucle
                style={{ marginBottom: 165, marginTop: 10 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={productos}
                numColumns={2}
                keyExtractor={(productos) => productos.id}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity style={{}} onPress={() => navigation.navigate('Product', { productoId: item.id })}>
                            <View style={styles.container}>
                                <Image style={{ height: 165, width: 165 }} source={{ uri: item.imagen1, }} />
                                <Text style={styles.title} numberOfLines={2}> {item.nombre}</Text>
                                <Text style={styles.price}>{"\n"}{item.precio} $</Text>

                            </View>
                        </TouchableOpacity>
                    </>
                )}
            >
            </FlatList>
        </SafeAreaView>
    )

};


const styles = StyleSheet.create({
    head: {
        fontSize: widthToDp(7),
        fontWeight: "bold",
        textAlign: 'center',
        flexShrink: 1,
        position: 'static',
        marginStart: 130
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 10,
        marginStart: 10
    },
    descripcion: {
        marginStart: 15,
        marginEnd: 110,
        textAlign: 'justify'
    },
    result: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        width: 170,
        marginStart: 17,
        marginEnd: 20,
        marginBottom: 10
    },
    image: {
        height: heightToDp(40),
        borderRadius: 7,
        marginBottom: heightToDp(2),
    },
    title: {
        fontSize: widthToDp(3.5),
        fontWeight: "bold",
        textAlign: 'left',
        flexShrink: 1,
        position: 'static',
        marginEnd: 3,
        marginStart: 3,

    },
    price: {
        fontWeight: "bold",
        textAlign: 'right',
        marginStart: 100,
        marginBottom: 7,
        color: 'black'
    },
});
