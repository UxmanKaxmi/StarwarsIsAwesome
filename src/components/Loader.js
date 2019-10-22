import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { BG_BLACK, BG_Page } from '../config/colors';

const loaderAnim = '../assets/anim/loader_bb8.json';
class Loader extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: BG_Page
                }}>
                <LottieView source={require(loaderAnim)} autoPlay loop />
            </View>

        );
    }
}

const styles = StyleSheet.create({

});

export { Loader };
