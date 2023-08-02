import * as React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button, Alert, BackHandler, SafeAreaView, onPress, SearchBar, StatusBar, TextInput } from 'react-native';
import { widthToDp, heightToDp, width } from "rn-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { Ionicons } from '@expo/vector-icons';
import { usuario } from './Login';
import { MaterialIcons } from '@expo/vector-icons';
import {IP_ADDRESS} from '../../.env';
console.disableYellowBox = true;


export default function Cart(contador) {
//Muestra el carrito

    const [productos, setProductos] = useState(null)
    const [total, setTotal] = useState(null)
    const [refresh, setRefresh] = useState(false);
    const navigation = useNavigation();

//Solicita al servidor de los productos del carrito y el precio total de este
    useEffect(function () {
        async function fetchData() {
            const response1 = await fetch('http://' + IP_ADDRESS + ':8080/getTotal/' + usuario.email);
            const json1 = await response1.json();
            setTotal(json1)
            const response = await fetch('http://' + IP_ADDRESS + ':8080/getCart/' + usuario.email);
            const json = await response.json();
            setProductos(json)
        }
        fetchData();
    }, [contador]);

    //Elimina un elemento del carrito y vuelce a solicitar los datos del mismo
    const deleteFromCart = async (id) => {
        fetch('http://' + IP_ADDRESS + ':8080/deleteCart/' + id + '/' + usuario.email)
        const response = await fetch('http://' + IP_ADDRESS + ':8080/getCart/' + usuario.email);
        const json = await response.json();
        setProductos(json);
        const response1 = await fetch('http://' + IP_ADDRESS + ':8080/getTotal/' + usuario.email);
        const json1 = await response1.json();
        setTotal(json1)
        setRefresh(!refresh);
    }
//Al pagar, el carrito se elimina por completo
    const pagar = async () =>{
        fetch('http://' + IP_ADDRESS + ':8080/pagar/'+ usuario.email)
        const response = await fetch('http://' + IP_ADDRESS + ':8080/getCart/' + usuario.email);
        const json = await response.json();
        setProductos(json);
        const response1 = await fetch('http://' + IP_ADDRESS + ':8080/getTotal/' + usuario.email);
        const json1 = await response1.json();
        setTotal(json1)
        setRefresh(!refresh);
    }

    return (
        <SafeAreaView>
            <Header></Header>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('Products')}>
                    <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
                </TouchableOpacity>
                <Text style={styles.head}>Carrito</Text>
            </View>
            <>
             <View style={{marginBottom: 250}}>
                <ProductosList productos={productos} onDelete={deleteFromCart} />
                </View>
            </>
            <View style={{marginTop: -250}}>
            <FlatList
            style={{marginBottom: 30}}
                data={total}
                renderItem={({ item }) => {
                    return (
                        <Text style={{fontSize: widthToDp(5), fontWeight: "bold",}}>
                            {/* Total: {item.Total.toFixed(2)} */}
                            Total: {item.Total}$
                        </Text>
                    )
                }
                } />
            
                <Button title='Pagar' onPress={() => pagar()} />

            </View>
        </SafeAreaView>
    )
};

function ProductosList({ productos, onDelete }) {
    return (
        <FlatList
            data={productos}
            renderItem={({ item }) => (
                <View style={styles.result}>
                    <Image
                        source={{ uri: item.imagen1, }} style={{ height: 120, width: 120 }}
                    />
                    <View>
                        <Text style={styles.title} numberOfLines={1}>
                            {item.nombre}
                        </Text>
                        <Text style={styles.descripcion} numberOfLines={4}>
                            {item.descripcion}
                        </Text>
                        <View style={{flexDirection: 'row', marginStart: 15, marginTop: 10}}>
                        <Text style={{fontWeight: 'bold'}} numberOfLines={4}>
                            {item.precio}$
                        </Text>
                        <MaterialIcons name="delete" size={30} style={{marginStart: 190, marginBottom: 2}} color="red" onPress={() => onDelete(item.id)}/>
                        </View>
                    </View>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    head: {
        fontSize: widthToDp(7),
        fontWeight: "bold",
        textAlign: 'center',
        position: 'static',
        marginStart: 120
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 5
    },
    descripcion: {
        marginStart: 15,
        marginEnd: 130,
        textAlign: 'justify'
    },
    result: {
        flexDirection: 'row',
        borderWidth: 1,
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
        marginEnd: 120,
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


