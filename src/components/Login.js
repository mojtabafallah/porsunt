import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native';
import Home from './Home';
import {Container, Header, Content, Item, Input, Icon, Text, Form, Left, Button, Body, Title, Right, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {form} from '../assets/styles';
// import BackHandler from "react-native/Libraries/Utilities/BackHandler";


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            codemelli: {
                value: '',
                error: ''
            },
            password: {
                value: '',
                error: ''
            }
        }
    }



    componentDidMount() {
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    goBackScreen = () => {
        Actions.pop();
    }

    handleBackPress = () => {

        return true;  // Do nothing when back button is pressed
    }   // componentWillMount() {
    //
    //  }

    render() {
        const codemellierror = this.state.codemelli.error;
        const passworderror = this.state.password.error;
        const isLoading = this.state.isLoading;
        return (
          <Container>
              <Header>
                  <Body>
                      <Title>ورود به پورسانت</Title>
                  </Body>
                  <Right>
                      <Button transparent>
                          <Text></Text>
                      </Button>
                  </Right>
              </Header>
              <Content>
                  <Form style={form.StyleForm}>
                      <Item rounded style={form.item} error={codemellierror !== ''}>
                          <Input
                            placeholder="کد ملی"
                            style={form.input}
                            keyboardType='numeric'
                            onChangeText={this.changeCodemelliInput.bind(this)}
                          />
                      </Item>

                      <Text style={this._checkDisplay(codemellierror)}> پر کردن این فیلد الزامی ست</Text>


                      <Item last rounded style={form.item} error={passworderror !== ''}>
                          <Input
                            placeholder="کلمه عبور"
                            style={form.input}
                            onChangeText={this.changePasswordInput.bind(this)}
                            secureTextEntry
                          />
                      </Item>
                      <Text style={this._checkDisplay(passworderror)}> پر کردن این فیلد الزامی ست</Text>
                      <View style={{
                          flexDirection: "row",
                          justifyContent: 'center',
                          width: '100%',
                          height: 100,
                          padding: 20
                      }}>

                      <Button style={{width: '49%', margin: 10 , display: 'flex', justifyContent: 'center'}}  onPress={this.registeruser.bind(this)}>
                          <Text> ثبت نام </Text>
                      </Button>
                      <Button disabled={this.state.isLoading} style={{width: '49%', margin: 10, display: 'flex', justifyContent: 'center'}} primary onPress={this.login.bind(this)}>
                          <Text> ورود </Text>
                          <Spinner color="white" style={{position: 'absolute'}} animating={this.state.isLoading} />
                      </Button>

                      </View>
                  </Form>
              </Content>
          </Container>

        )

    }

    _checkDisplay(field) {
        if (field === '') {
            return {display: 'none'}
        } else {
            return {display: 'flex'}
        }


    }

    login() {
        let {codemelli, password} = this.state;
        if (codemelli.value === '') {
            this.setState({
                codemelli:
                  {
                      value: '',
                      error: 'فیلد کد ملی نمیتواند خالی بماند'
                  }
            });
            return;
        }

        if (password.value === '') {
            this.setState({
                password:
                  {
                      value: '',
                      error: 'فیلد کلمه عبور نمیتواند خالی بماند'
                  }
            });
            return;
        }
        this.requestLoginFromApi({
            code_melli: codemelli.value,
            password: password.value
        })
    }
    registeruser()
    {
        Actions.register();
    }
    changeCodemelliInput(text) {
        this.setState(
          {
              codemelli: {
                  value: text,
                  error: ''
              }
          }
        )
    }

    changePasswordInput(text) {
        this.setState(
          {
              password: {
                  value: text,
                  error: ''
              }
          }
        )
    }

    async requestLoginFromApi(params) {
        this.setState(preState => ({
            ...preState,
            isLoading: true
        }));

        try {
            let {code_melli, password} = params;

            let response = await fetch('https://porsunt.com/api/login', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code_melli,
                    password
                })

            });

            let loginData = await response.json();


            if (response.status === 200) {
                console.log(code_melli);
                console.log(password);
                console.log(loginData.data);

                try {

                    let response = await fetch(`https://porsunt.com/api/infouser?code_melli=${code_melli}&password=${password}`, {
                        method: "GET",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    })

                    console.log(`https://porsunt.com/api/infouser?code_melli=${code_melli}&password=${password}`)

                    let json = await response.json();
                    console.log({json});

                    this.setDataUser(loginData.data.api_token, code_melli, password, json);
                } catch (error) {
                    console.log(error);
                }
                Actions.home();

            }
            if (response.status === 501) {
                console.log('error');

            }

            this.setState(preState => ({
                ...preState,
                isLoading: false
            }));
        } catch (error) {
            console.log(error);
        }
    }

    async setDataUser(api_token, code_melli, password, userInfo) {
        try {

            await AsyncStorage.setItem('apiToken', api_token)
            await AsyncStorage.setItem('code_melli', code_melli)
            await AsyncStorage.setItem('password', password)
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))

            Actions.drawerClose()

        } catch (error) {
            console.log(error);
        }
    }

}
