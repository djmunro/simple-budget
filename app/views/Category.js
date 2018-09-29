import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ListItem, List, Text, Button } from "react-native-elements";

import { BudgetAPI } from "../BudgetAPI";
import {
  MaterialHeaderButtons,
  HeaderItem
} from "../components/MyHeaderButtons";

class Category extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam("category", "undefined")} Transactions`,
      headerRight: (
        <MaterialHeaderButtons>
          <HeaderItem
            title="add"
            iconName="add"
            onPress={() =>
              navigation.navigate("AddTransaction", {
                category: navigation.getParam("category")
              })
            }
          />
        </MaterialHeaderButtons>
      )
    };
  };

  state = {
    transactions: []
  };

  updateTransactions() {
    const { navigation } = this.props;
    const category = navigation.getParam("category", "NO-CATEGORY");
    BudgetAPI.getTransactions()
      .then(req => JSON.parse(req).filter(item => item.category == category))
      .then(json => this.setState({ transactions: json }))
      .catch(error => console.log("error! ", error));
  }

  componentDidMount() {
    this.eventUpdate = this.props.navigation.addListener("didFocus", () =>
      this.updateTransactions()
    );
  }

  componentWillUnmount() {
    this.eventUpdate.remove();
  }

  renderRow({ item }) {
    return (
      <ListItem
        title={item.payee}
        subtitle={item.date}
        rightTitle={item.amount}
        hideChevron
        titleContainerStyle={styles.PinItemTitle}
      />
    );
  }

  render() {
    this.updateTransactions();
    const { transactions } = this.state;

    return (
      <View style={styles.categoriesContent}>
        <FlatList
          data={transactions}
          renderItem={this.renderRow}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  categoriesContent: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch"
  }
});
export default Category;
