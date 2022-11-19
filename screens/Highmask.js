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

import DATA from "../material/Anime2.json";
import MaskedViewed from "";
const { width, height } = Dimensions.get("screen");

const ITEM_SIZE = width * 0.75;
const BACKDROP_HEIGHT = height * 0.65;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2; // <== ==>

const data = DATA.data;
const Flashview = () => {
  const [movie, setMovie] = React.useState([]);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      <FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEventThrottle={16}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        data={movie}
        renderItem={({ item, index }) => {
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
            <View style={{ width: ITEM_SIZE, justifyContent: "center" }}>
              <Animated.View
                style={{
                  padding: 20,

                  marginLeft: 10,

                  alignItems: "center",
                  shadowColor: "black",
                  shadowOpacity: 1,
                  shadowRadius: 10,
                  shadowOffset: { width: 5, height: 0 },
                  borderRadius: 15,
                  backgroundColor: "white",
                  transform: [{ translateY }, { scale }],
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: ITEM_SIZE * 1.2,
                    resizeMode: "cover",
                    borderRadius: 24,
                    margin: 0,
                    marginBottom: 10,
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
                    <Text>{item.title}</Text>
                    <Text>{item.genres[0]}</Text>
                    <Text>{item.ranking}</Text>
                    <Text>{item.status}</Text>
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

export default Flashview;
