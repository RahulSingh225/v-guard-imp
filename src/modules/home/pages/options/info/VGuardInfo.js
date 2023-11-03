import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import colors from '../../../../../../colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { fetchInfo } from '../../HomeApiService';

const VGuardInfo = () => {
  const baseURL = 'https://vguardrishta.com/';
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchInfo()
      .then(response => response.json())
      .then(responseData => {
        const updatedData = responseData.map(item => ({
          ...item,
          fullURL: baseURL + item.fileName
        }));
        setData(updatedData);
        console.log("<><<><<><>><", updatedData, "<><<<><><><><><><<><");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
  // const data = [
  //   {
  //     message: 'Link 1',
  //     link: 'https://www.youtube.com/',
  //   },
  //   {
  //     message: 'Link 2',
  //     link: 'https://www.youtube.com/',
  //   },
  //   {
  //     message: 'Link 3',
  //     link: 'https://www.youtube.com/',
  //   },
  //   {
  //     message: 'Link 4',
  //     link: 'https://www.youtube.com/',
  //   },
  // ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>V-Guard Info</Text>
      <ScrollView>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() => Linking.openURL(item.fullURL)}
          >
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{item.description}</Text>
            </View>
            <Text style={styles.openLinkText}>View</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
  },
  messageText: {
    fontSize: responsiveFontSize(2),
    color: colors.black
  },
  openLinkText: {
    color: colors.yellow,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VGuardInfo;
