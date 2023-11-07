import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import colors from '../../../../../../colors';
import { productWiseOffers } from '../../HomeApiService';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const ProductWiseOfferTable = ({ route, navigation }) => {
    const { categoryId } = route.params;
    const [data, setData] = useState([]);

    useEffect(() => {
        productWiseOffers(categoryId)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                setData(responseData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const dataofTable = data.map(product => [
        product.materialDesc,
        product.points.toString()
    ]);

    const tableHead = ["Meterial Description", "Points"];

    return (
        <ScrollView style={styles.mainWrapper}>
            <Text style={styles.title}>Product Wise Offer</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                <Rows data={dataofTable} textStyle={styles.text} />
            </Table>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        paddingTop: responsiveHeight(2),
        backgroundColor: colors.white
    },
    head: {
        height: responsiveHeight(7),
        backgroundColor: colors.lightGrey
    },
    text: {
        margin: 10,
        color: colors.black
    },
    title: {
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center',
        marginBottom: 10,
        color: colors.black,
        fontWeight: 'bold'
    }
});

export default ProductWiseOfferTable;