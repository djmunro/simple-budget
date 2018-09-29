import React, { Component } from "react";
import { NavigationActions, createStackNavigator } from "react-navigation";
import { View, StyleSheet, SectionList } from "react-native";

import { ListItem, Text, Icon } from "react-native-elements";
import PropTypes from "prop-types";

import Category from "./Category";
import AddTransaction from "./AddTransaction";
import {
  MaterialHeaderButtons,
  HeaderItem
} from "../components/MyHeaderButtons";
import { BudgetAPI } from "../BudgetAPI";

class Budget extends Component {
  state = { monthlyCategories: [], annualCategories: [] };

  updateCategories = () => {
    BudgetAPI.getCategories()
      .then(responseJson => responseJson.filter(item => item.type == "monthly"))
      .then(categories => this.setState({ monthlyCategories: categories }));

    BudgetAPI.getCategories()
      .then(responseJson => responseJson.filter(item => item.type == "annual"))
      .then(categories => this.setState({ annualCategories: categories }));
  };

  componentDidMount() {
    console.log("componentDidMount");
    // this.updateCategories();

    this.eventUpdate = this.props.navigation.addListener("didFocus", () => {
      console.log("didFocus");
      this.updateCategories();
    });
  }

  componentWillUnmount() {
    this.eventUpdate.remove();
  }

  navigateToScreen = (route, params = {}) => {
    const navigate = NavigationActions.navigate({
      routeName: route,
      params: params
    });
    this.props.navigation.dispatch(navigate);
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <MaterialHeaderButtons>
          <HeaderItem
            title="edit"
            iconName="edit"
            onPress={() => console.warn("add")}
          />
        </MaterialHeaderButtons>
      ),
      title: "Budget",
      headerRight: (
        <MaterialHeaderButtons>
          <HeaderItem
            title="add"
            iconName="add"
            onPress={() => navigation.navigate("AddTransaction", {})}
          />
        </MaterialHeaderButtons>
      )
    };
  };

  _renderRow = ({ item }) => (
    <ListItem
      key={item.id}
      title={item.name}
      titleStyle={{ marginLeft: 0 }}
      containerStyle={{ backgroundColor: "white" }}
      onPress={() =>
        this.navigateToScreen("Category", {
          id: item.id,
          category: item.name
        })
      }
      subtitle={this.renderBudgetProgress(item)}
      rightIcon={this.renderBudgetSummary(item)}
    />
  );

  renderBudgetProgress = item => (
    <View style={styles.BudgetContainer}>
      <View style={styles.BudgetTotal}>
        <View
          style={{
            width: `${(item.available /
              Math.max(parseFloat(item.budgeted), 1)) *
              100}%`,
            backgroundColor: `${item.available > 0 ? "#98FB98" : "tomato"}`
          }}
        >
          <Text style={styles.BudgetAvailableText}>{item.available}</Text>
        </View>
      </View>
    </View>
  );

  renderBudgetSummary = item => (
    <View style={styles.budgetSummary}>
      <View style={{ paddingRight: 10 }}>
        <Text style={styles.available}>${item.available}</Text>
        <Text style={styles.budgeted}>${item.budgeted}</Text>
      </View>
      <Icon name="chevron-right" size={20} />
    </View>
  );

  render() {
    const { monthlyCategories, annualCategories } = this.state;
    return (
      <View>
        <SectionList
          renderItem={this._renderRow}
          renderSectionHeader={({ section: { title } }) => (
            <View opacity={0.9} style={styles.titleContainer}>
              <Text>{title}</Text>
            </View>
          )}
          sections={[
            { title: "Monthly", data: monthlyCategories },
            { title: "Annual", data: annualCategories }
          ]}
          keyExtractor={(item, index) => item + index}
          stickySectionHeadersEnable
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  BudgetContainer: {
    flexDirection: "row"
  },
  BudgetTotal: {
    width: "150%",
    backgroundColor: "#f2f2f2"
  },
  BudgetAvailableText: {
    textAlign: "right",
    marginRight: 2,
    color: "#222",
    fontSize: 12
  },
  subtitleView: {
    flexDirection: "row"
  },
  budgetSummary: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  titleContainer: {
    backgroundColor: "#DCDCDC",
    padding: 8
  },
  available: {
    fontSize: 16,
    textAlign: "right"
  },
  budgeted: {
    fontSize: 12,
    textAlign: "right"
  }
});

const BudgetStack = createStackNavigator(
  {
    Budget: Budget,
    Category: Category,
    AddTransaction: AddTransaction
    // EditBudget: EditBudget
  },
  {
    initialRouteName: "Budget",
    mode: "modal"
  }
);

Budget.propTypes = {
  navigation: PropTypes.object
};

export default BudgetStack;
