import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import BudgetStack from "../views/Budget";
import Transactions from "../views/Transactions";
import AddTransaction from "../views/AddTransaction";
import Reports from "../views/Reports";
import SignIn from "../views/SignIn";
import Logout from "../views/Logout";

export const SignedIn = createBottomTabNavigator(
  {
    Budget: {
      screen: BudgetStack,
      navigationOptions: {
        tabBarLabel: "Budget",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="dollar" type="font-awesome" color={tintColor} />
        )
      }
    },
    Transactions: {
      screen: Transactions,
      navigationOptions: {
        tabBarLabel: "Transactions",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" color={tintColor} />
        )
      }
    },
    Reports: {
      screen: Reports,
      navigationOptions: {
        tabBarLabel: "Reports",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bank" type="font-awesome" color={tintColor} />
        )
      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        tabBarLabel: "More",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ellipsis-h" type="font-awesome" color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigatorOptions: {
      title: "Sign Up"
    }
  }
});

export const RootNavigator = (signedIn = false) => {
  return createStackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigatorOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigatorOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
