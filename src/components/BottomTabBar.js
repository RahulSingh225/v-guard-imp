import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BottomTabLogo from './BottomTabLogo';

const BottomTabBar = ({state, descriptors, navigation}) => {
  const {routes = [], index: activeIndex} = state;
  return (
    <View style={styles.container}>
      <BottomTabLogo />
      <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
      </View>
    </View>
  );
};
export default BottomTabBar;
const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'red',
  },
  tabContainer: {
    backgroundColor:'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imageIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  container: {
    
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    
    backgroundColor: 'black',
    paddingBottom: Platform.OS === 'ios' ? 15 : 0,
  },
});
