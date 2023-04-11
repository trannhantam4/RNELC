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
import Header from "./Header";
export default function App() {
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
  if (!user) {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 300, height: 65, marginTop: 300 }}
          onPress={onGoogleButtonPress}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#81f547",
            padding: 10,
          }}
        >
          <View style={{ flexDirection: "row", width: "30%" }}>
            <Image
              source={{ uri: user.photoURL }}
              style={{ height: 50, width: 50, borderRadius: 10 }}
            ></Image>
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {user.displayName}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderColor: "#000",
              padding: 7,
              borderRadius: 10,
            }}
            onPress={signOut}
          >
            <AntDesign name="poweroff" size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#fff",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Class</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Class</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Class</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    borderRadius: 10,
    borderColor: "#292828",
    width: "25%",
    padding: 10,
    height: "10%",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontWeight: "bold", color: "#81f547" },
});
