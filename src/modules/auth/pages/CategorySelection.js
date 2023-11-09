import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Buttons from '../../../components/Buttons';
import colors from '../../../../colors';
import language from '../../../assets/images/language.png';
import { useTranslation } from 'react-i18next';
import blackTickImage from '../../../assets/images/ic_tick_black.png';
import whiteTickImage from '../../../assets/images/ic_tick_white.png';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { height, width } from '../../../utils/dimensions';


const CategorySelection = ({ navigation }) => {
    const { t } = useTranslation();

    const [selectedOption, setSelectedOption] = useState('retailer');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };
    return (
        <ScrollView style={styles.mainWrapper}>
            <View style={styles.buttonContainer}>
                <Buttons
                    style={styles.button}
                    label=""
                    variant="outlined"
                    onPress={() => alert('Choose Your Language')}
                    iconHeight={30}
                    iconWidth={30}
                    iconGap={0}
                    icon={language}
                />
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/images/group_907.png')}
                    style={styles.imageSaathi}
                />


            </View>
            <View style={styles.categories}>
                <TouchableOpacity
                    style={styles.oval}
                    onPress={() => handleOptionSelect('retailer')}
                >
                    <Image
                        source={require('../../../assets/images/ic_influencer.png')}
                        style={[
                            styles.categoryIcon,
                        ]}
                        resizeMode="contain"

                    />
                    <Text style={styles.categoryText}>
                    {t('strings:electrical_amp_plumbing_expert')}
                    </Text>
                    <View style={styles.radioButtons}>
                        <Image
                            source={selectedOption === 'retailer' ? blackTickImage : whiteTickImage}
                            style={styles.tick}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.oval}
                    onPress={() => handleOptionSelect('influencer')}
                >
                    <Image
                        source={require('../../../assets/images/ic_retailer_1.png')}
                        style={[
                            styles.categoryIcon,
                        ]}
                        resizeMode="contain"
                    />
                    <Text style={styles.categoryText}>
                    {t('strings:ac_service_engineer')}
                    </Text>
                    <View style={styles.radioButtons}>
                        <Image
                            source={selectedOption === 'influencer' ? blackTickImage : whiteTickImage}
                            style={styles.tick}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.startButtonContainer}>
                <Buttons
                    label="Start"
                    variant="blackButton"
                    onPress={() => navigation.navigate('login')}
                    width="90%"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        // height:height,
        // width:width,
        flex: 1,
        // height: '100%',
        padding: 25,
        paddingBottom: 40,
        backgroundColor: colors.white,

    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    button: {
        alignSelf: 'right',
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: responsiveHeight(8),
    },
    imageSaathi: {
        width: responsiveHeight(20),
        height: responsiveHeight(19.6),
    },
    oval: {
        height: responsiveHeight(30),
        width: responsiveWidth(25),
        backgroundColor: colors.yellow,
        borderRadius: 50,
        paddingHorizontal: 8,
        paddingVertical: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 5,
        gap: 10
    },
    categories: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        width: '100%',
        marginBottom: responsiveHeight(5)
    },
    startButtonContainer: {
        marginTop:50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 50
        // height: '40%',
        // backgroundColor: colors.yellow
    },
    categoryIcon: {
        height: 50,
        width: 50,
        flex: 1
    },
    categoryText: {
        color: colors.black,
        fontSize: responsiveFontSize(1.5),
        flex: 1,
        fontWeight: 'bold'
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        flex: 1
    },
    tick: {
        height: 15,
        width: 15
    },
});

export default CategorySelection;
