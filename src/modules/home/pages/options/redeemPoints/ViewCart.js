import { ScrollView, Text, StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../../../../../../colors'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import CartProductCard from '../../../../../components/CartProductCard'

const ViewCart = () => {
    const totalItems = 1;
    const totalPoint = 100;
    const productData = [
        {
            name: 'Product 1',
            price: 50,
            image: require('../../../../../assets/images/tv.jpg'), // Replace with the correct image path
        },
        {
            name: 'Product 2',
            price: 30,
            image: require('../../../../../assets/images/tv.jpg'), // Replace with the correct image path
        },
        // Add more product objects with image sources as needed
    ];
    
    return (
        <ScrollView style={styles.mainWrapper}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Sub Total ({totalItems} Item)</Text>
                <Text style={styles.points}>{totalPoint} Points</Text>
            </View>
            <View>
            <View style={styles.container}>
            {productData.map((product, index) => (
            <CartProductCard key={index} product={product} />
        ))}
            </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerContainer: {
        backgroundColor: colors.black,
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2.2)
    },
    points: {
        color: colors.yellow,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2.2)
    },
    container: {
        padding: 10
    }
})
export default ViewCart