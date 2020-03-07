import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './../screens/HomeScreen'
import DetailsScreen from '../screens/DetailsScreen';
import PronosticoScreen from '../screens/PronosticoScreen';

const Stack = createStackNavigator();

export default class StackNavigations extends Component{
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName = "Home"
                    screenOptions = {{
                        headerStyle: {
                            backgroundColor: '#007bff',
                            height: 80
                            }, 
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen 
                        name="El Tiempo Chile" 
                        component={HomeScreen} 
                    />
                    <Stack.Screen 
                        name="Details" 
                        component={DetailsScreen}  
                        options={({ route }) => ({ title: route.params.name,  })}/>
                    <Stack.Screen
                        name="Pronostico"
                        component={PronosticoScreen}
                        options={({ route }) => ({ title: route.params.name,  })}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}