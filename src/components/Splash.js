import React,{ Component } from 'react';
import {View, Text, Image, ActivityIndicator, AsyncStorage} from 'react-native';
import {Container, Spinner} from 'native-base';
import styles from './../assets/styles/index';
import {Actions} from 'react-native-router-flux';
import BackHandler from "react-native/Libraries/Utilities/BackHandler";

export default class Splash extends Component
{
    constructor() {

        super();

        this.CheckUserLogin().then(status =>
        {
            if(status)
            {
                Actions.home();

            }else {
                Actions.login();
            }
        });
    }

    handleBackPress = () => {
        return true;  // Do nothing when back button is pressed
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    // componentDidMount()
    // {
    //   // AsyncStorage.removeItem('apiToken');
    //
    //
    //
    //
    // }
  render(){

const style=styles.index;
    return (

      <Container style={style.containersplash} >

        <Image source={require('../assets/images/logo-pr.png')} style={{ width: 150, height: 60, marginBottom: 20 }} />
        <Text>در حال بارگذاری</Text>
        <Spinner />
      </Container>

    )
  }

   async  CheckUserLogin() {
        try {
            let apiToken =await AsyncStorage.getItem('apiToken');
            //console.log(apiToken);
            return apiToken === null
                 ? false
                : await this.CheckUserLoginFromApi(apiToken);

        }catch (error)
        {
            console.log(error)
        }
    }

    async CheckUserLoginFromApi(apiToken) {
        try {
            let response =await fetch(`https://porsunt.com/api/user?remember_token=${apiToken}`)
            return response.status === 200 ;
        }catch (error)
        {
            console.log(error);
        }
    }
}
