import React from "react";

import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { Svg, Polygon, Rect } from "react-native-svg";

import DATA from "../material/Anime2.json";
import { LinearGradient } from "expo-linear-gradient";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("screen");

const AnimatedSVG = Animated.createAnimatedComponent(Svg);
const ITEM_SIZE = width * 0.7;
const BACKDROP_HEIGHT = height * 0.65;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2; // <== ==>

const data = DATA.data;

const BackDrop = ({ movie, scrollX }) => {
  //console.log(movie[0]);
  return (
    <View
      style={{
        position: "absolute",
        width,
        height: BACKDROP_HEIGHT,
      }}
    >
      <FlatList
        data={movie}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });

          //for spacer
          // if (index == 9) {
          //   console.log(item.image);
          // }

          if (!item.image) {
            return null;
          }
          // if (index == 0) {
          //   console.log(item.title);
          // }

          return (
            <MaskedView
              key={index}
              style={{ position: "absolute" }}
              maskElement={
                <AnimatedSVG
                  width={width}
                  height={height}
                  Rect
                  viewBox={`0 0 ${width} ${height}`}
                  style={{ transform: [{ translateX }] }}
                >
                  <Rect x="0" y="0" width={width} height={height} fill="red" />
                </AnimatedSVG>
              }
            >
              <Image
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                }}
                source={{ uri: item.image }}
              />
            </MaskedView>
          );
        }}
      />
      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          bottom: 0,
          position: "absolute",
        }}
      />
    </View>
  );
};
const Flatview = () => {
  let [fontsLoaded] = useFonts({
    AbrilFatface: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    AlfaSlabOne: require("../assets/fonts/AlfaSlabOne-Regular.ttf"),
    Anton: require("../assets/fonts/Anton-Regular.ttf"),
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
    Domine: require("../assets/fonts/Domine-VariableFont_wght.ttf"),
    Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
  });

  const font = "BebasNeue";
  const fontSize = 16;

  const [movie, setMovie] = React.useState([]);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  // React.useEffect(() => {
  //   if (!fontsLoaded) {
  //     async function prepare() {
  //       await SplashScreen.preventAutoHideAsync();
  //     }
  //     prepare();
  //   }
  // }, []);

  // if (!fontsLoaded) {
  //   return undefined;
  // } else {
  //   SplashScreen.hideAsync();
  // }

  React.useEffect(() => {
    if (data) {
      //SPACER THRICK
      setMovie([{ key: "left-spacer" }, ...data, { key: "right-spacer" }]);
    }
    return () => {
      console.log("clean");
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackDrop movie={movie} scrollX={scrollX} />

      <FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ top: 70 }}
        horizontal
        scrollEventThrottle={16}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        data={movie}
        renderItem={({ item, index }) => {
          //console.log(index);
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.1, 1],
          });

          /// dont have thing from {key:nothing}
          //SPACER THRICK
          if (!item.image) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
          }
          return (
            <View
              style={{
                width: ITEM_SIZE,
                justifyContent: "center",
                shadowColor: "black",
                shadowOpacity: 1,
                shadowRadius: 10,
                shadowOffset: { width: 5, height: 0 },
              }}
            >
              <Animated.View
                style={{
                  marginLeft: 10,
                  width: ITEM_SIZE * 0.9,
                  padding: 20,

                  alignItems: "center",

                  borderRadius: 15,
                  backgroundColor: "white",
                  transform: [{ translateY }, { scale }],
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "95%",
                    height: ITEM_SIZE,
                    resizeMode: "cover",
                    borderRadius: 24,
                  }}
                />
                <View style={{ flexDirection: "row", padding: 5 }}>
                  {/* <View style={{ borderWidth: 2 }}>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 80,
                        aspectRatio: 1,
                        borderRadius: 40,
                        resizeMode: "stretch",
                      }}
                    />
                  </View> */}

                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 50,
                      aspectRatio: 1,
                      borderRadius: 40,
                      resizeMode: "stretch",
                      alignSelf: "flex-center",
                    }}
                  />

                  <View style={{ alignItems: "center", padding: 5 }}>
                    <Text style={{ fontFamily: font, fontSize }}>
                      {item.title}
                    </Text>
                    <Text style={{ fontFamily: font, fontSize }}>
                      {item.genres[0]}
                    </Text>
                    <Text style={{ fontFamily: font, fontSize }}>
                      {item.ranking}
                    </Text>
                    <Text style={{ fontFamily: font, fontSize }}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Flatview;
