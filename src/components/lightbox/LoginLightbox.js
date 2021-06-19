import React from "react";

import BaseLightbox from "./BaseLightbox";
import {Animated, Text} from 'react-native';
export default class LoginLightbox extends React.component(){

    render(){
        return(
            <BaseLightbox>
            <Text>Welcome to porsunt</Text>
            </BaseLightbox>
        )
    }
}