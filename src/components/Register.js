import React, {Component} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import Home from './Home';
import {Container, Header, Content, Item, Input, Icon, Text, Form, Left, Button, Body, Title, Right, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {form} from './../assets/styles';


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            mobile: {
                value: '',
                error: ''
            }
        }
    }

    goBackScreen = () => {
        Actions.pop();
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' onPress={this.goBackScreen.bind(this)} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>عضویت به پورسانت</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text></Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Item last rounded style={form.item}>
                        <Input
                            placeholder="شماره تلفن خود را وارد نمایید"
                            keyboardType='numeric'
                            onChangeText={this.entenumberphone.bind(this)}
                            style={form.input}
                        />
                    </Item>
                    <Button full primary onPress={this.register.bind(this)}>
                        <Text> ارسال کد </Text>
                        <Spinner color="white" style={{position: 'absolute'}} animating={this.state.isLoading} />
                    </Button>
                </Content>
            </Container>

        )

    }
    entenumberphone(text)
    {
        this.setState(
            {
                mobile:{
                    value:text,
                    error:''
                }
            }
        )
    }
register()
{
    let {mobile}=this.state;

    if (mobile.value === '') {
        this.setState({
            tel:
                {
                    value: '',
                    error: 'تلفن همراه را وارد نمایید'
                }
        });
        return;
    }
    this.requestSendSmsFromApi({
        mobile:mobile.value
    })
}


    async requestSendSmsFromApi(param) {
         this.setState(preState => ({
            ...preState,
            isLoading: true
         }));
        let {mobile} = param;
        console.log(param);
        let response = await fetch('https://porsunt.com/api/register1', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile
            })
        });
        let json = await  response.json();

        console.log({json})

        if(response.status===200)
        {

            Alert.alert(
                 "پیغام",
                 json.data.message,
                 [

                   { text: "تایید" }
                 ]
            );
            AsyncStorage.setItem('mobile',mobile);
            Actions.vertify();

//            alert(json.message);


        } else if (response.status===402)
         Alert.alert(
              "پیغام",
              json.message,
              [

                { text: "تایید" }
              ]
         );
         else
        {
            Alert.alert(
                  "پیغام",
                  json.message,
                  [

                    { text: "تایید" }
                  ]
             );
        }


        this.setState(preState => ({
            ...preState,
            isLoading: false
         }));

    }
}
