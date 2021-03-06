import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext, login, signup } from "../firebase";
import { RootStackParamList } from "../types";

const Login = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const [name, setName] = useState("");

  const authContext = useContext(AuthContext);

  const handleLogin = async () => {
    await login(email, password, authContext);
  };

  const handleSignup = async () => {
    if (!signingUp) {
      setSigningUp(true);
    } else {
      await signup(email, password, name, authContext);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.layout}>
        <Text style={styles.h1}>Super Secret Santa</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
          autoCompleteType={"email"}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
          secureTextEntry
          autoCompleteType={"password"}
        />
        <View style={styles.buttonContainer}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {signingUp ? (
                <TextInput
                  placeholder="Full Name"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  style={styles.textInput}
                  autoCompleteType={"name"}
                />
              ) : (
                <TouchableOpacity
                  onPress={async () => await handleLogin()}
                  style={[styles.button, styles.shadow3]}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => handleSignup()}
                style={[styles.button, styles.shadow3]}
              >
                <Text style={styles.buttonText}>
                  {signingUp ? "Join" : "Register"}
                </Text>
              </TouchableOpacity>
            </>
          )}
          {!loading && !!error && <Text>{error}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ff4141",
    height: "100%",
  },
  layout: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  h1: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 36,
  },
  textInput: {
    borderColor: "#eee",
    borderRadius: 4,
    borderWidth: 0.5,
    backgroundColor: "#fff",
    color: "#000",
    minWidth: 200,
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7bff98",
    borderRadius: 16,
    marginTop: 12,
    borderColor: "#fff",
    borderWidth: 4,
    minWidth: 200,
    overflow: "hidden",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  shadow3: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
