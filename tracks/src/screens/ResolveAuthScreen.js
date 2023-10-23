import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from './AccountScreen';
import SigninScreen from './SigninScreen';
import SignupScreen from './SignupScreen';
import TrackCreateScreen from './TrackCreateScreen';
import TrackDetailScreen from './TrackDetailScreen';
import TrackListScreen from './TrackListScreen';
import { navigationRef } from '../navigationRef';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import NetworkBanner from '../components/NetworkBanner';
import useNetwork from '../hooks/useNetwork';
import { useDispatch, useSelector } from 'react-redux';
import { tryLocalSignIn } from '../store/slices/authSlice';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const TrackListStack = createStackNavigator();

const ResolveAuthScreen = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    useNetwork();

    useEffect(() => {
        dispatch(tryLocalSignIn());
    }, [token]);

    const TrackListStackScreen = () => {
        return (
            <TrackListStack.Navigator
                initialRouteName="TrackList"
                id="mainFlow"
                screenOptions={{
                    // gestureEnabled: false,
                    headerShown: false,
                }}
            >
                <TrackListStack.Screen
                    name="TrackList"
                    component={TrackListScreen}
                />
                <TrackListStack.Screen
                    name="TrackDetail"
                    component={TrackDetailScreen}
                />
            </TrackListStack.Navigator>
        );
    };

    return (
        <NavigationContainer ref={navigationRef}>
            <NetworkBanner />
            {token ? (
                <Tab.Navigator
                    id="tab"
                    screenOptions={{
                        // gestureEnabled: false,
                        headerShown: false,
                        showIcon: true,
                    }}
                >
                    <Tab.Screen
                        name="TrackListMain"
                        component={TrackListStackScreen}
                        options={{
                            title: 'Track List',
                            tabBarIcon: () => {
                                return <FontAwesome name="th-list" size={18} />;
                            },
                        }}
                    />
                    <Tab.Screen
                        name="TrackCreate"
                        component={TrackCreateScreen}
                        options={{
                            title: 'Add Track',
                            tabBarIcon: () => {
                                return <FontAwesome name="plus" size={18} />;
                            },
                        }}
                    />
                    <Tab.Screen
                        name="Account"
                        component={AccountScreen}
                        options={{
                            title: 'Account',
                            tabBarIcon: () => {
                                return <FontAwesome name="gear" size={18} />;
                            },
                        }}
                    />
                </Tab.Navigator>
            ) : (
                <AuthStack.Navigator
                    initialRouteName="Signin"
                    id="loginFlow"
                    screenOptions={{
                        // gestureEnabled: false,
                        headerShown: false,
                    }}
                >
                    <AuthStack.Screen name="Signin" component={SigninScreen} />
                    <AuthStack.Screen name="Signup" component={SignupScreen} />
                </AuthStack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default ResolveAuthScreen;
