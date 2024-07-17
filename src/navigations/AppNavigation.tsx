import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { COLORS } from '../constants/theme';
import Todo from '../screens/Todo';
import AddTodo from '../screens/AddTodo';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import SearchTodo from '../screens/SearchTodo';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabBarCustomButton: React.FC<any> = ({
  accessibilityState,
  children,
  onPress,
}) => {
  const isSelected = accessibilityState.selected;
  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
          <Svg width={70} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
        </View>
        <TouchableOpacity style={styles.customButton} onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.tabButton}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar: React.FC<any> = (props) => {
  if (isIphoneX()) {
    return (
      <View>
        <View style={styles.iphoneXBackground}></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
      tabBar={(props) => <CustomTabBar props={props} />}
    >
      <Tab.Screen
        name="Todo"
        component={Todo}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="tasks"
              size={24}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTodo}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="search"
              size={24}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="AddTodo"
        component={AddTodo}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="addfile"
              size={24}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={Todo}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user"
              size={24}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName="Todo"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Todo" component={Tabs} />
    <Stack.Screen name="AddTodo" component={AddTodo} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  customButton: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
  tabButton: {
    flex: 1,
    height: 60,
    backgroundColor: COLORS.white,
  },
  iphoneXBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: COLORS.white,
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  },
});

export default AppNavigator;
