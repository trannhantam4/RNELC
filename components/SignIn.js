import { StatusBar } from "expo-status-bar";
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "expo-dev-client";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import React, { useState, useEffect } from "react";

import { AntDesign } from "react-native-vector-icons";
const { height, width } = Dimensions.get("screen");
const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState("");

function onAuthStateChanged(user) {
  setUser(user);
  if (initializing) setInitializing(false);
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber;
}, []);
if (initializing) return null;

const onGoogleButtonPress = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const user_sign_in = auth().signInWithCredential(googleCredential);
  user_sign_in
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};
const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await auth().signOut();
  } catch (error) {
    console.log(error);
  }
};
GoogleSignin.configure({
  webClientId:
    "137526910351-ocbvdkdvapefils0ocb6shfsr8di1k6q.apps.googleusercontent.com",
});
const SignIn = () => {
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={{ width: 300, height: 65, marginTop: 300 }}
        onPress={({ onGoogleButtonPress }, navigation.navigate("Home"))}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
export default SignIn;
