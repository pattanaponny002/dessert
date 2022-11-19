import React from "react";

import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { FlatList, TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import DataFling from "../material/Data_Fling";
const TestTouch = () => {
  const [data, setData] = React.useState(DataFling);

  const doubleREf = React.useRef();
  const trippleREf = React.useRef();

  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const skew = useSharedValue(0);

  const AnimatedTranlate = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
        { skewX: `${skew.value}deg` },
      ],
    };
  });
  //triigger

  const singleTrap = React.useCallback(() => {
    return (
      (translateX.value = withSpring(-100)),
      (scale.value = withSpring(1.5, undefined, (isFinished) => {
        if (isFinished) {
          skew.value = withSpring(0);
        }
      }))
    );
  }, []);
  const doubleTrap = React.useCallback(() => {
    return (
      (translateX.value = withSpring(0)),
      (scale.value = withSpring(1, undefined, (isFinished) => {
        if (isFinished) {
          skew.value = withSpring(6);
        }
      }))
    );
  }, []);
  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={{ borderWidth: 5, alignItems: "center" }}
        data={data}
        renderItem={({ item, index }) => (
          <TapGestureHandler
            waitFor={doubleREf}
            onActivated={() => {
              console.log("SINGLE TAP");
              singleTrap();
            }}
          >
            <TapGestureHandler
              // 4   waitfore ,max ,number tap,function

              waitFor={trippleREf}
              maxDelayMs={300}
              ref={doubleREf}
              numberOfTaps={2}
              onActivated={() => {
                console.log("DOUBLE TAP");
                doubleTrap();
              }}
            >
              <Animated.View
                style={[
                  { width: 200, height: 200, borderWidth: 2 },
                  AnimatedTranlate,
                ]}
              >
                <Text>Hello</Text>
              </Animated.View>
            </TapGestureHandler>
          </TapGestureHandler>
        )}
      />
    </SafeAreaView>
  );
};

export default TestTouch;
