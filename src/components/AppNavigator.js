import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../modules/auth/pages/LoginScreen';
import BottomTab from '../modules/common/services/BottomTab';
import AuthNavigator from "../modules/auth/stack/AuthNavigator";


import SplashScreen from '../modules/auth/pages/SplashScreen';
import RegisterUser from '../modules/auth/pages/RegisterUser';

import LoginWithOtp from '../modules/auth/pages/LoginWithOtp';
import NewUser from '../modules/auth/pages/NewUser';
import NewUserKyc from '../modules/auth/pages/NewUserKyc';
// import HomeScreen from '../modules/home/pages/HomeScreen';
// import Bank from '../modules/home/pages/options/bank/Bank';
// import Dashboard from '../modules/home/pages/options/dashboard/Dashboard';
// import Engagement from '../modules/home/pages/options/engagement/Engagement';
// import Info from '../modules/home/pages/options/info/Info';
// import Manual from '../modules/home/pages/options/manual/Manual';
// import New from '../modules/home/pages/options/new/New';
// import RedeemPoinst from '../modules/home/pages/options/redeemPoints/RedeemPoinst';
// import ScanScreen from '../modules/home/pages/options/scanqr/ScanScreen';
// import Schemes from '../modules/home/pages/options/schemes/Schmes';
// import TDS from '../modules/home/pages/options/TDS/TDS';
// import Ticket from '../modules/home/pages/options/ticket/Ticket';


const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Notification = createNativeStackNavigator();
const Profile = createNativeStackNavigator();
const Logout = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const AuthStackNavigator = () => {

//     <AuthStack.Navigator
//         initialRouteName='login'
//         screenOptions={{
//             headerShown: false,
//         }}>
//         <AuthStack.Screen name="login" component={LoginScreen} />


//         <AuthStack.Screen name="splash" component={SplashScreen} />



//         <AuthStack.Screen name="register" component={RegisterUser} />
//         <AuthStack.Screen name="loginwithotp" component={LoginWithOtp} />
//         <AuthStack.Screen name="newUser" component={NewUser} />
//         <AuthStack.Screen name="NewuserKyc" component={NewUserKyc} />

//     </AuthStack.Navigator>

// }

// const HomeNavigator = () => {
//     <HomeStack.Navigator

//         screenOptions={{
//             headerShown: true,
//         }}>

//         <HomeStack.Screen name="home" component={HomeScreen} />
//         <HomeStack.Screen name="Bank" component={Bank} />
//         <HomeStack.Screen component={Dashboard} name={Dashboard} />
//         <HomeStack.Screen component={Engagement} name={Engagement} />
//         <HomeStack.Screen component={Info} name={Info} />
//         <HomeStack.Screen component={Manual} name={Manual} />
//         <HomeStack.Screen component={New} name={New} />
//         <HomeStack.Screen component={RedeemPoinst} name={RedeemPoinst} />
//         <HomeStack.Screen component={ScanScreen} name={ScanScreen} />
//         <HomeStack.Screen component={Schemes} name={Schemes} />
//         <HomeStack.Screen component={TDS} name={TDS} />
//         <HomeStack.Screen component={Ticket} name={Ticket} />


//     </HomeStack.Navigator>
// }

const AppNavigator = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);
    useEffect(() => {
        // In a real app, check the user's authentication status
        // and update isUserAuthenticated accordingly
        // Example: setIsUserAuthenticated(true) for authenticated user
    }, []);
    return (
        <NavigationContainer>
            {isUserAuthenticated ? (
                <BottomTab />
                //<AuthStackNavigator />
            ) : (
                // <AuthStackNavigator />
                <AuthNavigator />
            )}
        </NavigationContainer>
    )
}

export default AppNavigator