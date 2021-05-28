import React from 'react'
import { 
    SafeAreaView ,
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Button } from '../Components/Button'

import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export function UserIdentification() {

    const navigation = useNavigation()

    const [ isFocused, setIsFocused ] = React.useState(false)
    const [ isFilled, setIsFilled ] = React.useState(false)
    const [ name, setName ] = React.useState<string>()

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!name)
    }

    function handleInputFocus() {
        setIsFocused(true)
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value)
        setName(value)
    }

    async function handleSubmit() {
        if(!name)
            return Alert.alert('Me diz como te chamas 🙄')

        await AsyncStorage.setItem('@plantmanager:user', name)
        navigation.navigate('Confirmation')
    }

    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <View style={styles.content}>
                    <View style={styles.form}>
                        <Text style={styles.emoji}>
                            { isFilled ? '😁' : '🙁' }
                        </Text>

                        <Text style={styles.titulo}>
                            Como podemos  {'\n'}
                            chamar você?
                        </Text>

                        <TextInput 
                            style={[
                                styles.input,
                                (isFocused || isFilled) &&
                                { borderColor: colors.green }
                            ]}
                            placeholder="Digite um nome"
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                            value={name}
                        />

                        <View style={styles.footer}>
                            <Button 
                                title="Confirmar" 
                                onPress={handleSubmit} 
                            />
                        </View>

                    </View>
                </View>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        width: '100%'
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },

    emoji: {
        fontSize: 54
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },

    titulo: {
        fontSize: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading
    },

    footer: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20
    },

})