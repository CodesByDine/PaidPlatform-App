import { useRouter, useSearchParams } from "expo-router";
import React from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import users from "../../assets/data/users";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const ProfilePage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const router = useRouter();
  const { id } = useSearchParams();

  const user = users.find((u) => u.id === id);

  if (!user) {
    return <Text>User not found</Text>;
  }

  return (
    <View>
      {/* Header */}
      <ImageBackground source={{ uri: user.coverImage }} style={styles.cover}>
        <View style={styles.overlay} />
        <SafeAreaView
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            onPress={() => router.back()}
            name="arrow-back"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "500",
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
            <Text style={{ color: "white" }}>
              1.4k Posts · 64.3k Likes · 15.3K Fans
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
      {/* End Of Header */}

      {/* User Info */}
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: -50,
          }}
        >
          <Image src={user.avatar} style={styles.userImage} />
          <FontAwesome name="share-square-o" size={24} color="royalblue" />
        </View>

        <Text style={{ fontSize: 20, fontWeight: "600", marginVertical: 5 }}>
          {user.name}
        </Text>
        <Text style={{ color: "gray", marginBottom: 10 }}>@{user.handle}</Text>
        <Text style={{ lineHeight: 20 }}>{user.bio}</Text>

        <Text style={{ color: "gray", marginTop: 20, fontWeight: "bold" }}>
          SUBSCRIPTION
        </Text>

        <Pressable
          onPress={() => setIsSubscribed(!isSubscribed)}
          style={[
            styles.button,
            { backgroundColor: isSubscribed ? "white" : "royalblue" },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isSubscribed ? "royalblue" : "white" },
            ]}
          >
            {isSubscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
          </Text>
          <Text
            style={[
              styles.buttonText,
              { color: isSubscribed ? "royalblue" : "white" },
            ]}
          >
            {user.subscriptionPrice === 0
              ? "FOR FREE"
              : `$${user.subscriptionPrice} / month`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: 200,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginVertical: 10,
  },
  buttonText: {
    color: "royalblue",
    fontWeight: "600",
  },
});

export default ProfilePage;
