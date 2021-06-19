import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import Home from './Home';
import {Container, Header, Content, Item, Input, Icon, Text, Form, Left, Button, Body, Title, Right} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {form} from './../assets/styles';


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            mobile: {
                value: '',
                error: ''
            }
        }
    }

    render() {

        return (
            <Container>
                <Header noLeft>
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
                            onChangeText={this.entenumberphone.bind(this)}
                            style={form.input}
                        />
                    </Item>
                    <Button full primary onPress={this.register.bind(this)}>
                        <Text> ارسال کد </Text>
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
        if(response.status===409)
        {
            alert(json.data.message);
        }else
        {
            alert(json.data.message);
            AsyncStorage.setItem('mobile',mobile);
            Actions.vertify();
        }




    }
}
