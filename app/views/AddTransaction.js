import React, { Component } from "react";
import { ScrollView, TextInput, StyleSheet, View } from "react-native";
import { FormInput, Button } from "react-native-elements";
import { compose } from "recompose";
import { Formik } from "formik";
import * as Yup from "yup";
import makeInputGreatAgain, {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  KeyboardModal,
  withPickerValues
} from "react-native-formik";
import MaterialTextInput from "../components/MaterialTextInput";
import { BudgetAPI } from "../BudgetAPI";

const MyInput = compose(
  makeInputGreatAgain,
  withNextInputAutoFocusInput
)(MaterialTextInput);

const MyPicker = compose(
  makeInputGreatAgain,
  withPickerValues
)(MaterialTextInput);

const Form = withNextInputAutoFocusForm(View);

const validationSchema = Yup.object().shape({
  payee: Yup.string().required("please enter the payee"),
  amount: Yup.string().required("please enter the transaction amount")
});

class Reports extends Component {
  state = {
    categories: []
  };

  componentWillMount() {
    BudgetAPI.getCategories()
      .then(responseJson =>
        responseJson.map(item => ({ label: item.name, value: item.name }))
      )
      .then(categories => this.setState({ categories: categories }));
  }

  handleSubmit = () => {
    const value = this.formRef.getValue();
    console.log("value:", value);
  };

  render() {
    const { categories } = this.state;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          styled
          onSubmit={values => {
            BudgetAPI.addTransaction({
              payee: values.payee,
              amount: values.amount,
              category: values.category
            })
              .then(KeyboardModal.dismiss())
              .then(this.props.navigation.goBack());
          }}
          validationSchema={validationSchema}
          render={props => {
            return (
              <Form>
                <MyInput label="Payee" name="payee" type="name" />
                <MyInput label="Amount" name="amount" keyboardType="numeric" />
                <MyPicker
                  label="Category"
                  name="category"
                  // value={this.props.navigation.getParam("category", null)}
                  values={categories}
                />
                <Button onPress={props.handleSubmit} title="SUBMIT" />
              </Form>
            );
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20
  },
  contentContainer: {
    flex: 1
  }
});
export default Reports;
