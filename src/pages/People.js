import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Loader } from '../components/Loader';
import { Text } from '../components/Text';

import { _peopleAPI, _morePeopleAPI } from '../services/PeopleAPI';
import { showToast } from '../components/Toast';
import Carousel from 'react-native-snap-carousel';
import { getDeviceHeight, getDeviceWidth } from '../config/helpers';
import { moderateScale } from 'react-native-size-matters';
import { COLOR_PRIMARY } from '../config/colors';



export default class People extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            isMoreLoader: false,
            currentSliderIndex: 0,
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
    async loadMoreDataAPI() {
        this.setState({
            isMoreLoader: true,
        });
        if (this.state.peopleData.next != null) { //condition to check the end of data
            let pageValue = this.state.peopleData.next.split('?').pop() //will get what page to load next
            console.log('pageValue', pageValue)

            let moreData = await _morePeopleAPI(pageValue);

            if (moreData.results.length > 0) {
                console.log('moreData', moreData);
                let prevArray = this.state.peopleData
                prevArray.results = prevArray.results.concat(moreData.results) //will add new data to the previous array 
                prevArray.next = moreData.next //updates the next link 

                this.setState({
                    peopleData: prevArray,
                });
                console.log('moreData', this.state.peopleData);
            } else {
                showToast('No data found...');
            }
        }
        else {
            showToast('NO MORE DATA TO FETCH..')
        }
        this.setState({
            isMoreLoader: false,
        });
    }

    _renderItem({ item, index }) {
        return (
            <View style={styles.mainCardView}>
                <View style={styles.mainCardTopRow}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={styles.genderView}>
                        <Text style={styles.genderText}>{item.gender == 'male' ? 'M' : item.gender == 'female' ? 'F' : '?'}</Text>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: 'white', width: '100%', marginVertical: moderateScale(10) }} />
                <View style={styles.mainBottomRowView}>
                    <View style={styles.mainBottomRowInnerView}>
                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Birth Year
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.birth_year}
                            </Text>

                        </View>

                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Height
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.height}
                            </Text>
                        </View >


                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Skin Color
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.skin_color}
                            </Text>
                        </View>
                    </View>


                    <View style={styles.mainBottomRowInnerView}>
                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Mass
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.mass}
                            </Text>

                        </View>

                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Eye Color
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.eye_color}
                            </Text>
                        </View >


                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Hair Color
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.hair_color}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.mainBottomRowInnerView, { alignItems: 'center', }]}>
                        <View style={[styles.cardButtonsView, {
                            backgroundColor: 'green',
                        }]}>
                            <Text style={styles.cardButtonsViewText}>
                                Planets
                            </Text>

                        </View>

                        <View style={styles.mainBottomTextView}>
                            <View style={styles.cardButtonsView}>
                                <Text style={styles.cardButtonsViewText}>
                                    Spaceships
                            </Text>

                            </View>
                        </View >

                    </View>

                </View>
            </View>
        );
    }
    toLoadMoreItems(currentSliderIndex) {
        console.log('toLoadMoreItems', currentSliderIndex, this.state.peopleData.results.length - 1)
        if (currentSliderIndex == this.state.peopleData.results.length - 1) { //will trigger moreDataAPI when scroll reaches the end of the list
            this.loadMoreDataAPI()
        }
        else {

        }

    }

    render() {
        return (
            this.state.isLoader ? <Loader /> :
                <View style={styles.mainView}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.peopleData.results}
                        renderItem={this._renderItem}
                        vertical={true}
                        sliderWidth={getDeviceWidth()}
                        sliderHeight={getDeviceHeight() - moderateScale(150)}
                        itemWidth={getDeviceWidth()}
                        itemHeight={getDeviceHeight() / 3}
                        enableMomentum={true}
                        activeAnimationType={'spring'}
                        activeAnimationOptions={{
                            friction: 4,
                            tension: 10
                        }}
                        onBeforeSnapToItem={index => {
                            this.setState({ currentSliderIndex: index });
                            console.log('currentSliderIndex', this.state.currentSliderIndex)
                            this.toLoadMoreItems(index)
                        }}
                    />
                    {this.state.isMoreLoader ? <Loader type='more' /> : null
                    }
                </View>
        )

    }

}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },

    mainBottomTextKey: {
        fontWeight: '800',
        letterSpacing: 1,
        color: 'white',
        fontSize: moderateScale(14),

    },
    mainBottomTextValue: {
        fontSize: moderateScale(12),
        fontWeight: '600'

    },
    mainBottomRowView: {
        flexDirection: 'row',
        flex: 1,
        // backgroundColor: 'yellow'
    },
    mainBottomRowInnerView: {

        paddingVertical: moderateScale(2),

        flex: 1 / 3,
        // backgroundColor: 'red'
    },
    mainBottomTextView: {
        marginVertical: moderateScale(3),

        // flex: 1,
        // backgroundColor: 'blue'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        color: 'white', fontWeight: 'bold',
        fontSize: moderateScale(25),
        textShadowRadius: moderateScale(1),
        textShadowOffset: {
            width: 1,
            height: 1
        }
    },
    mainCardView: {
        flex: 1,
        backgroundColor: COLOR_PRIMARY,
        marginHorizontal: moderateScale(10),
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(15),
        borderRadius: moderateScale(25),
    },
    genderText: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        textAlignVertical: 'center'
    },
    mainCardTopRow: {
        flexDirection: 'row'
    },
    genderView: {
        elevation: 10,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(40)

    },
    cardButtonsView: {
        elevation: 10,
        marginVertical: moderateScale(2),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'indigo',
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(60)

    },
    cardButtonsViewText: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        textAlignVertical: 'center'
    },
})