import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body} from 'native-base';
import {Actions} from "react-native-router-flux";

export default class Bime extends Component {
    constructor(props) {
        super();

        console.log('props ===========',props)

        this.state = {
            codebimes: {
                value: ''
            },
            databime:
        {
            value:props
        }
        }
    }

    render() {
        const {bime} = this.props;

        return (
            <Card style={{flex: 0}}>
                <CardItem>
                    <Left>
                        <Body>
                            <Text>{bime.name}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image source={{uri: 'https://porsunt.com/storage/' + bime.image}}
                               style={{height: 50, width: 50, flex: 1}}/>
                        <Text>
                            {bime.des}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button textStyle={{color: '#87838B'}} onPress={() => {

                            this.getsubbime();
                        }
                        }>

                            <Text>
                                نمایش زیر مجموعه
                            </Text>

                        </Button>
                    </Left>
                </CardItem>
            </Card>
        );
    }



    getsubbime() {
       // console.log()
      //  let {databime} = this.state;
       // console.log(databime.value.id);
        var codebimes1 = this.props.bime.id;

        console.log('data_subbime =====',codebimes1)

        Actions.mainbime({data_subbime: codebimes1});
    }
}
