import 'react-native';
import React from 'react';
import SigninScreen from '../SigninScreen';

import renderer from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';

// const navigation = useNavigation();

describe('Signin', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<SigninScreen navigation={null} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
