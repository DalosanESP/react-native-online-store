import * as React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { widthToDp, heightToDp } from "rn-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {IP_ADDRESS} from '../../.env';


export default function Coleccion({route}) {
//Lista todos los productos de la coleccion selecionada
    //Recibe la informacion de la coleccion que debe de mostrar
    var coleccion = route.params.coleccion
    const [productos, setProductos] = useState(null)
    const navigation = useNavigation();

    //Envia la coleccion a el servidor y recoge los datos de esta
    useEffect(function () {
        async function fetchData() {
            const response = await fetch('http://' + IP_ADDRESS + ':8080/collection/' + coleccion);
            const json = await response.json();
            setProductos(json)
        }
        fetchData();
    }, [coleccion]);
    const [search, setSearch] = useState('')
    return (
        <SafeAreaView>
            <Header></Header>
            <StatusBar />
            <View>
            <TouchableOpacity style={{}} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{coleccion}'s Collection</Text>
            </View>
            <View style={styles.row}>
                <Text style={{color: 'white'}}>..<Text></Text></Text>
                <Fontisto name="search" size={24} color="black" style={{marginEnd: 10, borderColor: '#ecf0f1', borderWidth: 1, marginTop: 2}} />
                <TextInput style={{backgroundColor: 'white', borderWidth:1}} placeholder="  Search in this collection...                                                  " onChangeText={(e) => {
                    setSearch(e)
                }} />
            </View>
            {search != '' && <View style={styles.seacrhresultsouter}>
                <FlatList style={styles.searchresultsinner} data={productos} renderItem={
                    ({ item }) => {
                        if (item.nombre.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <TouchableOpacity style={{ borderWidth: 1 }} onPress={() => navigation.navigate('Product', { productoId: item.id })}>
                                    <View style={styles.result}>
                                        <Image
                                            source={{ uri: item.imagen1, }} style={{ height: 99, width: 100 }}
                                        />
                                        <View>
                                            <Text style={styles.text} numberOfLines={1}>
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
            <Text></Text>
            <FlatList
                style = {{marginBottom: 230}}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={productos}
                numColumns={2}
                keyExtractor={(productos) => productos.id}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity style={{}} onPress={() => navigation.navigate('Product', { productoId: item.id })}>
                            <View style={styles.container}>
                                <Image
                                    source={{ uri: item.imagen1, }} style={{ height: 165, width: 165 }}
                                />

                                <Text style={styles.text} numberOfLines={2}>
                                    {item.nombre}
                                </Text>

                                <Text style={styles.price}>
                                    {"\n"}
                                    {item.precio}
                                </Text>

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
    title:{
        fontSize: widthToDp(7),
        fontWeight: "bold",
        textAlign: 'center',
        flexShrink: 1,
        position: 'static',
        marginEnd: 3,
        marginStart: 3,
        marginTop: -20
    },
    row: {
        flexDirection: 'row',
        marginTop: 19,
        marginStart: 10
    },
    descripcion: {
        marginStart: 15,
        marginEnd: 100,
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
    text: {
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
