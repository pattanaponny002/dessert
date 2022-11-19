import React from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  ImageBackground,
  Animated,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "../material/color";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Easing, interpolate } from "react-native-reanimated";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import { icons } from "../material/icons";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const RANGE_SIZE = width * 0.8;
const ITEM_SIZE = height * 0.8;
const OVERFLOW_HEIGHT = 70;

const OVerflow = ({ data, ScrollAnimated }) => {
  let [fontsLoaded] = useFonts({
    AbrilFatface: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    AlfaSlabOne: require("../assets/fonts/AlfaSlabOne-Regular.ttf"),
    Anton: require("../assets/fonts/Anton-Regular.ttf"),
    "BebasNeue-Regular": require("../assets/fonts/BebasNeue-Regular.ttf"),
    Domine: require("../assets/fonts/Domine-VariableFont_wght.ttf"),
    Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
  });
  const translateY = ScrollAnimated.interpolate({
    inputRange: [-1, 0, 1],

    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  const rotateX = ScrollAnimated.interpolate({
    inputRange: [-1, 0, 1],

    outputRange: ["0deg", "360deg", "0deg"],
  });

  // const skewX = ScrollAnimated.interpolate({
  //   inputRange: [-1, 0, 1],

  //   outputRange: ["0deg", "360deg", "0deg"],
  // });

  return (
    <Animated.View
      style={{
        height: OVERFLOW_HEIGHT,
        overflow: "hidden",
        width: "99%",
        margin: 2,
      }}
    >
      {data.map((item, index) => {
        return (
          <Animated.View
            key={index}
            style={{
              height: OVERFLOW_HEIGHT,
              transform: [{ translateY }, { rotateX }],
              flexDirection: "row",
              borderWidth: 2,
              borderColor: "white",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View style={{ padding: 6 }}>
              <Text style={{ fontSize: 20, fontFamily: "Anton" }}>
                {item.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Icon
                style={{ paddingLeft: 5 }}
                name={`${icons[Math.floor(Math.random() * icons.length)]}`}
                size={30}
                color={`${color[Math.floor(Math.random() * color.length)]}`}
              />
              <Icon
                style={{ paddingLeft: 5 }}
                name={`${icons[Math.floor(Math.random() * icons.length)]}`}
                size={30}
                color={`${color[Math.floor(Math.random() * color.length)]}`}
              />
              <Icon
                style={{ paddingLeft: 5 }}
                name={`${icons[Math.floor(Math.random() * icons.length)]}`}
                size={30}
                color={`${color[Math.floor(Math.random() * color.length)]}`}
              />
            </View>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

const Home = ({ navigation }) => {
  const [data, setData] = React.useState([]);

  const controller = new AbortController();
  const signal = controller.signal;

  const VISIBLE_ITEM = 3;

  const ScrollAnimated = React.useRef(new Animated.Value(0)).current;
  const ScrollToIndex = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  let [fontsLoaded] = useFonts({
    AbrilFatface: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    AlfaSlabOne: require("../assets/fonts/AlfaSlabOne-Regular.ttf"),
    Anton: require("../assets/fonts/Anton-Regular.ttf"),
    "BebasNeue-Regular": require("../assets/fonts/BebasNeue-Regular.ttf"),
    Domine: require("../assets/fonts/Domine-VariableFont_wght.ttf"),
    Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
  });
  React.useEffect(() => {
    fetch("https://mocki.io/v1/e91cd4d9-d8c1-4aeb-a1df-4752e7cf352d", {
      signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("cancelled");
        }
      });

    return () => {
      // console.log("passing");

      controller.abort();
    };
  }, []);

  React.useEffect(() => {
    Animated.spring(ScrollAnimated, {
      toValue: ScrollToIndex,

      useNativeDriver: true,
    }).start();
  });

  // setInterval(() => {
  //   ScrollToIndex.setValue(Math.floor(Math.random() * data.length));
  // }, 3000);

  // if (index === data.length - 1 - VISIBLE_ITEM) {
  //   const newData = [...data, ...data];
  //   setData(newData);
  // }

  const setActiveIndex = React.useCallback((ActiveIndex) => {
    setIndex(ActiveIndex);
    ScrollToIndex.setValue(ActiveIndex);
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e66465" }}>
      <OVerflow data={data} ScrollAnimated={ScrollAnimated} />
      <LinearGradient
        colors={["#e66465", "#56E6E3"]}
        style={{ position: "absolute", top: 121, right: 0, bottom: 0, left: 0 }}
      />
      <FlatList
        inverted
        scrollEnabled={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        CellRendererComponent={({ item, index, children, style, ...props }) => {
          const newStyle = [style, { zIndex: data.length - index }];
          return (
            <View style={newStyle} index={index} {...props}>
              <View>{children}</View>
            </View>
          );
        }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
        renderItem={({ item, index }) => {
          const inputRange = [index - 1, index, index + 1];

          const translateX = ScrollAnimated.interpolate({
            inputRange,
            outputRange: [50, 0, -100],
          });
          const scale = ScrollAnimated.interpolate({
            inputRange,
            outputRange: [0.8, 1, 1.3],
          });
          const opacity = ScrollAnimated.interpolate({
            inputRange,
            outputRange: [1 - 1 / VISIBLE_ITEM, 1, 0],
          });

          return (
            <FlingGestureHandler
              key={"left"}
              direction={Directions.LEFT}
              onHandlerStateChange={(event) => {
                if (event.nativeEvent.state === State.END) {
                  if (index === data.length - 1) {
                    return;
                  }
                  // setIndex(index + 1);
                  // ScrollToIndex.setValue(index + 1);
                  setActiveIndex(index + 1);
                }
              }}
            >
              <FlingGestureHandler
                key={"right"}
                direction={Directions.RIGHT}
                onHandlerStateChange={(event) => {
                  if (event.nativeEvent.state === State.END) {
                    if (index === 0) {
                      return;
                    }
                    // setIndex(index - 1);
                    // ScrollToIndex.setValue(index - 1);
                    setActiveIndex(index - 1);
                  }
                }}
              >
                <View
                  style={{
                    shadowRadius: 5,
                    shadowColor: "black",
                    shadowOpacity: 1,
                    shadowOffset: {
                      width: 3,
                      height: 7,
                    },
                    transform: [{ skewX: `-0.6deg` }],
                  }}
                >
                  <Animated.View
                    style={{
                      overflow: "hidden",

                      borderColor: "white",

                      borderRadius: 15,

                      width: RANGE_SIZE * 1.1,

                      height: ITEM_SIZE * 0.8,
                      position: "absolute",
                      bottom: -260,
                      left: 20,
                      opacity,

                      backgroundColor:
                        color[Math.floor(Math.random() * color.length)],
                      transform: [{ translateX }, { scale }],
                    }}
                  >
                    <BlurView
                      intensity={20}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",

                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>{index}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Screen1", { item });
                        }}
                        style={{
                          width: 300,
                          height: 500,

                          borderWidth: 2,
                          borderColor: "white",
                          shadowColor: "pink",
                          shadowOpacity: 0.5,
                          shadowOffset: {
                            width: 10,
                            height: 0,
                          },
                          shadowRadius: 10,
                          borderRadius: 15,
                          zIndex: 5,
                        }}
                      >
                        <Image
                          source={{ uri: item.img[0].sm }}
                          style={{
                            width: "100%",
                            height: "60%",
                            borderRadius: 10,
                          }}
                        />
                        {/* AbrilFatface: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    AlfaSlabOne: require("../assets/fonts/AlfaSlabOne-Regular.ttf"),
    Anton */}
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                          <Text
                            style={{
                              fontSize: 25,
                              fontFamily: "AlfaSlabOne",
                              color: "white",
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>

                        <View
                          style={{
                            alignItems: "center",
                            marginTop: 20,
                            backgroundColor: "white",
                          }}
                        >
                          <Text
                            style={{ fontSize: 60, fontFamily: "AlfaSlabOne" }}
                          >
                            {Math.floor(Math.random(5) * data.length)}$
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </BlurView>
                  </Animated.View>
                </View>
              </FlingGestureHandler>
            </FlingGestureHandler>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
