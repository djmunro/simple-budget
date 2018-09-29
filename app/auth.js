import { AsyncStorage } from "react-native";
import storageKey from "./BudgetAPI";

export const onSignIn = () => AsyncStorage.setItem(storageKey, "true");

export const setStorage = data =>
  AsyncStorage.setItem("data", JSON.stringify(data));

export const onSignOut = () => AsyncStorage.removeItem(storageKey);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(storageKey)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
