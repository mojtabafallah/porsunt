import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native';
import Home from './Home';
import {Container, Header, Content, Item, Input, Icon, Text, Form, Left, Button, Body, Title, Right} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {form} from '../assets/styles';
// import BackHandler from "react-native/Libraries/Utilities/BackHandler";


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
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
                      <Button style={{width: '49%', margin: 10, display: 'flex', justifyContent: 'center'}} primary onPress={this.login.bind(this)}>
                          <Text> ورود </Text>
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

            let json = await response.json();


            if (response.status === 200) {
                console.log(code_melli);
                console.log(password);
                console.log(json.data);
                this.setDataUser(json.data.api_token);
                Actions.home();

            }
            if (response.status === 501) {
                console.log('error');

            }
        } catch (error) {
            console.log(error);
        }

    }

    async setDataUser(api_token) {
        try {

            await AsyncStorage.setItem('apiToken', api_token)

        } catch (error) {
            console.log(error);
        }
    }

}
