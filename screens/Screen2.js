import { DrawerItem } from "@react-navigation/drawer";
import React, { useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { color } from "../material/color";
import { icons } from "../material/icons";
import ProgreeBar from "./ProgressBar";
import avatar from "../material/avatar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("screen");

const RANGE_SIZE = width * 0.8;
const ITEM_SIZE = height * 0.8;

const Screen2 = () => {
  const [data, setData] = React.useState([]);
  const [toggleIndex, setToggleIndex] = React.useState(false);
  const [currentIndex, setcurrentIndex] = React.useState(null);

  const controller = new AbortController();
  const signal = controller.signal;

  const avatar = data.map((item, index) => ({
    avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 40
    )}.jpg`,
  }));
  const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);
  // console.log(avatar);
  const scale = useRef(new Animated.Value(1)).current;

  // const TriggerAnimation = () => {
  //   Animated.timing(scale, {
  //     toValue: toggleIndex ? 1.5 : 1,
  //     duration: 3000,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     setToggleIndex(!toggleIndex);

  //   });
  // };

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
      console.log("passing");

      controller.abort();
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#7BD6F1", "orange", "#8D04E4"]}
        style={{
          position: "absolute",
          top: 0,
          bottotm: 0,
          right: 0,
          left: 0,
          borderWidth: 2,
          width: "100%",

          height: "120%",
        }}
      />
      <View style={{ width: "100%", height: "100%" }}>
        <Text></Text>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                //setcurrentIndex(index === currentIndex ? null : index);
                setToggleIndex(!toggleIndex);

                //TriggerAnimation();
              }}
              style={{
                // transform: [{ scale: index === currentIndex ? scale : 1 }],
                margin: 10,
                marginLeft: 8,
                width: RANGE_SIZE * 1.2,
                height: 120,
                shadowColor: "black",
                shadowRadius: 5,
                shadowOpacity: 6,
                shadowOffset: {
                  width: 2,
                  height: 0,
                },

                borderRadius: 15,
                padding: 10,
                marginBottom: 5,

                justifyContent: "center",
                alignItems: "center",

                // backgroundColor:
                //   color[Math.floor(Math.random() * color.length)],
              }}
            >
              <BlurView
                style={{
                  borderRadius: 15,
                  padding: 10,
                  width: "110%",
                  height: 110,
                }}
                intensity={50}
              >
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                <View style={{ flexDirection: "row", margin: 10 }}>
                  <Image
                    source={{ uri: avatar[index].avatar_url }}
                    style={{
                      width: 60,
                      aspectRatio: 1,
                      borderRadius: 30,
                      shadowColor: "black",
                      shadowOpacity: 15,
                      shadowOffset: {
                        width: 15,
                        height: 15,
                      },
                      shadowRadius: 15,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      margin: 5,
                      backgroundColor: "transparent",

                      borderRadius: 10,
                      padding: 5,
                      shadowColor: "black",
                      shadowOpacity: 1,
                    }}
                  >
                    {icons.map((icon, index) => {
                      return (
                        <View key={index}>
                          <Icon
                            style={{ justifyContent: "center", margin: 5 }}
                            key={index}
                            name={icon}
                            size={30}
                            color={
                              color[Math.floor(Math.random() * icons.length)]
                            }
                          />
                        </View>
                      );
                    })}
                  </View>
                  <View
                    style={{
                      width: 100,
                      aspectRatio: 1,
                      borderRadius: 50,

                      position: "absolute",
                      right: -20,
                      top: -40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ProgreeBar
                      key={index}
                      strokeWidth={25}
                      color={color[Math.floor(Math.random() * icons.length)]}
                      // color={"black"}
                      percentage={65}
                    />
                  </View>
                </View>
              </BlurView>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Screen2;
