import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native'

import { Header } from '../Components/Header'
import { EnviromentButton } from '../Components/EnviromentButton'
import { PlantCardPrimary } from '../Components/PlantCardPrimary'
import { Load } from '../Components/Load'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import api from '../Services/api'

interface EnvironmentProps {
    key: string
    title: string
}

interface PlantasProps {
    id: string
    name: string
    about: string
    water_tips: string
    photo: string
    environments: [string]
    frequency: {
        times: number
        repeat_every: string
    }
}

export function PlantSelect({ navigation }) {

    const [ locais, setLocais ] = React.useState<EnvironmentProps[]>([])
    const [ plantas, setPlantas ] = React.useState<PlantasProps[]>([])
    const [ filtroPlantas, setFiltroPlantas ] = React.useState<PlantasProps[]>([])
    
    const [ selected, setSelected ] = React.useState('all')
    
    const [ loading, setLoading ] = React.useState(true)
    
    const [ page, setPage ] = React.useState(1)
    const [ loadMore, setLoadMore ] = React.useState(true)

    React.useEffect(() => {
        async function loadLocais() {
            const { data } = await api.get('plants_environments?_sort=title&order=asc')
            setLocais(data)
        }
        loadLocais()
    }, [])

    async function loadPlantas() {
        const { data } = await api.get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`)

        if(!data)
            return setLoading(true)

        if(page > 1) {
            setPlantas(oldValue => [...oldValue, ...data])
            setFiltroPlantas(oldValue => [...oldValue, ...data])
        }
        else {
            setPlantas(data)
            setFiltroPlantas(data)
        }

        setLoading(false)
        setLoadMore(false)
    }

    React.useEffect(() => {
        loadPlantas()
    }, [])

    function filtrar(itemPlanta: string) {
        setSelected(itemPlanta)  
        
        if(itemPlanta == 'all')
            return setFiltroPlantas(plantas)
        
        const filtered = plantas.filter(plant => 
            plant.environments.includes(itemPlanta)
        )

        setFiltroPlantas(filtered)
    }

    function handleFetchMore(distance: number) {
        if(distance < 1)
            return
        
        setLoadMore(true)
        setPage(oldValue => oldValue + 1)
        loadPlantas()
            
    }

    function handlePlantSelect(plant: PlantasProps) {
        navigation.navigate('PlantSave', { plant })
    }

    if(loading)
        return <Load />

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>

                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>

            </View>

            <View>
                <FlatList 
                    data={locais}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton 
                            title={item.title}
                            active={item.key === selected}
                            onPress={() => filtrar(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList 
                    data={filtroPlantas}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item}
                            onPress={() => handlePlantSelect(item)}                            
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadMore
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    header: {
        paddingHorizontal: 30
    },

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },

    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },

    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },

    plants: {
        flex: 1
    },

})