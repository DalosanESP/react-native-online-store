import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableHighlight, BackHandler } from 'react-native';
import { useEffect } from 'react'
import Swiper from 'react-native-swiper';
import Header from './Header'
import MarqueeText from 'react-native-marquee';
import { useNavigation } from '@react-navigation/native';

export default function MainPage() {
//Pagina principal
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

    const navigation = useNavigation();
    return (
        <>
            <Header></Header>
            <ScrollView>
                <View style={{ height: 250 }}>
                    {/* Swipper que muestra los ultimos productos añadidos */}
                    <Swiper autoplay={true} autoplayTimeout={5} style={{}} paginationStyle={{ bottom: undefined, left: undefined, top: 260, right: "42%" }}>
                        <View style={styles.slide1}>
                            <Image source={require("../images/swiper/dk.jpg")} style={{ width: 410, height: 255 }} />
                        </View>
                        <View style={styles.slide1}>
                            <Image source={require("../images/swiper/impulse.jpg")} style={{ width: 410, height: 255 }} />
                        </View>
                        <View style={styles.slide1}>
                            <Image source={require("../images/swiper/superboy.jpg")} style={{ width: 410, height: 255 }} />
                        </View>
                        <View style={styles.slide1}>
                            <Image source={require("../images/swiper/youngJustice.jpg")} style={{ width: 410, height: 255 }} />
                        </View>
                    </Swiper>
                </View>
                {/* Banner New */}
                <View style={{ flexDirection: 'row', }}>
                    <Image source={require("../images/new/new.png")} style={{ width: 103, height: 40, backgroundColor: 'red', marginTop: 50 }} />
                    <Image source={require("../images/new/new.png")} style={{ width: 103, height: 40, backgroundColor: 'red', marginTop: 50 }} />
                    <Image source={require("../images/new/new.png")} style={{ width: 103, height: 40, backgroundColor: 'red', marginTop: 50 }} />
                    <Image source={require("../images/new/new.png")} style={{ width: 103, height: 40, backgroundColor: 'red', marginTop: 50 }} />
                </View>

                <View style={{ height: 200 }}>
                    {/* Marquee que muestra las nuevas figuras añadidas */}
                    <MarqueeText
                        speed={0.1}
                        marqueeOnStart={true}
                        loop={true}
                        style={{ marginTop: -121, height: 370 }}
                    >
                        <Image source={require("../images/new/batman.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/bart.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/connor.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/nw.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/joker.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/bane.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/dent.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/crane.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/dona.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/gar.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/raven.jpg")} style={{ width: 100, height: 250 }} />
                        <Image source={require("../images/new/roy.jpg")} style={{ width: 100, height: 250 }} />

                    </MarqueeText>
                </View>
                <Image source={require("../images/colecciones/collections.png")} style={{ width: 380, height: 35, marginStart: 10, marginTop: 80 }} />
                {/* Colecciones, cuando hacemos click en una de ellas, nos dirige a una pagina donde solo se muestran los productos de esta coleccion */}
                <View style={{ height: 250 }}>
                    <Swiper showsButtons={true} paginationStyle={{ bottom: undefined, left: undefined, top: 320, right: "45%" }}>
                        <View style={styles.slide1}>
                            <TouchableHighlight onPress={() => navigation.navigate('Coleccion', { coleccion: 'BATMAN' })}>
                                <Image source={require("../images/colecciones/batmanLogo.jpg")} style={{ width: 300, height: 200, marginTop: 30, borderRadius: 10 }}></Image>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.slide1}>
                            <TouchableHighlight onPress={() => navigation.navigate('Coleccion', { coleccion: 'FLASH' })}>
                                <Image source={require("../images/colecciones/flashLogo.png")} style={{ width: 300, height: 200, marginTop: 30, borderRadius: 10 }}></Image>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.slide1}>
                            <TouchableHighlight onPress={() => navigation.navigate('Coleccion', { coleccion: 'SUPERMAN' })}>
                                <Image source={require("../images/colecciones/supermanLogo.jpg")} style={{ width: 300, height: 200, marginTop: 30, borderRadius: 10 }} ></Image>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.slide1}>
                            <TouchableHighlight onPress={() => navigation.navigate('Coleccion', { coleccion: 'MULTIVERSE' })}>
                                <Image source={require("../images/colecciones/dc.png")} style={{ width: 300, height: 200, marginTop: 30, borderRadius: 10 }} ></Image>
                            </TouchableHighlight>
                        </View>
                    </Swiper>
                </View>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    slide1: {
        justifyContent: 'center', alignItems: 'center',
    },
});