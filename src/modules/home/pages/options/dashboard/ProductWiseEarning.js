import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import colors from '../../../../../../colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { fetchProductWiseEarning } from '../../HomeApiService';

const ProductWiseEarning = () => {
    const [productDetails, setProductDetails] = useState([]);
    useEffect(() => {
        fetchProductWiseEarning()
            .then(response => response.json())
            .then(responseData => {
                setProductDetails(responseData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const data = productDetails.map(product => [
        product.slNo.toString(),
        product.partDesc,
        product.points.toString()
    ]);

    const tableHead = ["Sl No.","Material Description", "Product Description", "Points","Bonus Points","Coupon Code","Created Date"];

    return (
        <ScrollView style={styles.container} horizontal={true} >
            <Table borderStyle={{ borderWidth: 0 }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                {data.length === 0 ? (
                    <Rows data={[['No Data']]} textStyle={[styles.text,styles.emptyDataStyle]} />
                ) : (
                    <>
                        <Rows data={data} textStyle={styles.text} />
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
    backgroundColor: colors.lightGrey,
    backgroundColor: "#000000",
  },
  text: {
    color: colors.white,
    paddingRight: 30,
    paddingBottom: 20,
    fontWeight: 700,
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    textAlign: "center",
    marginBottom: 10,
    color: colors.black,
    fontWeight: "bold",
  },
  emptyDataStyle: {
    color: colors.grey,
    fontWeight: "bold",
  },
});

export default ProductWiseEarning;
