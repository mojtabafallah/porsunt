import React, {Component} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import Home from './Home';
import {Container, Header, Content, Item, Input, Icon, Text, Form, Left, Button, Body, Title, Right, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {form} from './../assets/styles';


export default class Login extends Component {
    componentWillMount() {
        this.state = {
            isLoading: false,
            name: {
                value: '',
                error: ''
            },
            code_melli:{
               value:'',
               error:''
            },
            password:{
                value:'',
                error:''
            },
            password2:{
                value:'',
                error:''

            }
        }
    }
    render() {

        return (
            <Container>
                <Header noLeft>
                    <Left>
                        <Button
                          transparent
                          onPress={() => {
                              Actions.drawerOpen()
                          }}
                        >
                            <Icon ios='ios-menu' android="md-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title> تکمیل ثبت نام پورسانت</Title>
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
                            placeholder="نام و نام خانوادگی خود را وارد کنید"
                            onChangeText={this.entername.bind(this)}
                            style={form.input}
                        />
                    </Item>
                    <Item last rounded style={form.item}>
                        <Input
                            placeholder="کد ملی خود را وارد کنید"
                            keyboardType='numeric'
                            onChangeText={this.entercodemelli.bind(this)}
                            style={form.input}
                        />
                    </Item>
                    <Item last rounded style={form.item}>
                        <Input
                            placeholder="کلمه عبور خود را وارد کنید"
                            onChangeText={this.enterpassword.bind(this)}
                            style={form.input}
                            secureTextEntry
                        />
                    </Item>
                    <Item last rounded style={form.item}>
                        <Input
                            placeholder="کلمه عبور خود را دوباره وارد کنید"
                            onChangeText={this.enterpassword2.bind(this)}
                            style={form.input}
                            secureTextEntry
                        />
                    </Item>
                    <Button full primary onPress={this.finishreg.bind(this)}>
                        <Text> تکمیل ثبت نام </Text>
                        <Spinner color="white" style={{position: 'absolute'}} animating={this.state.isLoading} />
                    </Button>
                </Content>
            </Container>

        )

    }
    async entername(text)
    {
        let mobile =await AsyncStorage.getItem('mobile');
        this.setState(
            {
                name:{
                    value:text,
                    error:''
                },
                mobile:
                    {
                        value:mobile,
                        error:''
                    }
            }
        )
    }
    async entermobile(text)
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
    async entercodemelli(text)
    {
        this.setState(
            {
                code_melli:{
                    value:text,
                    error:''
                }
            }
        )
    }
    async enterpassword(text)
    {
        this.setState(
            {
                password:{
                    value:text,
                    error:''
                }
            }
        )
    }
    async enterpassword2(text)
    {
        this.setState(
            {
                password2: {
                    value: text,
                    error: ''
                }
            }
        )
    }

    finishreg()
{
    let {name,code_melli,password,password2,mobile}=this.state;

    this.requestRegisterFromApi({
        name,
        code_melli,
        password,
        password2,
        mobile
    })
}


    async requestRegisterFromApi(param) {
        this.setState(preState => ({
            ...preState,
            isLoading: true
        }));
        let {name,code_melli,password,password2,mobile} = param;
        name=name.value;

        code_melli=code_melli.value;

        password=password.value;

        password2=password2.value;

        mobile=mobile.value;

        let response = await fetch('https://porsunt.com/api/register3', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                code_melli,
                password,
                password2,
                mobile
            })
        });
      //  let json = await response.json();

        if (response.status === 200) {


              let userInfoResponse = await fetch(`https://porsunt.com/api/infouser?code_melli=${code_melli}&password=${password}`, {
                 method: "GET",
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 },
             })


             if (userInfoResponse.status === 200) {

                 let json = await userInfoResponse.json();
                 console.log({json});

                 await AsyncStorage.setItem('apiToken', json.tokenapi)
                 await AsyncStorage.setItem('code_melli', code_melli)
                 await AsyncStorage.setItem('password', password)
                 await AsyncStorage.setItem('userInfo', JSON.stringify(json))


//                 this.setDataUser(response.data.tokenapi, code_melli, password, json);


                  Alert.alert(
                      "ثبت نام موفق",
                      "خوش آمدید ثبت نام شما با موفقیت انجام شد",
                      [

                        { text: "تایید" }
                      ]
                 );

                 Actions.home();
             }



        }
        if (response.status === 502) {
//            alert("کلمه عبور مطابقت ندارد")
                 Alert.alert(
                     "خطا در ارسال اطلاعات",
                     "کلمه عبور مطابقت ندارد",
                     [

                       { text: "تایید" }
                     ]
                );
        //    console.log('error');
        }
        if (response.status === 503) {
             Alert.alert(
                 "خطا در ارسال اطلاعات",
                 "خطایی به وجود آمده است دقت داشته باشد کلمه عبور باید حداقل 4 کاراکتر باشد. کد ملی وارد شده قبلا ثبت نام نکرده باشد. نام باید بصورت فارسی باشد. کد ملی باید معتبر باشد",
                 [

                   { text: "تایید" }
                 ]
            );
//            alert("خطایی به وجود آمده است دقت داشته باشد کلمه عبور باید حداقل 4 کاراکتر باشد. کد ملی وارد شده قبلا ثبت نام نکرده باشد. نام باید بصورت فارسی باشد. کد ملی باید معتبر باشد")
            //    console.log('error');
        }

        this.setState(preState => ({
            ...preState,
            isLoading: false
        }));

    }

    async setDataUser(api_token, code_melli, password, userInfo) {
        try {

            await AsyncStorage.setItem('apiToken', api_token)
            await AsyncStorage.setItem('code_melli', code_melli)
            await AsyncStorage.setItem('password', password)
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))

        } catch (error) {
            console.log(error);
        }
    }

}
