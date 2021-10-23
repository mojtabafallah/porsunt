import React, {Component} from 'react';
import {AsyncStorage , Alert} from 'react-native';
import Home from './Home';
import {Container, Header, Content, Item, Input, Icon, Text, Form, Left, Button, Body, Title, Right, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {form} from './../assets/styles';


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            code: {
                value: '',
                error: ''
            },
            mobile:{
                value:'',
                error:''
            }
        }
    }
    // componentWillMount() {
    //
    // }
    render() {

        return (
            <Container>
                <Header noLeft>
                    <Left>
                        <Button transparent>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>تایید کد پورسانت</Title>
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
                            placeholder="کد تایید را وارد نمایید"
                            keyboardType='numeric'
                            onChangeText={this.entenumber.bind(this)}
                            style={form.input}
                        />
                    </Item>
                    <Button full primary onPress={this.vertify.bind(this)}>
                        <Text> ارسال کد </Text>
                        <Spinner color="white" style={{position: 'absolute'}} animating={this.state.isLoading} />
                    </Button>
                </Content>
            </Container>
        )

    }
   async entenumber(text)
    {

        let mobile =await AsyncStorage.getItem('mobile');
        this.setState(
            {
                code:{
                    value:text,
                    error:''
                },
                mobile:{
                    value:mobile
                }
            }

        )
    }
    vertify()
{
    let {code,mobile}=this.state;

    if (code.value === '') {
        this.setState({
            code:
                {
                    value: '',
                    error: 'کد را وارد نمایید'
                }
        });
        return;
    }

    this.requestcheckSmsFromApi({
        code:code.value,
        mobile:mobile.value
    })
}


    async requestcheckSmsFromApi(param) {
        this.setState(preState => ({
            ...preState,
            isLoading: true
        }));
        let {code,mobile} = param;

        let response = await fetch('https://porsunt.com/api/register2', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                mobile
            })
        });
        let json = await response.json();



        if (response.status === 200) {
            Actions.finishreg();

        }
        if (response.status === 502) {
//            alert("کد نا معتبر است");
             Alert.alert(
                 "خطا در ارسال اطلاعات",
                 "کد نا معتبر است",
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
