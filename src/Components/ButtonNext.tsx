import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

import colors from '../../styles/colors'

export function ButtonNext({ ...props }) {
    return (
        <TouchableOpacity 
                style={styles.buttonNext} 
                activeOpacity={0.7}
                {...props}
            >
            <Text style={styles.buttonText}>
               <Feather 
                  name="chevron-right"
                  style={styles.textIcon}
               />
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    buttonText: {
        color: colors.white,
        fontSize: 24
    },

    buttonNext: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        width: 56,
        height: 56
    },

    textIcon: {
        color: colors.white,
        fontSize: 32
    },

})