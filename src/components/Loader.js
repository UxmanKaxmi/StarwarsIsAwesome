import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { BG_BLACK, BG_Page } from '../config/colors';
import { getDeviceWidth } from '../config/helpers';
import { moderateScale } from 'react-native-size-matters';

const loaderAnim = '../assets/anim/loader_bb8.json';
const loaderLightSaberAnim = '../assets/anim/loader_lightSaber.json';
const loaderLightSaberAnim2 = '../assets/anim/loader_lightSaber2.json';


class Loader extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            this.props.type ?
                <View
                    style={{
                        flex: 1,
                        borderTopEndRadius: 50,
                        borderTopStartRadius: 40,
                        paddingVertical: moderateScale(18),

                        // height: getDeviceWidth() / 2,
                        // width: getDeviceWidth() / 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'purple',
                        flexDirection: 'row'
                    }}>

                    <View style={{
                        flex: 0.2,
                        width: moderateScale(60),
                        height: moderateScale(60),
                        alignItems: 'flex-end'
                    }}><LottieView style={{
                        justifyContent: 'flex-end',
                        flex: 1
                    }} source={require(loaderLightSaberAnim)} autoPlay loop /></View>
                    <Text style={{
                        fontSize: moderateScale(15),
                        color: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 0.8,
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        textShadowOffset: {
                            width: 20,
                            height: 20
                        },
                        textShadowColor: 'red',
                        letterSpacing: 1,
                    }}>Loading</Text>

                </View> :


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
