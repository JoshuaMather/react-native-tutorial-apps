import mockBackHandler from 'react-native/Libraries/Utilities/__mocks__/BackHandler.js';

jest.mock(
    'react-native/Libraries/Utilities/BackHandler',
    () => mockBackHandler
);

// jest.mock('react-native-permissions', () =>
//     require('react-native-permissions/mock')
// );
