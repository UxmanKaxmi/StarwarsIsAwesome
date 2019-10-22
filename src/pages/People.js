import React, { Component } from 'react';
import { Text } from 'react-native';
import { Loader } from '../components/Loader';




export default class People extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() { }

    render() {
        return (<Loader>asdaasdasdasdasdsdasd</Loader>
        )

    }

}