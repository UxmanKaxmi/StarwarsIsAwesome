import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Loader } from '../components/Loader';
import { Text } from '../components/Text';
import { _starShipsAPI, _moreStarShipsAPI } from '../services/StarShipsAPI';
import { showToast } from '../components/Toast';
import Carousel from 'react-native-snap-carousel';
import { getDeviceHeight, getDeviceWidth } from '../config/helpers';
import { moderateScale } from 'react-native-size-matters';
import { COLOR_PRIMARY, COLOR_PLANET_GREEN, COLOR_PLANET_INDIGO, BG_Page, BG_BLACK } from '../config/colors';

export default class StarShips extends Component {


    static navigationOptions = {
        tabBarOptions: {
            activeTintColor: COLOR_PLANET_INDIGO,
            inactiveTintColor: 'black',
            tabStyle: {
                backgroundColor: BG_Page
            },
            bounces: true,
            indicatorStyle: {

            },
            labelStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                textShadowOffset: {
                    width: 20,
                    height: 20
                },
                textShadowColor: 'red',
                letterSpacing: 1,

            },
            style: {
                elevation: 22,
                shadowColor: COLOR_PLANET_INDIGO,

            }
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            isMoreLoader: false,
            currentSliderIndex: 0,
            starshipsData: ''

        };
        this._renderItem = this._renderItem.bind(this);

    }
    componentDidMount() {
        this.fetchStarShipsData()
    }

    async fetchStarShipsData() {
        this.setState({
            isLoader: true,
        });
        let starshipsData = await _starShipsAPI();
        console.log('fetchStarShipsData', starshipsData);

        if (starshipsData.results.length > 0) {
            console.log('fetchStarShipsData', starshipsData);
            this.setState({
                starshipsData: starshipsData,
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
        if (this.state.starshipsData.next != null) { //condition to check the end of data
            let pageValue = this.state.starshipsData.next.split('?').pop() //will get what page to load next
            console.log('pageValue', pageValue)

            let moreData = await _moreStarShipsAPI(pageValue);

            if (moreData.results.length > 0) {
                console.log('moreData', moreData);
                let prevArray = this.state.starshipsData
                prevArray.results = prevArray.results.concat(moreData.results) //will add new data to the previous array 
                prevArray.next = moreData.next //updates the next link 

                this.setState({
                    starshipsData: prevArray,
                });
                console.log('moreData', this.state.starshipsData);
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
    openInfoPage(item, index, pageName) {

        console.log('openPlanetPage')
        this.props.navigation.navigate('Info', { pageDataFromLastPage: item, pageName: pageName })


    }
    _renderItem({ item, index }) {
        return (
            <View style={styles.mainCardView}>
                <View style={styles.mainCardTopRow}>
                    <Text style={styles.title}>{item.name}</Text>
                </View>
                <View style={{ height: 1, backgroundColor: 'white', width: '100%', marginVertical: moderateScale(10) }} />
                <View style={styles.mainBottomRowView}>
                    <View style={styles.mainBottomRowInnerView}>
                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                MGLT
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.MGLT}
                            </Text>

                        </View>

                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Consumables
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.consumables}
                            </Text>
                        </View >


                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                COST
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.cost_in_credits}
                            </Text>
                        </View>
                    </View>


                    <View style={[styles.mainBottomRowInnerView, { paddingLeft: moderateScale(10) }]}>
                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Crew
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.crew}
                            </Text>

                        </View>

                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Speed
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.max_atmosphering_speed}
                            </Text>
                        </View >


                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Hyperdrive
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.hyperdrive_rating}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.mainBottomRowInnerView, { alignItems: 'center', }]}>
                        {
                            item.pilots.length < 1 ? null :
                                <TouchableOpacity
                                    onPress={() => this.openInfoPage(item, index, 'People')}
                                    style={[styles.cardButtonsView, {
                                        backgroundColor: COLOR_PRIMARY,
                                    }]}>
                                    <Text style={styles.cardButtonsViewText}>
                                        People
                            </Text>

                                </TouchableOpacity>
                        }


                    </View>

                </View>
            </View>
        );
    }
    toLoadMoreItems(currentSliderIndex) {
        console.log('toLoadMoreItems', currentSliderIndex, this.state.starshipsData.results.length - 1)
        if (currentSliderIndex == this.state.starshipsData.results.length - 1) { //will trigger moreDataAPI when scroll reaches the end of the list
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
                        data={this.state.starshipsData.results}
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
        fontSize: moderateScale(12),

    },
    mainBottomTextValue: {
        color: 'yellow',
        fontSize: moderateScale(11),
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
        fontSize: moderateScale(20),
        textShadowRadius: moderateScale(1),
        textShadowOffset: {
            width: 1,
            height: 1
        }
    },
    mainCardView: {
        flex: 1,
        backgroundColor: COLOR_PLANET_INDIGO,
        marginHorizontal: moderateScale(10),
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(15),
        borderRadius: moderateScale(25),
    },
    genderText: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: moderateScale(12),
        textAlign: 'right',
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
        backgroundColor: COLOR_PLANET_GREEN,
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