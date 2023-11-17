import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import colors from '../../../../../../colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { fetchTicketHistory } from '../../HomeApiService';
import { useTranslation } from 'react-i18next';

const TicketHistory = () => {
    const [data, setData] = useState([]);
    const { t } = useTranslation();

  useEffect(() => {
    fetchTicketHistory()
      .then(response => response.json())
      .then(responseData => {
        setData(responseData);
        console.log("<><<><<><>><", responseData, "<><<<><><><><><><<><");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{t('strings:ticket_history')}</Text>
            {data.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                >
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>{item.createdDate}</Text>
                        <Text style={styles.messageText}>{item.name}</Text>
                        <View style={styles.statusContainer}>
                        {/* <Image style={styles.downImage} source={require('../../../../../assets/images/ic_ticket_drop_donw1.png')} /> */}
                        <Text style={styles.status}>{item.status}</Text>
                        </View>
                    </View>
                    
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: colors.white
    },
    title: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: colors.black,
        textAlign: 'center',
        marginBottom: 10,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
    },
    messageContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    messageText: {
        fontSize: responsiveFontSize(1.6),
        textAlign: 'left',
        color: colors.black
    },
    status: {
        backgroundColor: colors.yellow,
        color: colors.black,
        padding: 5,
        fontSize: responsiveFontSize(1.5),
        fontWeight: 'bold',
        borderRadius: 5
    },
    downImage: {
        height: responsiveFontSize(2),
        width: responsiveFontSize(2)
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    }
});

export default TicketHistory;
