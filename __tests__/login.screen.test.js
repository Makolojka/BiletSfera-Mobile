import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from "../components/screens/LoginScreen";
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
test('renders correctly', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

