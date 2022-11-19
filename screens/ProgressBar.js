import React, { useEffect } from "react";

import {
  Text,
  View,
  SafeAreaView,
  Animated,
  TextInput,
  StyleSheet,
} from "react-native";

import { Circle, G, Svg } from "react-native-svg";
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgreeBar = ({
  radius = 50,
  percentage = 75,
  strokeWidth = 10,
  duration = 3000,

  max = 100,
  color = "slateblue",
  colorFont = "black",
}) => {
  //prerequisite *3
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const halfCircle = radius + strokeWidth;
  const circlecumference = 2 * Math.PI * radius;
  //prerequisite *2
  const cirCleRef = React.useRef();
  const inPutRef = React.useRef();

  ///Trigger animation
  //[A] function animation <===> animatedValue
  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,

      useNativeDriver: true,
    }).start(() => {
      animation(toValue === 0 ? percentage : 0);

      //console.log(animatedValue);
    });
  };
  //[B]
  useEffect(() => {
    //[1] fucntion
    animation(percentage);

    animatedValue.addListener((v) => {
      //A**
      if (cirCleRef?.current) {
        //[1]
        const maxPerc = (v.value * 100) / max;

        //[2]
        const strokeDashoffset =
          circlecumference - (circlecumference * maxPerc) / 100;
        //[3]
        cirCleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
      //B**
      if (inPutRef?.current) {
        inPutRef.current.setNativeProps({
          text: `${Math.round(v.value)}%`,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, percentage]);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Svg
        style={{ shadowOpacity: 1 }}
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation={"-90"} origin={`${halfCircle},${halfCircle}`}>
          <Circle
            cx={"50%"}
            cy={"50%"}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={cirCleRef}
            cx={"50%"}
            cy={"50%"}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circlecumference}
            strokeDashoffset={circlecumference * 0.75}
            fill="transparent"
            strokeLinecap="round"
          />
        </G>
      </Svg>

      <TextInput
        // ref edit value
        defaultValue="0"
        ref={inPutRef}
        underlineColorAndroid={"transparent"}
        editable={false}
        style={[
          StyleSheet.absoluteFillObject,
          {
            fontSize: radius / 3,
            color: colorFont,
            textAlign: "center",
            top: 0,
            left: 13,
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default ProgreeBar;
