import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Loader } from '../components/Loader';
import { Text } from '../components/Text';
import { _planetsAPI, _morePlanetsAPI } from '../services/PlanetsAPI';
import { showToast } from '../components/Toast';
import Carousel from 'react-native-snap-carousel';
import { getDeviceHeight, getDeviceWidth } from '../config/helpers';
import { moderateScale } from 'react-native-size-matters';
import { COLOR_PRIMARY, COLOR_PLANET_GREEN, BG_Page } from '../config/colors';


export default class Planets extends Component {

    static navigationOptions = {
        tabBarOptions: {
            activeTintColor: COLOR_PLANET_GREEN,
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
                shadowColor: COLOR_PLANET_GREEN,

            }
        },
    };


    constructor(props) {
        super(props);

        const pageDataFromLastPage = this.props.navigation.getParam(
            'dataFromPeoplePage',
            ""
        );
        console.log('dataFromPeoplePage', pageDataFromLastPage)
        this.state = {
            isLoader: true,
            isMoreLoader: false,
            currentSliderIndex: 0,
            planetsData: ''

        };
        this._renderItem = this._renderItem.bind(this);

    }
    componentDidMount() {
        this.fetchPlanetsData()
    }

    async fetchPlanetsData() {
        this.setState({
            isLoader: true,
        });
        let planetsData = await _planetsAPI();
        console.log('fetchPlanetsData', planetsData);

        if (planetsData.results.length > 0) {
            console.log('fetchPlanetsData', planetsData);
            this.setState({
                planetsData: planetsData,
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
        if (this.state.planetsData.next != null) { //condition to check the end of data
            let pageValue = this.state.planetsData.next.split('?').pop() //will get what page to load next
            console.log('pageValue', pageValue)

            let moreData = await _morePlanetsAPI(pageValue);

            if (moreData.results.length > 0) {
                console.log('moreData', moreData);
                let prevArray = this.state.planetsData
                prevArray.results = prevArray.results.concat(moreData.results) //will add new data to the previous array 
                prevArray.next = moreData.next //updates the next link 

                this.setState({
                    planetsData: prevArray,
                });
                console.log('moreData', this.state.planetsData);
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
                    <Text style={styles.genderText}>{item.climate}</Text>
                </View>
                <View style={{ height: 1, backgroundColor: 'white', width: '100%', marginVertical: moderateScale(10) }} />
                <View style={styles.mainBottomRowView}>
                    <View style={styles.mainBottomRowInnerView}>
                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Diameter
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.diameter}
                            </Text>

                        </View>

                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Gravity
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.gravity}
                            </Text>
                        </View >


                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Orbital
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.orbital_period}
                            </Text>
                        </View>
                    </View>


                    <View style={styles.mainBottomRowInnerView}>
                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Population
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.population}
                            </Text>

                        </View>

                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Surface Water
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.surface_water}
                            </Text>
                        </View >


                        <View style={styles.mainBottomTextView}>
                            <Text style={styles.mainBottomTextKey}>
                                Rotation
                            </Text>
                            <Text style={styles.mainBottomTextValue}>
                                {item.rotation_period}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.mainBottomRowInnerView, { alignItems: 'center', }]}>
                        {
                            item.residents.length < 1 ? null :
                                <TouchableOpacity onPress={() => this.openInfoPage(item, index, 'People')}
                                    style={[styles.cardButtonsView, {
                                        backgroundColor: COLOR_PRIMARY,
                                    }]}>
                                    <Text style={styles.cardButtonsViewText}>
                                        People
                            </Text>

                                </TouchableOpacity>
                        }

                        {/* <TouchableOpacity onPress={() => this.openPeoplePage(item, index)}
                            style={styles.mainBottomTextView}>
                            <View style={styles.cardButtonsView}>
                                <Text style={styles.cardButtonsViewText}>
                                    Starships
                            </Text>

                            </View>
                        </TouchableOpacity > */}

                    </View>

                </View>
            </View>
        );
    }
    openPeoplePage(item, index) {
        console.log('openPeoplePage', item, index)

    }
    toLoadMoreItems(currentSliderIndex) {
        console.log('toLoadMoreItems', currentSliderIndex, this.state.planetsData.results.length - 1)
        if (currentSliderIndex == this.state.planetsData.results.length - 1) { //will trigger moreDataAPI when scroll reaches the end of the list
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
                        data={this.state.planetsData.results}
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

        flex: 0.4,
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
        backgroundColor: COLOR_PLANET_GREEN,
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