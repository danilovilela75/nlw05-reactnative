import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import daniloImg from '../assets/danilo.png'

export function Header() {

    const [ username, setUsername ] = React.useState<string>()

    React.useEffect(() => {
        async function loadUser() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUsername(user || '')
        }
        loadUser()
    }, [])

    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.hdOla}>Olá, </Text>
                <Text style={styles.hdNome}>{username}</Text>
            </View>

            <Image source={daniloImg} style={styles.hdIMG} />
            
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },

    hdOla: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },

    hdNome: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },

    hdIMG: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: 'black',
    },

})