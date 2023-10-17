import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Buttons from '../../../components/Buttons';
import colors from '../../../../colors';
import language from '../../../assets/images/language.png';
import { useTranslation } from 'react-i18next';
import blackTickImage from '../../../assets/images/ic_tick_black.png';
import whiteTickImage from '../../../assets/images/ic_tick_white.png';


const CategorySelection = ({ navigation }) => {
    const { t } = useTranslation();

    const [selectedOption, setSelectedOption] = useState('retailer');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };
    return (
        <View style={styles.mainWrapper}>
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
                    />
                    <Text style={styles.categoryText}>
                        Electrical & Plumbing Experts
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
                    />
                    <Text style={styles.categoryText}>
                        Electrical & Plumbing Experts
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
                    style={styles.startButton}
                    label="Start"
                    variant="blackButton"
                    onPress={() => navigation.navigate('login')}
                    width="90%"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        padding: 25,
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
        marginVertical: 80,
    },
    imageSaathi: {
        width: 150,
        height: 146,
    },
    oval: {
        height: 250,
        width: 100,
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
        width: '100%'
    },
    startButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '20%',
    },
    categoryIcon: {
        height: 50,
        width: 50
    },
    categoryText: {
        color: colors.black,
        fontSize: 15,
        fontWeight: 'bold'
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    tick: {
        height: 15,
        width: 15
    },
});

export default CategorySelection;