import { StyleSheet, TouchableOpacity, View, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { usuario } from './Login';
export default function HomeHeadNav() {
    //Esto es la cabecera de la APP. Desde ella, podemos acceder al carrtio, el perfil y la pagina principal
    const navigation = useNavigation();
    var contador = 0;
    contador = contador + 1
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { navigation.navigate('Cart', { contador: contador }) }}>
                    <Entypo name="shopping-cart" size={31} color="black" style={{ color: 'white', width: 40, height: 30, marginTop: 10, marginStart: 15 }} />
                </TouchableOpacity>
                <View style={styles.containerin}>
                    <TouchableHighlight onPress={() => navigation.navigate('Home')}>
                        <Image source={require('../images/header/headerMCF.jpg')} style={{ width: 220, height: 20, marginStart: -250 }} />
                    </TouchableHighlight>
                    <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                        <Image
                            source={{ uri: usuario.picture }} style={{ height: 45, width: 45, borderRadius: 100, marginEnd: 10 }}></Image>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'black',
        color: 'white'
    },
    containerin: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'white'
    },
})
