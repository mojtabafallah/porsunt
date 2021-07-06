import React from "react";
import { AppRegistry, Image, StatusBar, AsyncStorage, BackHandler, View } from "react-native";
import {Actions} from "react-native-router-flux";

import {
    Button,
    Text,
    Container,
    List,
    ListItem,
    Content,
    Icon,
    Right,
    Left,
    Box
} from "native-base";

export default class SideBar extends React.Component {

    logout = async () => {
      AsyncStorage.removeItem('apiToken');
      AsyncStorage.removeItem('code_melli')
      AsyncStorage.removeItem('password')
      Actions.splash();
    }
    exit = async () => {
      BackHandler.exitApp();
    }

    constructor(props) {
        super(props);
        console.log('props ======================',props)
        this.state = {
          userData: {}
        }
    }

    // componentDidUpdate(prevProps, prevState) {
      // if (prevProps !== this.props) {
      //   this.fetchUserInfo();
      // }
    // }

    componentWillReceiveProps(nextProps) {
        this.fetchUserInfo();
         // Actions.refresh({key: 'drawer', open: false });

    }

     componentDidMount() {
       this.fetchUserInfo();

     }

     async fetchUserInfo() {
       const code_melli = await AsyncStorage.getItem('code_melli');
       const password = await AsyncStorage.getItem('password');
       const userInfo = await AsyncStorage.getItem('userInfo');
       this.setState({
         userData: JSON.parse(userInfo)
       })


       // try {
       //
       //   let response = await fetch(`https://porsunt.com/api/infouser?code_melli=${code_melli}&password=${password}`, {
       //     method: "GET",
       //     headers: {
       //       'Accept': 'application/json',
       //       'Content-Type': 'application/json'
       //     },
       //   })
       //
       //   let json = await response.json();
       //   console.log({json});
       // } catch (error) {
       //   console.log(error);
       // }

       // console.log('sdsdsdsdsd =1')
       //      const code_melli = await AsyncStorage.getItem('code_melli');
       // console.log('sdsdsdsdsd =2')
       //      const password = await AsyncStorage.getItem('password');
       // console.log('sdsdsdsdsd =3', await AsyncStorage.getItem('userInfo'))
       //      const userInfo = await AsyncStorage.getItem('userInfo');
       // console.log('sdsdsdsdsd =4')
       //      console.log({ userInfo })
       //      console.log({ code_melli });
       //      console.log({ password });
       //       this.setState({
       //         userData: JSON.parse(userInfo)
       //       })

    }

    render() {

      const routes = [
        {
          name: 'Home',
          title: 'صفحه اصلی',
          icon: 'logo-windows',
          route: Actions.home
        },
        {
          name: 'Report',
          title: 'گزارشات',
          icon: 'list',
          route: Actions.reports
        },
        {
          name: 'Logout',
          title: 'خروج از حساب',
          icon: 'arrow-back',
          route: this.logout
        },
        {
          name: 'Exit',
          title: 'خروج از برنامه',
          icon: 'close',
          route: this.exit
        },
      ];

        return (
            <Container>
                <Button
                  transparent
                  onPress={() => {
                      Actions.drawerClose()
                  }}
                >
                    <Icon name="close" />
                 </Button>
              <Image source={{uri: 'https://porsunt.com/storage/'+this.state.userData.avatar}} style={{ width: 100, height: 100, marginLeft: 'auto', marginRight: 'auto' }} />
              <Text style={{width: '100%', textAlign: 'center', marginTop: 15, marginBottom: 15}}>{this.state.userData.name}</Text>
              <List
                dataArray={routes}
                contentContainerStyle={{ marginTop: 20 }}
                renderRow={data => {
                  return (
                    <ListItem
                      button
                      onPress={() => data.route()}
                    >
                      <Left style={{flex:0.6}}><Icon name={data.icon} /></Left>
                      <Right style={{flex:0.4}}><Text>{data.title}</Text></Right>
                    </ListItem>
                  );
                }}
              />
            </Container>
        );
    }
}
