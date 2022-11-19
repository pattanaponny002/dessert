import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "../material/color";
import Icon from "react-native-vector-icons/Ionicons";
import { icons } from "../material/icons";
import { useFonts } from "expo-font";
import { interpolate, RotateInDownLeft } from "react-native-reanimated";
import predata from "../predata/Desert.json";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Indicator from "./Indicator";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("screen");

const RANGE_SIZE = width * 0.8;
const ITEM_SIZE = height * 0.8;

const Screen1 = ({ route, navigation }) => {
  let [fontsLoaded] = useFonts({
    AbrilFatface: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    AlfaSlabOne: require("../assets/fonts/AlfaSlabOne-Regular.ttf"),
    Anton: require("../assets/fonts/Anton-Regular.ttf"),
    "BebasNeue-Regular": require("../assets/fonts/BebasNeue-Regular.ttf"),
    Domine: require("../assets/fonts/Domine-VariableFont_wght.ttf"),
    Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
  });

  // useEffect(() => {
  //   if (!fontsLoaded) {
  //     async function prepare() {
  //       await SplashScreen.preventAutoHideAsync();
  //     }
  //     prepare();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return undefined;
  // } else {
  //   SplashScreen.hideAsync();
  // }
  const [data, setData] = React.useState(
    predata[Math.floor(Math.random() * predata.length)]
  );

  const transitionGarage = React.useRef(new Animated.Value(0)).current;
  const [toggleGarage, setToggle] = React.useState(false);

  const transitionIndicator = React.useRef(new Animated.Value(0)).current;
  //const transitionIndicator = React.useRef(new Animated.Value(0)).current;
  const { item } = route.params ? route.params : {};

  const [index, setIndex] = React.useState(0);
  const radius = 5;
  //Move Indicator
  const MoveIndicator = (index) => {
    Animated.spring(transitionIndicator, {
      toValue: index * radius * 3,
      useNativeDriver: true,
    }).start(() => {
      console.log(`index:${index}`);
    });
  };

  const TriggerGarageDesciption = () => {
    Animated.spring(transitionGarage, {
      toValue: toggleGarage ? 0 : -120,
      useNativeDriver: true,
    }).start();
  };

  const CallbackGarage = React.useCallback(() => {
    TriggerGarageDesciption();
    setToggle((toggleGarage) => !toggleGarage);
  });

  //const AnimtedTouch = Animated.createAnimatedComponent(TouchableOpacity);

  useEffect(() => {
    setData(predata[index]);
    return () => {
      console.log("index changed");
    };
  }, [index]);

  useEffect(() => {
    if (route.params) {
      setData(item);
      //console.log(`...new DATA:${JSON.stringify(data)}`);
    }
    return () => {
      console.log("item changed");
    };
  }, [item]);
  // colors={["#e66465", "#56E6E3"]}
  return (
    <SafeAreaView style={{ backgroundColor: "#A4DFF1" }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.7 }}
        colors={["#56E6E3", "#e66465"]}
        style={{ position: "absolute", top: 121, right: 0, bottom: 0, left: 0 }}
      />

      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          margin: 5,
          padding: 2,
          backgroundColor: "#A4DFF1",
          shadowColor: "black",
          shadowOpacity: 1,
          shadowRadius: 5,
          shadowOffset: {
            width: 5,
            height: 2,
          },
        }}
      >
        <BlurView
          style={{
            flex: 0.8,
            padding: 5,
            marginLeft: 10,
          }}
          intensity={50}
        >
          <Text
            style={{
              fontSize: 20,
              flex: 1,

              fontFamily: "Anton",
              alignSelf: "center",
              padding: 5,
            }}
          >
            {data.name}
          </Text>
        </BlurView>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: 50,
            height: 50,

            borderRadius: 25,
            borderColor: "white",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            shadowColor: "black",
            shadowOpacity: 1,
            shadowRadius: 2,
            shadowOffset: {
              width: 2,
              height: 1,
            },

            borderWidth: 2,
          }}
        >
          <Icon name="home" size={25} color={"gray"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          height: RANGE_SIZE * 1.1,

          padding: 2,
        }}
      >
        <Image
          source={{ uri: data.img[0].sm }}
          style={{
            width: "100%",
            height: "105%",
            resizeMode: "stretch",
            borderRadius: 80,
            transform: [{ rotateX: "-15deg" }],
          }}
        />
        <LinearGradient
          colors={["transparent", "black"]}
          style={{
            height: 70,
            position: "absolute",
            width: "100%",
            right: 0,
            bottom: -20,
            left: 0,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
            }}
          >
            <Text style={{ color: "white" }}>{data.name}</Text>
            {/* indicator */}
            <Indicator amount={predata.length} color={"orange"} />
            <Animated.View
              style={{
                width: 20,
                aspectRatio: 1,
                borderRadius: 10,
                borderColor: "red",
                position: "absolute",
                top: 33,
                left: 115.5,
                backgroundColor: "white",

                borderWidth: 2,
                transform: [{ translateX: transitionIndicator }],
              }}
            />
          </View>
        </LinearGradient>
      </View>

      <ScrollView horizontal style={{ marginTop: 15, zIndex: 5 }}>
        {predata.map((promote, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                MoveIndicator(index);
                setIndex(index);
              }}
            >
              <View
                style={{
                  transform: [{ skewX: `-2deg` }],
                  width: 150,
                  height: 150,

                  borderColor: "white",
                  borderRadius: 15,
                  backgroundColor: "white",
                  margin: 10,
                  shadowRadius: 5,
                  shadowColor: "black",
                  shadowOpacity: 1,
                  shadowOffset: {
                    width: 3,
                    height: 7,
                  },
                  zIndex: 1,

                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <View
                  style={{
                    overflow: "hidden",
                    marginTop: 5,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: promote.img[0].sm }}
                    style={{
                      width: "95%",
                      height: "100%",
                      overflow: "hidden",
                      borderRadius: 15,
                      bottom: index === 8 || index === 9 ? 50 : 0,
                      marginHorizontal: 2,
                    }}
                  />
                  <View
                    style={{
                      width: "100%",
                      height: "50%",
                      position: "absolute",

                      bottom: 5,
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
                  >
                    <BlurView
                      intensity={20}
                      style={{
                        width: "100%",
                        height: "100%",

                        position: "absolute",
                        bottom: -10,

                        borderRadius: 15,

                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontFamily: "Anton" }}>
                        {promote.name}
                      </Text>
                    </BlurView>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        {/* <View
          style={{ width: 150, height: 150, borderWidth: 2, borderRadius: 15 }}
        /> */}
      </ScrollView>

      <View>
        <TouchableOpacity
          onPress={() => {
            CallbackGarage();
          }}
          style={{
            shadowColor: "black",
            shadowOpacity: 1,
            shadowRadius: 5,
            shadowOffset: {
              width: 5,
              height: 1,
            },
          }}
        >
          <Text
            style={{
              padding: 10,
              fontFamily: "Anton",
              fontSize: 25,
              paddingVertical: 5,
              backgroundColor: "white",
            }}
          >
            {data.name}
          </Text>
        </TouchableOpacity>
        <View style={{ overflow: "hidden" }}>
          <Animated.View
            style={{
              width: "100%",
              height: 150,

              paddingTop: 2,
              paddingLeft: 5,
              transform: [{ translateY: transitionGarage }],
            }}
          >
            <Text style={{ fontSize: 15, padding: 2, fontFamily: "Anton" }}>
              {data.desc}
            </Text>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Screen1;
