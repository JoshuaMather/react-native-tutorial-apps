// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from '../../store/store';
// import renderer from 'react-test-renderer';
// import SigninScreen from '../SigninScreen';
// import { NavigationContainer } from '@react-navigation/native';
// import { navigationRef } from '../../navigationRef';
// import { BackHandler } from 'react-native';

// const mockedCanGoBack = jest.fn().mockReturnValue(true);

// const mockedGoBack = jest.fn();
// const mockedAddListener = jest.fn();

// const mockedNavigation = {
//     canGoBack: mockedCanGoBack,
//     goBack: mockedGoBack,
//     addListener: mockedAddListener,
// };

// jest.mock('react-native', () => {
//     BackHandler;
// });
// jest.mock('react-native/Libraries/Utilities/BackHandler', () =>
//     require('react-native/Libraries/Utilities/__mocks__/BackHandler')
// );

// test('renders correctly', () => {
//     const tree = renderer
//         .create(
//             <Provider store={store}>
//                 <NavigationContainer ref={navigationRef}>
//                     <SigninScreen navigation={mockedNavigation as any} />
//                 </NavigationContainer>
//             </Provider>
//         )
//         .toJSON();
//     expect(tree).toMatchSnapshot();
// });
