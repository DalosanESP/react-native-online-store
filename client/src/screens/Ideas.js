import * as React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button, BackHandler, SafeAreaView, TextInput } from 'react-native';
import { widthToDp, heightToDp } from "rn-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { Fontisto } from '@expo/vector-icons';
import { IP_ADDRESS } from '../../.env';


export default function Ideas(contador) {
//Esta pantalla muestra las ideas de que la gente publica

    const [productos, setProductos] = useState(null)
    const navigation = useNavigation();
    const [search, setSearch] = useState('')
    const [refresh, setRefresh] = useState(false); //Esta  nueva constante sirve para refrescar la pagina


    //Este useEffect deshabilita el el botón del dispositivo de ir hacia atrás
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

    //Obtenemos los datos realizando una consulta al servidor
    useEffect(function () {
        async function fetchData() {
            const response = await fetch('http://' + IP_ADDRESS + ':8080/ideas');
            const json = await response.json();
            setProductos(json)
            setRefresh(!refresh);
        }
        fetchData();
    }, [contador]);

    //Constante que utilizamos para refrescar la pagina, antes de hacer esta accion, realiza una nueva consutla al servidor
    const reload = async () => {
        const response = await fetch('http://' + IP_ADDRESS + ':8080/ideas');
        const json = await response.json();
        setProductos(json)
        setRefresh(!refresh);
    }
    return (
        <SafeAreaView>
            <Header></Header>
            <View style={styles.row}>
                <Text style={styles.head}>Ideas</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ color: 'white' }}>..<Text></Text></Text>
                <Fontisto name="search" size={24} color="black" style={{ marginEnd: 10, borderColor: '#ecf0f1', borderWidth: 1 }} />

                <TextInput style={{ backgroundColor: 'white', borderWidth: 1 }} placeholder="  Search                                                                                    " onChangeText={(e) => {
                    setSearch(e)
                }} />
            </View>
            {search != '' && <View style={{}}>
                <FlatList style={styles.searchresultsinner} data={productos} renderItem={
                    ({ item }) => {
                        if (item.nombre.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <TouchableOpacity style={{ borderWidth: 1 }} onPress={() => navigation.navigate('Idea', { productoId: item.id })}>
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
                style={{ marginTop: 10, height: 570 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={productos}
                numColumns={2}
                keyExtractor={(productos) => productos.id}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity style={{}} onPress={() => navigation.navigate('Idea', { productoId: item.id })}>
                            <View style={styles.container}>
                                <Image
                                    source={{ uri: item.imagen, }} style={{ height: 165, width: 165 }}
                                />

                                <Text style={styles.title} numberOfLines={2}>
                                    {item.nombre}
                                </Text>

                            </View>
                        </TouchableOpacity>
                    </>
                )}
            >
            </FlatList>
            <View style={{ marginTop: 0 }}>
                <Button style={{ width: '100%' }}
                    title="Recargar" onPress={() => reload()}
                />
            </View>
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
        marginStart: 165
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
        marginBottom: 5,
        marginTop: 5

    },
});
