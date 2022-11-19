import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/Home";
import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import ProgreeBar from "./screens/ProgressBar";
import TextMagicBar from "./screens/TextMagicBar";
import Testfling from "./screens/TestFling";
import TestTouch from "./screens/TestTouch";
import Indicator from "./screens/Indicator";
import SvgAndMaskView from "./screens/SvgAndMaskView";
import Splahthings from "./screens/Splashthings";
//import Screennew from "./screens/Newscreen";

import Flatview from "./screens/Flatview";
// import Highmask from "./screens/Highmask";

export default function App() {
  const Stack = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splahthings">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Screen1"
          component={Screen1}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="ProgreeBar"
          component={ProgreeBar}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="TextMagicBar"
          component={TextMagicBar}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Testfling"
          component={Testfling}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="TestTouch"
          component={TestTouch}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Indicator"
          component={Indicator}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="SvgAndMaskView"
          component={SvgAndMaskView}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Flatview"
          component={Flatview}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Splahthings"
          component={Splahthings}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
