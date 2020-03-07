import React, {Component} from 'react'
import { Card, CardItem, Body, Text, Left, Thumbnail, Button, Right, Row, Col } from 'native-base';
import {urlApi1, urlApi2, urlTiempo, urlLuna} from './../constants/Services'
import { ActivityIndicator } from 'react-native';

export default class CardsCity extends Component{
    constructor(props){
        super(props)
        this.state = {
            imageWeather: '',
            date:"",
            day: "",
            min:"",
            max:"",
            luna:"",
            luna_desc:"",
            desc:""
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = async() => {
        try{    
            let url = urlApi1.concat(this.props.id).concat(urlApi2)
            console.log(url)
            let data = await fetch(url)
            let json = await data.json()
            await this.setState({
                imageWeather: urlTiempo+json.day['1'].symbol_value, 
                date: json.day['1'].local_time, 
                min: json.day['1'].tempmin, 
                max: json.day['1'].tempmax,
                luna: urlLuna+json.day['1'].moon.symbol,
                luna_desc: json.day['1'].moon.desc.split(",")[0]+"\nI: "+ json.day['1'].moon.in+" - F: "+ json.day['1'].moon.out,
                desc: json.day['1'].symbol_description
            })
            console.log(this.state)
        }catch(e){
            console.log(e)
        }
    }

    render(){
        let {imageWeather, luna} = this.state
        return(
         
                    <Card>
                        <CardItem>
                            <Left>
                                {
                                   imageWeather!=""? <Thumbnail source={{uri: imageWeather}} /> : <ActivityIndicator style={{color: "#007bff"}} />
                                }
                                <Body>
                                    <Text>{this.props.city}    {this.state.min}° / {this.state.max}°</Text>
                                    <Text note>{this.props.region}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody style={{marginTop: 20}}>
                             <Row>
                                <Col style={{alignItems:'center'}}>
                                    {
                                        luna!=""? <Thumbnail small source={{uri: luna}} /> : null
                                    }
                                     
                                    <Text style={{fontSize: 12}}>{this.state.luna_desc}</Text>
                                </Col>
                                <Col>
                                    <Text style={{fontSize: 12, alignSelf:'center'}}>{this.state.desc}</Text>
                                </Col>
                            </Row>
                        </CardItem>
                        <CardItem>
                            <Left>
                                {
                                    this.props.show?
                                    <Button transparent onPress = { () => this.props.navigation.navigate('Details', {name: this.props.city, local: this.props.local})}>
                                        <Text style={{fontSize: 12}}>ciudades</Text>
                                    </Button> : null
                                }
                                
                            </Left> 
                            <Body>
                               <Button transparent onPress = { () => this.props.navigation.navigate('Pronostico', {name: this.props.city})}>
                                   <Text style={{fontSize: 12}}>mas datos</Text>
                               </Button>
                            </Body>
                            <Right>
                                <Text style={{fontSize: 12}}>Hora act.: {this.state.date}</Text>
                            </Right>
                        </CardItem>
                    </Card>
               
        )
    }
}