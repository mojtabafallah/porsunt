import React from "react";
import { AppRegistry, Image, StatusBar, AsyncStorage, BackHandler } from "react-native";
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
    Left
} from "native-base";

export default class SideBar extends React.Component {

    logout = () => {
      AsyncStorage.removeItem('apiToken');
      Actions.splash();
    }
    exit = () => {
      BackHandler.exitApp();
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
          name: 'Logout',
          title: 'خروچ از حساب',
          icon: 'arrow-back',
          route: this.logout
        },
        {
          name: 'Exit',
          title: 'خروچ از برنامه',
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
                    <Icon ios='ios-menu' android="md-menu" />
                </Button>
              <Image source={require('../assets/images/logo-pr.png')} style={{ width: 150, height: 60, marginLeft: 'auto', marginRight: 'auto' }} />
              <List
                dataArray={routes}
                contentContainerStyle={{ marginTop: 120 }}
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
