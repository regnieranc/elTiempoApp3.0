import React, {Component} from 'react'
import { StatusBar } from 'react-native'
import {CITIES} from './../constants/Cities'
import CardsCity from './../components/CardsCity'
import { ScrollView } from 'react-native-gesture-handler'




export default class HomeScreen extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <ScrollView>
                <StatusBar backgroundColor="#007bffdd" barStyle="dark-content" />
                {
                    CITIES ? 
                    CITIES.map((ele, index) => {
                        return(
                            <CardsCity 
                                key = {index} 
                                id = {ele.id}
                                city = {ele.name}
                                region = {ele.region}
                                navigation = {this.props.navigation}
                                local = {ele.local}
                                show = {true}
                            />
                        )
                    }) : null
                }
                
            </ScrollView>
        )
    }
}