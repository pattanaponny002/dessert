import React, { useEffect } from "react";

import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useFonts } from "expo-font";
import data from "../predata/data";
import { StatusBar } from "expo-status-bar";
import { Transition, Transitioning } from "react-native-reanimated";
import avatar from "../material/avatar";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out tyoe="fade" />
  </Transition.Together>
);

const Splahthings = () => {
  const [toggle, setToggle] = React.useState(false);
  const Logo = useSharedValue(1);
  const fontFamily = "BebasNeue";
  const fontColor = "white";
  const fontSize = 20;

  const ref = React.useRef();

  const [currentindex, setCurrentindex] = React.useState(false);

  let [fontsLoaded] = useFonts({
    AbrilFatface: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    AlfaSlabOne: require("../assets/fonts/AlfaSlabOne-Regular.ttf"),
    Anton: require("../assets/fonts/Anton-Regular.ttf"),
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
    Domine: require("../assets/fonts/Domine-VariableFont_wght.ttf"),
    Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
  });

  useEffect(() => {
    Logo.value = withRepeat(withTiming(2, { duration: 2000 }), -1, true);

    return () => {
      console.log("clean");
    };
  }, []);

  const AnimatedLogo = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${2 * Math.PI * Logo.value}rad` }],
    };
  });

  if (!toggle) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "slateblue",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.Image
          source={require("../material_logo/react-native.png")}
          style={[
            AnimatedLogo,
            { width: 200, height: 200, resizeMode: "stretch" },
          ]}
        />
        <TouchableOpacity onPress={() => setToggle(!toggle)}>
          <Text
            style={{
              fontFamily,
              fontSize,
              color: fontColor,
              textAlign: "center",
              lineHeight: 50,
            }}
          >
            Stat your journey...!!
          </Text>
          <Text
            style={{
              fontFamily,
              fontSize,
              color: "black",
              textAlign: "center",
            }}
          >
            Access our application for you amazing features
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <StatusBar hidden />
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ flexGrow: 1 }}
            onPress={() => {
              ref.current.animateNextTransition();
              //still click the same index

              setCurrentindex(index === currentindex ? null : index);
            }}
          >
            <View
              style={{
                flexGrow: 1,
                backgroundColor: item.bg,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: item.color,
                  textTransform: "uppercase",
                  fontSize: 54,
                  fontFamily: "BebasNeue",
                }}
              >
                {item.category}
              </Text>
              {/* if index is existed in the particular row,pls show up */}

              {index === currentindex && (
                <View
                  style={{
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.subCategories.map((subCategories, subindex) => (
                    <Text
                      key={subindex}
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontFamily,
                        lineHeight: 20,

                        color: item.color,
                      }}
                    >
                      {subCategories}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 38,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
  subCategoriesList: {
    marginTop: 20,
  },
});
export default Splahthings;
