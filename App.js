import React, { useEffect, useRef } from "react";
import {
  TextInput,
  Pressable,
  Text,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  email: Yup.string().email().required("email is required"),
});

export default function App() {
  const translateY = useRef(new Animated.Value(100)).current;
  const btnAnimation = useRef(new Animated.Value(0)).current;
  const scale = btnAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  const onPressIn = () => {
    Animated.spring(btnAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(btnAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", email: "" }}
        validateOnChange={false}
        validationSchema={Schema}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => {
          return (
            <Animated.View
              style={{
                transform: [{ translateY }],
              }}
            >
              <TextInput
                onChangeText={handleChange("username")}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder="username"
                style={styles.input}
              />

              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="email"
                style={styles.input}
              />

              <View>
                <AnimatedPressable
                  style={[styles.pressable, { transform: [{ scale }] }]}
                  onPress={handleSubmit}
                  onPressIn={onPressIn}
                  testID="button"
                  onPressOut={onPressOut}
                >
                  <Text style={styles.ButtonText}>submit</Text>
                </AnimatedPressable>
                {errors.username && touched.username && (
                  <Text style={styles.text}>{errors.username}</Text>
                )}
                {errors.email && touched.email && (
                  <Text style={styles.text}>{errors.email}</Text>
                )}
              </View>
            </Animated.View>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 250,
    height: 40,
    marginBottom: 5,
    borderWidth: 2,
    padding: 5,
    borderColor: "#000",
  },
  pressable: {
    width: 250,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#000",
  },
  ButtonText: {
    color: "#fff",
  },
});