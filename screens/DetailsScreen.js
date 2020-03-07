import React, {Component} from 'react'
import { ScrollView, ActivityIndicator, View, StatusBar } from 'react-native'
import {urlLocalidades, keyApi} from './../constants/Services'
import CardsCity from '../components/CardsCity'

export default class DetailsScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            localidades: null
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        try{
            let form = new FormData()
            form.append('localidad', this.props.route.params.local)
            form.append('key', keyApi)
            let data = await fetch(urlLocalidades, {method: 'post', body: form})
            let json = await data.json()
            this.setState({localidades: json.location.data})
            console.log('json',this.state)
        }catch(e){
            console.log(e)
        }
    }

    render(){
        console.log(this.props.route.params.local)
        return(
            <ScrollView>
                <StatusBar backgroundColor="#007bffdd" barStyle="dark-content" />
                {
                    this.state.localidades?
                    this.state.localidades.map((ele, index) => {
                        return <CardsCity
                                    key = {index} 
                                    id = {ele.url.split("=")[2]}
                                    city = {ele.name}
                                    region = {""}
                                    navigation = {this.props.navigation}
                                    local = {null}
                                    show = {false}
                                />
                    }) : <View style={{display: 'flex'}}>
                            <ActivityIndicator size="large" style={{marginTop: 200, color: "#007bff"}} />
                        </View>
                }
            </ScrollView>
        )
    }
}