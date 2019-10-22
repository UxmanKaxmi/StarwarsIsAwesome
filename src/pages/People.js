import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Loader } from '../components/Loader';
import { _peopleAPI } from '../services/PeopleAPI';
import { showToast } from '../components/Toast';




export default class People extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            peopleData: ''
        };
    }
    componentDidMount() {
        this.fetchPeopleData()
    }

    async fetchPeopleData() {
        this.setState({
            isLoader: true,
        });
        let peopleData = await _peopleAPI();
        console.log('fetchPeopleData', peopleData);

        if (peopleData.results.length > 0) {
            console.log('fetchPeopleData', peopleData);
            this.setState({
                peopleData: peopleData,
            });
        } else {
            showToast('No data found...');
        }
        this.setState({
            isLoader: false,
        });

    }


    render() {
        return (
            this.state.isLoader ? <Loader /> :
                <View>

                </View>
        )

    }

}