import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from "../components/screens/LoginScreen";

test('validateFields method checks for empty fields and displays a warning message', async () => {
    const { getByText } = render(<LoginScreen />);

    // Get the 'Zaloguj się' button
    const loginButton = getByText('Zaloguj się');

    // Click the login button without entering login and password
    fireEvent.press(loginButton);

    // Check if the warning message is displayed
    const warningMessage = await waitFor(() =>
        getByText('Uzupełnij wszystkie pola.')
    );
    expect(warningMessage).toBeDefined();
});