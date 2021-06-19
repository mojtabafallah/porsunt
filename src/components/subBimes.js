import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Header, Content, Card, Right, CardItem, Thumbnail, Text, Button, Icon, Left, Body} from 'native-base';
import {Actions} from "react-native-router-flux";

export default class Bime extends Component {
    constructor(props) {
        super();
        this.state = {
            codebimes: {
                value: ''
            }
        }
        //   console.log(props)
    }

    render() {
        const {bime} = this.props;
        return (
            <Card style={{flex: 0}}>
                <CardItem>
                    <Left>
                    </Left>
                    <Right>
                        <Text>{bime.name}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body style={{backgroundColor: bime.color}}>
                        <Image source={{uri: 'https://porsunt.com/storage/' + bime.icon}}
                               style={{height: 100, width: 100, flex: 1}}/>
                        <Text>

                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button textStyle={{color: '#87838B'}} onPress={() => {
                          this.actionbime(bime.id)
                        }

                        }>

                            <Text>
                                انتخاب
                            </Text>

                        </Button>
                    </Left>
                </CardItem>
            </Card>
        );
    }

    actionbime(id_bime) {
       // console.log(id_bime);
          Actions.actionbime({codebime:id_bime});
    }

}
