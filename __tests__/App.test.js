import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import App from "../App";

describe("Form Validations", () => {
  let getByPlaceholderText,
    queryByText,
    getByTestId,
    usernameInput,
    emailInput,
    submitButton;
  beforeEach(() => {
    ({ getByPlaceholderText, queryAllByText, queryByText, getByTestId } =
      render(<App />));
    usernameInput = getByPlaceholderText("username");
    emailInput = getByPlaceholderText("email");
    submitButton = getByTestId("button");
  });

  it("does not show error messages when required values are fullfilled", async () => {
    fireEvent.changeText(usernameInput, "Mohamed");
    fireEvent.changeText(emailInput, "mohamed@email.com");

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    await waitFor(() => {
      expect(queryByText("username is required")).toBeNull();
      expect(queryByText("email is required")).toBeNull();
    });
  });

  it("shows error messages when required values are not fullfilled", async () => {
    fireEvent.changeText(usernameInput, "");
    fireEvent.changeText(emailInput, "");

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    await waitFor(() => {
      expect(queryByText("username is required")).toBeTruthy();
      expect(queryByText("email is required")).toBeTruthy();
    });
  });

  it("does not show error message when email is valid", async () => {
    fireEvent.changeText(usernameInput, "Mohamed");
    fireEvent.changeText(emailInput, "mohamed@email.com");

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    await waitFor(() => {
      expect(queryByText("email must be a valid email")).toBeNull();
    });
  });

  it("shows error message when email is not valid", async () => {
    fireEvent.changeText(usernameInput, "Mohamed");
    fireEvent.changeText(emailInput, "mohamed");

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    await waitFor(() => {
      expect(queryByText("email must be a valid email")).toBeTruthy();
    });
  });

  it("renders correctly", () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});