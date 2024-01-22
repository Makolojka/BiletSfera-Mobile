import React from 'react';
import renderer from 'react-test-renderer';
import TransactionsScreen from "../components/screens/TransactionsScreen";
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
test('renders correctly', () => {
    const tree = renderer.create(<TransactionsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

