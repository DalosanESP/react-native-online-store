import * as React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button, Alert, SafeAreaView, onPress, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import  Header  from './Header';
import Swiper from 'react-native-swiper';
import { usuario } from './Login';
import {IP_ADDRESS} from '../../.env';

export default function Product({ route }) {
  //Muestra la informacion del producto seleccionado
  var id = route.params.productoId
  const [productos, setProductos] = useState(null)
  const navigation = useNavigation();

  //Solicita al servidor los datos del producto
  useEffect(function () {
    async function fetchData(id) {
      const response = await fetch('http://' + IP_ADDRESS + ':8080/product/' + id);
      const json = await response.json();
      setProductos([json])

    }
    fetchData(id);
  }, [id]);

  //Mensaje que avisa al usuairo de que el producto ha sido seleccionado y lo añade
  const addProduct = ({}) => {
    Alert.alert(
      //title
      '',
      //body
      'Producto Añadido al Carrito',
      [
          {
              text: 'Ok',
              style: 'cancel',
          },
      ],
      { cancelable: false },
  );
    fetch('http://' + IP_ADDRESS + ':8080/addToCart/'+ usuario.email +'/'+ productos[0].id)
  }

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Header></Header>
      
      <FlatList
        data={productos}
        keyExtractor={(productos) => productos.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity style={{backgroundColor: 'white'}} onPress={() => navigation.navigate('Products')}>
        <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
      </TouchableOpacity>
            <View style={{ height: 410 }}>
            <Swiper showsButtons={true} paginationStyle={{ bottom: undefined, left: undefined, top: undefined, right: -100 }}>
              <Image
                style={{ height: 410, width: 410 }}
                source={{ uri: item.imagen1 }}
              />
              <Image
                style={{ height: 410, width: 410 }}
                source={{ uri: item.imagen2 }}
              />
              <Image
                style={{ height: 410, width: 410 }}
                source={{ uri: item.imagen3 }}
              />
              <Image
                style={{ height: 410, width: 410 }}
                source={{ uri: item.imagen4 }}
              />
              <Image
                style={{ height: 410, width: 410 }}
                source={{ uri: item.imagen5 }}
              />
            </Swiper>
            </View>     
            <View>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.price}>{item.precio} $</Text>
              <Text style={{ textAlign: 'justify', marginBottom: 20, marginEnd: 15, marginStart: 10 }}>{item.descripcion}</Text>
              
            </View>
          </>
        )}
      >
      </FlatList>
      <Button
                title="Add to cart" onPress={addProduct}
              />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 10
  },
  droidSafeArea: {
    flex: 1,
  },
});
