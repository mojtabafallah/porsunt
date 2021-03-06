import React from 'react';
import { AsyncStorage, ScrollView } from "react-native";
import {Container, Header, Right, Icon , Left ,Button, Content} from 'native-base'
import {View, Text, FlatList} from 'react-native';
import SubBime from "./subBimes";
import {value} from "react-native-extended-stylesheet";
import {Actions} from "react-native-router-flux";

export default class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            subbimes: []
        }
        console.log('dfdfdf props=', props)
        this.getSubBime(props.data_subbime)
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
                  <Right>
                      <Text>
                          بیمه ها
                      </Text>
                  </Right>
              </Header>
              <Content>
<View>
    <FlatList
      data={this.state.subbimes}
      renderItem={this.renderItem}
      keyExtractor={item => item.id}
    />
</View>




              </Content>
          </Container>
        )
    }

    renderItem({item}) {
        return <SubBime bime={item}/>
    }

    getSubBime(codebime) {
      console.log('dfdfdf codebime=', codebime)
        fetch('https://porsunt.com/api/subbimes?codebimes=' + codebime)
          .then((response) => response.json())
          .then(data => {
            console.log('dfdfdf =', data)
              this.setState({
                  subbimes: data
              })
          })
          .catch(error => console.log(error))



    }

}
