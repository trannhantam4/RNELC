import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#81f547",
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: user.photoURL }}
            style={{ height: 40, width: 40 }}
          ></Image>
          <Text style={{ alignSelf: "center" }}>{user.displayName}</Text>
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
      <View style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            borderColor: "#292828",
            width: "30%",
            padding: 10,
            height: "10%",
            borderWidth: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Class</Text>
        </TouchableOpacity>
      </View>
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
export default Home;
