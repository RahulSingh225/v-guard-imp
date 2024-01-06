import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import colors from '../../../../../../colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { fetchProductWiseEarning } from '../../HomeApiService';
import { width } from '../../../../../utils/dimensions';

const ProductWiseEarning = () => {
    const [productDetails, setProductDetails] = useState([]);
    useEffect(() => {
        fetchProductWiseEarning()
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                setProductDetails(responseData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const data = productDetails.map(product => [
        product.slNo.toString(),
        product.partDesc,
        product.points.toString(),
        product.bonusPoints,
        product.couponCode,
        product.createdDate
    ]);

    const tableHead = ["Sl No.", "Product Description", "Points","Bonus Points","Coupon Code","Created Date"];

    return (
        <ScrollView horizontal style={styles.container}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                {data.length === 0 ? (
                    <Rows data={[['No Data']]} textStyle={[styles.text,styles.emptyDataStyle]} />
                ) : (
                    <>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={data} textStyle={styles.text2} />
                    </>
                )}
            </Table>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        
    },
    head: {
        height: responsiveHeight(7),
        backgroundColor: colors.lightGrey
    },
    text: {
        margin: 10,
        color: colors.black,
        
    },
    text2: {
        margin: 10,
        color: colors.black,
        maxWidth:width*0.2
    },
    title: {
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center',
        marginBottom: 10,
        color: colors.black,
        fontWeight: 'bold'
    }
});

export default ProductWiseEarning;
