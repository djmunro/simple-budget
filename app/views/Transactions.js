import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ListItem, List, Text, Button } from "react-native-elements";

import { BudgetAPI } from "../BudgetAPI";
import {
  MaterialHeaderButtons,
  HeaderItem
} from "../components/MyHeaderButtons";

class Transactions extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Transactions",
      headerRight: (
        <MaterialHeaderButtons>
          <HeaderItem title="add" iconName="add" />
        </MaterialHeaderButtons>
      )
    };
  };

  state = {
    transactions: []
  };

  componentDidMount() {
    BudgetAPI.getTransactions()
      .then(req => JSON.parse(req))
      .then(responseJson => this.setState({ transactions: responseJson }))
      .catch(error => console.log("error! ", error));
  }

  renderRow({ item }) {
    return (
      <ListItem
        title={item.payee}
        subtitle={item.date}
        rightTitle={item.amount}
        hideChevron
        titleContainerStyle={{ width: 200 }}
      />
    );
  }

  render() {
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
export default Transactions;
