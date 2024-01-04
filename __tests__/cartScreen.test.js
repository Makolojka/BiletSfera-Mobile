import React from 'react';
import renderer from 'react-test-renderer';
import CartScreen from "../components/screens/CartScreen";

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
test('renders correctly', () => {
    const tree = renderer.create(<CartScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

