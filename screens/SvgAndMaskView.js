import React, { useEffect, useRef } from "react";
import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";
import { color, colors, links, routes } from "../material/util";
import { Svg, Polygon, Rect } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";

const { width, height } = Dimensions.get("window");

const AnimatePolygon = Animated.createAnimatedComponent(Polygon);

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

/// Go where ???
const fromCoords = { x: 0, y: height };
const toCoords = { x: width, y: 0 };
//tracking

const Button = ({ title, style, onPress }) => {
  return (
    
    <TouchableOpacity activeOpacity={0.2} onPress={onPress}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

// CUSTOM **
const CustomDrawer = ({ onPress, animatedValue }) => {
  //Ref for nativeprops
  const polygonRef = useRef();

  const [selectedRoute, setSelectedRoute] = React.useState(routes[0]);
  ///RUN ANIAMTION
  React.useEffect(() => {
    //Supplying animateValue on Polygon
    animatedValue.addListener((v) => {
      // console.log(v.x);
      // console.log(v.y);
      if (polygonRef?.current) {
        polygonRef.current.setNativeProps({
          points: `0,0 ${v.x}, ${v.y} ${width}, ${height} 0, ${height}`,
        });
      }
    });
  });

  const translateX = animatedValue.x.interpolate({
    inputRange: [0, width],
    outputRange: [-100, 0],
  });

  const opacity = animatedValue.x.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1],
  });

  return (
    <MaskedView
      style={{ flex: 1 }}
      
      maskElement={
        /// [2] Go where ???
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ backgroundColor: "transparent" }}
        >
          <AnimatePolygon
            ref={polygonRef}
            onPress={onPress}
            fill={"green"}
            points={`0,0 ${fromCoords.x}, ${fromCoords.y} ${width}, ${height} 0, ${height}`}
            // ${fromCoords.x},${fromCoords.y}
          />
        </Svg>
      }
    >
      <Animated.View
        style={[styles.menuContainer, { opacity, transform: [{ translateX }] }]}
      >
        <AntDesign
          onPress={onPress}
          name="close"
          size={32}
          color="white"
          style={{ position: "absolute", top: 40, right: 30 }}
        />
        <View style={styles.menu}>
          <View>
            {routes.map((route, index) => {
              return (
                <Button
                  onPress={() => {
                    setSelectedRoute(route);

                    onPress();
                  }}
                  key={route}
                  title={route}
                  style={[
                    styles.button,
                    {
                      color: colors[index],
                      textDecorationLine:
                        route === selectedRoute ? "line-through" : "none",
                    },
                  ]}
                />
              );
            })}
          </View>
          <View>
            {links.map((link, index) => {
              return (
                <Button
                  title={link}
                  key={index}
                  style={[
                    styles.button,
                    { color: colors[index + routes.length + 1] },
                  ]}
                />
              );
            })}
          </View>
        </View>
      </Animated.View>
    </MaskedView>
  );
};

const SvgAndMaskView = () => {
  const animatedValue = React.useRef(new Animated.ValueXY(fromCoords)).current;

  const animate = (toValue) => {
    return Animated.spring(animatedValue, {
      toValue: toValue === 1 ? toCoords : fromCoords,
      bounciness: 15,
      speed: 1,
      useNativeDriver: true,
    });
  };
  const onCloseDrawer = React.useCallback(() => {
    animate(0).start();
    console.log("Back animated");
    //cloase Animation
  }, []);

  const onOpenDrawer = React.useCallback(() => {
    //open Animation
    animate(1).start();

    console.log("Go animated");
  }, []);

  const translateX = animatedValue.y.interpolate({
    inputRange: [0, height * 0.3],
    outputRange: [100, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1 }}>
      <CustomDrawer onPress={onCloseDrawer} animatedValue={animatedValue} />
      <StatusBar hidden />
      <AnimatedAntDesign
        onPress={onOpenDrawer}
        name="menufold"
        size={32}
        color="#222"
        style={{
          position: "absolute",
          top: 40,
          right: 50,
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  maskedContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "#222",
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menu: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    fontSize: 32,
    color: "#fdfdfd",
    lineHeight: 32 * 1.5,
  },
  buttonSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fdfdfd",
  },
});

export default SvgAndMaskView;
