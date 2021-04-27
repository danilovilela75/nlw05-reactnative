import React from 'react'
import { 
    Text, 
    TouchableOpacity, 
    TouchableHighlightProps, 
    StyleSheet 
} from 'react-native'

import colors from '../../styles/colors'

interface ButtonProps extends TouchableHighlightProps {
    title: string
}

export function Button({ title, ...props }: ButtonProps) {
    return (
        <TouchableOpacity 
                style={styles.buttonNext} 
                activeOpacity={0.7}
                {...props}
            >
            <Text style={styles.buttonText}>
               { title }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    
    buttonNext: {
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        paddingHorizontal: 20,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    buttonText: {
        color: colors.white,
        fontSize: 18
    },

})