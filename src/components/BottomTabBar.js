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
import Icon from 'react-native-vector-icons/Ionicons';


const BottomTabBar = ({ state, descriptors, navigation }) => {
  const { routes = [], index: activeIndex } = state;
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
          const icon = getTabIcon(route.name);

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
              <View style={{ alignItems: 'center', }}>
                <Icon name={icon} size={24} color={isFocused ? '#673ab7' : '#222'} />
                {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                  {label}
                </Text> */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

function getTabIcon(routeName) {
  switch (routeName) {
    case 'Home':
     // console.log("==> HOMe", routeName);
      return 'home-outline';
    case 'Notification':
      //console.log("==>notify", routeName);
      return 'notifications-outline';
    case 'Profile':
     // console.log("==>sett", routeName);
      return 'person-outline';
    case 'Support':
      // console.log("==>sett", routeName);
      return 'call-outline';

    case 'Logout':
      //console.log("==>sett", routeName);
      return 'log-out-outline';
      person - outline

    default:

      return 'circle'; // Default icon for unknown tabs
  }
}
export default BottomTabBar;
const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  },
  tabContainer: {
    backgroundColor: 'transparent',

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

    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'ios' ? 15 : 0,
  },
});


// <View style={{ alignItems: 'center' }}>
//   <Icon name={icon} size={24} color={isFocused ? '#673ab7' : '#222'} />
//   <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//     {label}
//   </Text>
// </View>