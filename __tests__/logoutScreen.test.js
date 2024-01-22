import React from 'react';
import renderer from 'react-test-renderer';
import LogoutScreen from "../components/screens/LogoutScreen";

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
test('renders correctly', () => {
    const tree = renderer.create(<LogoutScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

