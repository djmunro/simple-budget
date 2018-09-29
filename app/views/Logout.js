import React, { Component } from "react";
import { ScrollView, Button, StyleSheet, View, Text } from "react-native";
import { onSignOut } from "../auth";

class Logout extends Component {
  _handleSubmit = () => {
    let navigation = this.props.navigation;
    onSignOut().then(() => navigation.navigate("SignedOut"));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={this._handleSubmit}
            style={{ marginTop: 40 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default Logout;
