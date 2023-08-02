import * as React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button, Alert, BackHandler, SafeAreaView, onPress, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from './Header';
import { MaterialIcons } from '@expo/vector-icons';
import { IP_ADDRESS } from '../../.env';

export default function Product({ route }, { contador }) {
  //Muestra la idea selecicionada del ususario con las opciones de actualizar y borrar la idea
  var id = route.params.productoId
  var contador = route.params.contador
  const [productos, setProductos] = useState(null)
  const navigation = useNavigation();
  contador = contador + 1

  // Solicita al servidor una de las ideas del usuario pasandole la id
  useEffect(function () {
    async function fetchData(id) {
      const response = await fetch('http://' + IP_ADDRESS + ':8080/ideas/' + id);
      const json = await response.json();
      setProductos([json])
    }
    fetchData(id);
  }, [id, contador]);

  //Elimina la idea del usuairo
  const onDelete = async () => {
    fetch('http://' + IP_ADDRESS + ':8080/deleteIdea/' + id)
    navigation.navigate('MisIdeas', { contador: contador })
  }

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Header></Header>

      <FlatList
        data={productos}
        keyExtractor={(productos) => productos.id}
        renderItem={({ item }) => (
          <>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate('MisIdeas', { contador: contador })}>
                <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
              </TouchableOpacity>
              <MaterialIcons name="delete" size={30} color="red" onPress={() => onDelete(id)} style={{ marginStart: 340 }} />
            </View>
            <Button
              title="Editar" onPress={() => navigation.navigate('Update', { productoId: item.id, nombre: item.nombre, descripcion: item.descripcion, imagen: item.imagen, contador: contador })} />
            <View style={{ height: 410 }}>
              <Image
                style={{ height: 410, width: 410 }}
                source={{ uri: item.imagen }} />
            </View>
            <View>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={{ textAlign: 'justify', marginTop: 15, marginBottom: 20, marginEnd: 15, marginStart: 10 }}>{item.descripcion}</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10
  },
  droidSafeArea: {
    flex: 1,
  },
});
