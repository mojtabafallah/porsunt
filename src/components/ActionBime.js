import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import Home from './Home';
import {Container, Header, Content, Item, Input, Icon, Text, Form, Left, Button, Body, Title, Right, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {form} from './../assets/styles';


export default class ActionBime extends Component {
    constructor(props) {
        super();
        this._loadInitialState().done();
        this.state = {
            isLoading: false,
            name: {
                value: '',
                error: ''
            },
            family:
                {
                    value: '',
                    error: ''
                },
            code_melli: {
                value: '',
                error: ''
            },
            type_bime:
                {
                    value: props.codebime,
                    error: ''
                },
            api_token:
                {
                    value: this.get_api(),
                    error: ''
                }
        }

    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' onPress={() => Actions.pop()} />
                        </Button>
                    </Left>
                    <Body>
                        <Title> ثبت بیمه</Title>
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
                            placeholder="نام  بیمه گذار را وارد کنید"
                            onChangeText={this.entername.bind(this)}
                            style={form.input}
                        />
                    </Item>
                    <Item last rounded style={form.item}>
                        <Input
                            placeholder="نام خانوادگی بیمه گذار را وارد کنید"
                            onChangeText={this.enterfamily.bind(this)}
                            style={form.input}
                        />
                    </Item>
                    <Item last rounded style={form.item}>
                        <Input
                            placeholder="کد ملی بیمه گذار را وارد کنید"
                            keyboardType='numeric'
                            onChangeText={this.entercodemelli.bind(this)}
                            style={form.input}
                        />
                    </Item>
                    <Item last rounded style={form.item}>
                        <Input
                            placeholder="تلفن همراه بیمه گذار را وارد کنید"
                            keyboardType='numeric'
                            onChangeText={this.entermobile.bind(this)}
                            style={form.input}

                        />
                    </Item>

                    <Button full primary onPress={this.finishreg.bind(this)}>
                        <Text> ثبت بیمه </Text>
                        <Spinner color="white" style={{position: 'absolute'}} animating={this.state.isLoading} />
                    </Button>
                </Content>
            </Container>

        )

    }

    async _loadInitialState() {
        try {
            var value = await AsyncStorage.getItem('apiToken');
            if (value != null) {
                this._saveActiveID(value);
            }
        } catch (error) {

        }
    }

    _saveActiveID(id) {
        this.setState({api_token: id});
    }

    async get_api() {
        let apiToken1 = await AsyncStorage.getItem('apiToken');
       // console.log(apiToken1);
        return apiToken1;
    }

    async entername(text) {
        let mobile = await AsyncStorage.getItem('mobile');
        this.setState(
            {
                name: {
                    value: text,
                    error: ''
                },
                mobile:
                    {
                        value: mobile,
                        error: ''
                    }
            }
        )
    }

    async entermobile(text) {
        this.setState(
            {
                mobile: {
                    value: text,
                    error: ''
                }
            }
        )
    }

    async entercodemelli(text) {
        this.setState(
            {
                code_melli: {
                    value: text,
                    error: ''
                }
            }
        )
    }

    async enterfamily(text) {
        this.setState(
            {
                family: {
                    value: text,
                    error: ''
                }
            }
        )
    }


    finishreg() {

        let {name, family, mobile, code_melli, type_bime, api_token} = this.state;

        name=name.value;
       family=  family.value;
        mobile= mobile.value;
        code_melli= code_melli.value;
        type_bime= type_bime.value;




        this.requestActionFromApi({
            name,
            family,
            mobile,
            code_melli,
            type_bime,
            api_token
        })
    }


    async requestActionFromApi(param) {
        this.setState(preState => ({
            ...preState,
            isLoading: true
        }));

        let {name, family, mobile, code_melli, type_bime, api_token} = param;

        let response = await fetch('https://porsunt.com/api/save_bime', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                family,
                mobile,
                code_melli,
                type_bime,
                api_token
            })
        });
        //  let json = await response.json();

        if (response.status === 200) {
            //     Actions.finishreg();
            alert("ثبت بیمه با موفقیت انجام شد");
            Actions.home();
        }else

        {
            alert(response.status)
        }

        this.setState(preState => ({
            ...preState,
            isLoading: false
        }));
    }
}
