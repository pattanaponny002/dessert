import React from "react";
import { View, Text, SafeAreaView, Dimensions, Animated } from "react-native";

const Indicator = ({
  amount = 7,
  width = 10,
  radius = width / 2,
  color = "white",
  //   transitionIndicator,
}) => {
  const indicators = [];

  for (let i = 0; i < amount; i++) {
    indicators.push(" ");
  }

  //   console.log(indicators);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {/* <Animated.View
        style={{
          width: width * 2,
          aspectRatio: 1,
          borderRadius: radius * 2,
          borderWidth: 2,
          position: "absolute",
          left: -2.5,
          transform: [{ translateX: 5 }],
        }}
      /> */}
      {indicators.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              width: width,
              aspectRatio: 1,
              borderRadius: radius,
              borderWidth: 2,
              margin: radius / 2,

              backgroundColor: color,
            }}
          />
        );
      })}
    </SafeAreaView>
  );
};

export default Indicator;
