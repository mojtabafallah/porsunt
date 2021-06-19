import React from "react";

import {Animated} from 'react-native';
export default class BaseLightbox extends React.component(){
    constructor(props) {
        super(props);
        this.state={
            opacity: new Animated.Value(0)
        }


    }
    componentWillMount(){
        Animated.timing(this.state.opacity,{
            toValue:1,
            duration:100
        })
    }
    render(){
        return(
            <Animated.View>

            </Animated.View>
        )
    }
}