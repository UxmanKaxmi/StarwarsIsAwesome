import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Loader } from '../components/Loader';
import { _peopleAPI } from '../services/PeopleAPI';
import { showToast } from '../components/Toast';
import Carousel from 'react-native-snap-carousel';




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

    _renderItem({ item, index }) {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        );
    }
    render() {
        return (
            this.state.isLoader ? <Loader /> :
                <View style={styles.mainView}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.peopleData.results}
                        renderItem={this._renderItem}
                        horizontal={false}
                        sliderWidth={500}
                        itemWidth={200}
                    />
                </View>
        )

    }

}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
})