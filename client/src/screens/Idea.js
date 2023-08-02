import * as React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button, Alert, BackHandler, SafeAreaView, onPress, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from './Header';
import { IP_ADDRESS } from '../../.env';

export default function Idea({ route }) {
  //Muerstra la idea seleccionada
  var id = route.params.productoId
  const [productos, setProductos] = useState(null)
  const navigation = useNavigation();

  //Solicita a el servidor la idea pasandole su id
  useEffect(function () {
    async function fetchData(id) {
      const response = await fetch('http://' + IP_ADDRESS + ':8080/ideas/' + id);
      const json = await response.json();
      console.log(json)
      setProductos([json])

    }
    fetchData(id);
  }, [id]);


  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Header></Header>

      <FlatList
        data={productos}
        keyExtractor={(productos) => productos.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity style={{ backgroundColor: 'white' }} onPress={() => navigation.navigate('Ideas')}>
              <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
            </TouchableOpacity>
            <View style={{ height: 410 }}>
              <Image
                style={{ height: 410, width: 410 }}
                source={{ uri: item.imagen }}
              />
            </View>
            <View>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.user}>Idea Subida por: {item.user_nombre}</Text>
              <Text style={{ textAlign: 'justify', marginBottom: 20, marginEnd: 15, marginStart: 10 }}>{item.descripcion}</Text>

            </View>
          </>
        )}
      >
      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  name: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10
  },
  user: {
    fontSize: 17,
    marginBottom: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  droidSafeArea: {
    flex: 1,
  },
});
