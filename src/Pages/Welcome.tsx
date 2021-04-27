import React from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { ButtonNext } from '../Components/ButtonNext'

import wateringImg from '../assets/watering.png'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export function Welcome() {
    const navigation = useNavigation()

    function handleStart() {
        navigation.navigate('UserIdentification')
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.wrapper}>

                <Text style={styles.title}>
                    Gerencie  {'\n'}
                    suas plantas de {'\n'}
                    forma fácil
                </Text>

                <Image source={wateringImg} style={styles.image} />

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <ButtonNext 
                    onPress={handleStart}
                />       
                
            </View>         

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        paddingTop: 20
    },

    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 28,
        fontFamily: fonts.heading,
        lineHeight: 28
    },

    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },

    image: {
        width: 292,
        height: 284,
        alignItems: 'center',
        justifyContent: 'center'
    },

    
})