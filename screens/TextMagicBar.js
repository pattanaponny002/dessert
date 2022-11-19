import React, { useEffect } from "react";

import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Value } from "react-native-reanimated";

import { color } from "../material/color";

const TextMagicBar = () => {
  const [id, setId] = React.useState(0);
  const transitionX = React.useRef(new Animated.Value(0)).current;

  const TouchAnimated = Animated.createAnimatedComponent(TouchableOpacity);

  // useEffect(() => {

  //   console.log(` ID  =${id}`);
  // }, [id]);

  const Trigger = (index) => {
    Animated.spring(transitionX, {
      toValue: index === id ? 1 : 0,

      useNativeDriver: true,
    }).start(() => {
      console.log(` Triiger =${id}`);
    });
  };

  const AnimatedTransition = transitionX.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });
  return (
    <SafeAreaView>
      <FlatList
        data={color}
        renderItem={({ item, index }) => {
          return (
            <TouchAnimated
              onPress={() => {
                setId(index);
                Trigger(index);
                console.log(`INDEX:${index}`);
              }}
              style={{
                width: "95%",
                height: 100,
                borderWidth: 2,
                marginHorizontal: 10,
                marginTop: 20,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  color[Math.floor(Math.random() * color.length)],
                transform: [
                  { translateX: id === index ? AnimatedTransition : 0 },
                ],
              }}
            >
              <Text>{index}</Text>
            </TouchAnimated>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default TextMagicBar;
