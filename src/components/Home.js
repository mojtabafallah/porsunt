import React from 'react';
import {AsyncStorage} from 'react-native';
import {Container, Header, Right, Left, Icon, Button, Content} from 'native-base'
import {View, Text, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Bime from "./Bimes";
import BackHandler from "react-native/Libraries/Utilities/BackHandler";

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            bimes: []
        }
        this.getBimesReq();
        AsyncStorage.getItem('apiToken', (error, result) => {
            //  console.log(result);
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {

        return true;  // Do nothing when back button is pressed
    }

    goBackScreen = () => {
        Actions.pop();
    }


    render() {
        return (
          <Container>
              <Header>
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
                  <Right>
                      <Text>
                          صفحه اصلی
                      </Text>
                  </Right>
              </Header>
              <Content>
                  <FlatList
                    data={this.state.bimes}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                  />
              </Content>
          </Container>
        )
    }

    renderItem({item}) {
        //  console.log(item)
        return <Bime bime={item}/>
    }

    getBimesReq() {
        fetch('https://porsunt.com/api/bimes')
          .then((response) => response.json())
          .then(data => {
              this.setState({
                  bimes: data
              })

          })
          .catch(error => console.log(error))

    }
}
