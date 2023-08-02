import * as React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button, Alert, BackHandler, SafeAreaView, onPress, SearchBar, StatusBar, TextInput } from 'react-native';
import { widthToDp, heightToDp, width } from "rn-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { usuario } from './Login';
import { IP_ADDRESS } from '../../.env';
console.disableYellowBox = true;


export default function MisIdeas(contador) {
//Muestra las ideas del usuario

    const [productos, setProductos] = useState(null)
    const navigation = useNavigation();
    const [search, setSearch] = useState('')
    const [refresh, setRefresh] = useState(false);

    //Solicita al servidor las ideas del usuario
    useEffect(function () {
        async function fetchData() {
            const response = await fetch('http://' + IP_ADDRESS + ':8080/misIdeas/' + usuario.email);
            const json = await response.json();
            setProductos(json)
            setRefresh(!refresh);

        }
        fetchData();
    }, [contador]);

    return (
        <SafeAreaView>
            <Header></Header>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', {contador: contador})}>
                    <Ionicons name="arrow-back-circle-sharp" size={35} color="black" style={{marginStart: 10, marginTop:10}} />
                </TouchableOpacity>
                <Text style={styles.head}>Mis Ideas</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ color: 'white' }}>..<Text></Text></Text>
                <Fontisto name="search" size={24} color="black" style={{ marginEnd: 10, borderColor: '#ecf0f1', borderWidth: 1 }} />

                <TextInput style={{ backgroundColor: 'white', borderWidth: 1 }} placeholder="  Search                                                                                    " onChangeText={(e) => {
                    setSearch(e)
                }} />
            </View>
            {search != '' && <View style={styles.seacrhresultsouter}>
                <FlatList style={styles.searchresultsinner} data={productos} renderItem={
                    ({ item }) => {
                        if (item.nombre.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <TouchableOpacity style={{ borderWidth: 1 }} onPress={() => navigation.navigate('MiIdea', { productoId: item.id, contador: contador })}>
                                    <View style={styles.result}>
                                        <Image
                                            source={{ uri: item.imagen, }} style={{ height: 99, width: 100 }}
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
                style={{ height: 650 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={productos}
                numColumns={2}
                keyExtractor={(productos) => productos.id}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity style={{}} onPress={() => navigation.navigate('MiIdea', { productoId: item.id, contador: contador })}>
                            <View style={styles.container}>
                                <Image
                                    source={{ uri: item.imagen, }} style={{ height: 165, width: 165 }}
                                />
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.title} numberOfLines={2}>
                                        {item.nombre}
                                    </Text>
                                </View>
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
        marginStart: 0,
        marginTop: -20
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 15,
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
        marginBottom: 5,
        marginTop: 5
    },
});
