import { APILINK } from "./environment";
import { Dimensions } from 'react-native';

//To be used in all REST calls
export const fetchAPI = (route, method) => {
    console.log(APILINK + route, method);
    return fetch(APILINK + route, method)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log('ERROR: ' + error + ' in' + route + ' in Fetch API');
            return false;
        });
};


export const getDeviceHeight = () => {
    const screenHeight = Math.round(Dimensions.get('window').height);
    return screenHeight;
};

export const getDeviceWidth = () => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return screenWidth;
};
