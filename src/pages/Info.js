import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Loader } from '../components/Loader';
import { Text } from '../components/Text';
import { _starShipsAPI, _moreStarShipsAPI, _specificStarShips } from '../services/StarShipsAPI';
import { showToast } from '../components/Toast';
import Carousel from 'react-native-snap-carousel';
import { getDeviceHeight, getDeviceWidth } from '../config/helpers';
import { moderateScale } from 'react-native-size-matters';
import { COLOR_PRIMARY, COLOR_PLANET_GREEN, COLOR_PLANET_INDIGO, BG_Page, BG_BLACK } from '../config/colors';
import { _specificPlanet } from '../services/PlanetsAPI';
import { _specificPeople } from '../services/PeopleAPI';

export default class Info extends Component {



    constructor(props) {
        super(props);
        const pageName = this.props.navigation.getParam(
            'pageName',
            ""
        );
        const pageDataFromLastPage = this.props.navigation.getParam(
            'pageDataFromLastPage',
            ""
        );
        this.state = {
            isLoader: false,
            isMoreLoader: false,
            currentSliderIndex: 0,
            starshipsData: '',
            pageName: pageName,
            pageDataFromLastPage: pageDataFromLastPage,
            planetsData: '',
            peopleData: '',

        };
        this._renderItem = this._renderItemStarShips.bind(this);
        console.log('pageDataFromLastPage', this.state.pageDataFromLastPage)

    }
    async componentDidMount() {
        console.log(this.state.pageName)
        if (this.state.pageName == 'People') {
            this.fetchPeopleData()

        }
        else if (this.state.pageName == 'Planets') {
            this.fetchPlanetsData()

        }
        else if (this.state.pageName == 'StarShips') {
            this.fetchStarShipsData()

        }
        else {

        }
    }


    async fetchPlanetsData() {
        this.setState({
            isLoader: true,
        });
        let planetsData = await _specificPlanet(this.state.pageDataFromLastPage.homeworld);
        console.log('fetchPlanetsData', planetsData);

        if (planetsData) {
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
    async fetchPeopleData() {
        this.setState({
            isLoader: true,
        });
        let peopleData = await _specificPeople(this.state.pageDataFromLastPage.pilots ? this.state.pageDataFromLastPage.pilots : this.state.pageDataFromLastPage.residents);
        console.log('fetchPeopleData', peopleData);

        if (peopleData) {
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
    async fetchStarShipsData() {
        this.setState({
            isLoader: true,
        });
        let starshipsData = await _specificStarShips(this.state.pageDataFromLastPage.starships);
        console.log('fetchStarShipsData', starshipsData);

        if (starshipsData) {
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
    _renderItemPlanets(item) {
        return (
            <View style={[styles.mainCardView, { backgroundColor: COLOR_PLANET_GREEN }]}>
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



                </View>
            </View>
        );
    }
    _renderItemStarShips(item) {
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


                    <View style={[styles.mainBottomRowInnerView, {}]}>
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


                </View>
            </View>
        );
    }

    _renderItemPeople(item) {
        return (
            <View style={[styles.mainCardView, { backgroundColor: COLOR_PRIMARY }]}>
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



                </View>
            </View >
        );
    }

    render() {
        return (
            this.state.isLoader ? <Loader /> :
                <View style={styles.mainView}>
                    {/* <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.starshipsData.results}
                        renderItem={this.state.pageName == 'People' ? this._renderItemPeople : this.state.pageName == 'Planets' ? this._renderItemPlanets : this._renderItemStarShips}
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
                    // onBeforeSnapToItem={index => {
                    //     this.setState({ currentSliderIndex: index });
                    //     console.log('currentSliderIndex', this.state.currentSliderIndex)
                    //     this.toLoadMoreItems(index)
                    // }}
                    /> */}
                    {this.state.pageName == 'People' ? this._renderItemPeople(this.state.peopleData) : this.state.pageName == 'Planets' ? this._renderItemPlanets(this.state.planetsData) : this._renderItemStarShips(this.state.starshipsData)}

                </View>
        )

    }

}


const styles = StyleSheet.create({
    mainView: {

        flex: 1,
        justifyContent: 'center',
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

        flex: 1 / 2,
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
        // width:,
        height: moderateScale(210),
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