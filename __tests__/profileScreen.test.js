import React from 'react';
import renderer from 'react-test-renderer';
import ProfileScreen from "../components/screens/ProfileScreen";

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
test('renders correctly', () => {
    const tree = renderer.create(<ProfileScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

