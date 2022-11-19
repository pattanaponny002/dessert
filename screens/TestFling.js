import React from "react";

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Animated,
  FlatList,
} from "react-native";

///3 ***
import {
  Directions,
  State,
  FlingGestureHandler,
} from "react-native-gesture-handler";

import DataFling from "../material/Data_Fling";

const { width, height } = Dimensions.get("screen");

const RANGE_SIZE = width * 0.78;
const ITEM_SIZE = height * 0.59;

const VISIBLE_ITEMS = 3;
const OVERFLOW_HEIGHT = 70;

const Overflow = ({ data, scrollXAnimted }) => {
  //scrollX  = value so we can do this
  const translateY = scrollXAnimted.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View
      style={{
        borderWidth: 2,

        height: OVERFLOW_HEIGHT,
        overflow: "hidden",
      }}
    >
      {/* Mapping for all index */}
      {data.map((item, index) => {
        return (
          <Animated.View
            key={index}
            style={{
              flexDirection: "row",
              height: OVERFLOW_HEIGHT,
              transform: [{ translateY: translateY }],
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  height: OVERFLOW_HEIGHT / 2,
                  padding: 6,
                  fontSize: 25,
                }}
              >
                {item.title}
              </Text>
              <Text style={{ height: OVERFLOW_HEIGHT / 2, padding: 6 }}>
                {item.location}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  height: OVERFLOW_HEIGHT,
                  paddingTop: 45,

                  paddingLeft: 70,
                }}
              >
                {item.date}
              </Text>
            </View>
          </Animated.View>
        );
      })}
      {/* <View style={{ flex: 1 }}>
        <Text>{item.title}</Text>
        <Text>{item.location}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>{item.date}</Text>
      </View> */}
    </View>
  );
};
const Testfling = () => {
  const [data, setData] = React.useState(DataFling);

  const scrollXtoindex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimted = React.useRef(new Animated.Value(0)).current;

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    Animated.spring(scrollXAnimted, {
      toValue: scrollXtoindex,
      useNativeDriver: true,
    }).start();
  });

  if (index === data.length - VISIBLE_ITEMS - 1) {
    const newData = [...data, ...data];
    setData(newData);
  }

  //   setInterval(() => {
  //     scrollXtoindex.setValue(Math.floor(Math.random() * data.length));
  //   }, 3000);

  const setActiveIndex = React.useCallback((activeIndex) => {
    setIndex(activeIndex);
    scrollXtoindex.setValue(activeIndex);
  });

  React.useEffect(() => {});
  return (
    <FlingGestureHandler
      key={"left"}
      direction={Directions.LEFT}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.END) {
          console.log("FLinged!! LEFT");

          if (index === data.length - 1) {
            return;
          }

          setActiveIndex(index + 1);
        }
      }}
    >
      {/* start with right first because left is index = 0 */}
      <FlingGestureHandler
        key={"right"}
        direction={Directions.RIGHT}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
            console.log("FLinged!! right");
          }
        }}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          <Overflow data={data} scrollXAnimted={scrollXAnimted} />
          <FlatList
            inverted
            //horizontal
            horizontal
            keyExtractor={(_, index) => String(index)}
            data={data}
            scrollEnabled={false}
            //subview stacking shou
            removeClippedSubviews={false}
            contentContainerStyle={{
              flex: 1,
              borderWidth: 2,
              justifyContent: "center",
              marginRight: -300,

              //   left: RANGE_SIZE * 0.15,
            }}
            //this gonna have marginTop :50 for each
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];

              return (
                <View style={newStyle} index={index} {...props}>
                  <Text>{children}</Text>
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              // <OPPOSITE WAY>
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimted.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimted.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              //VISIBLE ITEM HOW MANY YOU WANT FOR OPA
              const opacity = scrollXAnimted.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });
              return (
                <Animated.View
                  style={{
                    width: RANGE_SIZE,
                    height: ITEM_SIZE,

                    position: "absolute",

                    opacity,
                    transform: [{ translateX }, { scale }],
                  }}
                >
                  <Image
                    source={{ uri: item.poster }}
                    style={{
                      width: RANGE_SIZE,
                      height: ITEM_SIZE,
                      borderRadius: 20,
                      resizeMode: "stretch",
                    }}
                  />
                </Animated.View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default Testfling;
