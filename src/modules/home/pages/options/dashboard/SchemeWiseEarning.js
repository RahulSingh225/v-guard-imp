import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import colors from '../../../../../../colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const SchemeWiseEarning = () => {
    const productDetails = {
        "products": [
            {
                "sl_no": 1,
                "created_date": "23-03-2023",
                "product_description": "Product A",
            },
            {
                "sl_no": 2,
                "created_date": "23-03-2023",
                "product_description": "Product B",
            },
            {
                "sl_no": 3,
                "created_date": "23-03-2023",
                "product_description": "Product C",
            }
        ]
    }

    const data = productDetails.products.map(product => [
        product.sl_no.toString(),
        product.created_date,
        product.product_description,
    ]);

    const tableHead = ["Sl No.","Created Date", "Product Description"];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scheme Wise Earning</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                <Rows data={data} textStyle={styles.text} />
            </Table>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
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

export default SchemeWiseEarning;
