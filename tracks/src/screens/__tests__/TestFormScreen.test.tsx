import renderer from 'react-test-renderer';
import TestFormScreen from '../TestFormScreen';

jest.mock('expo-barcode-scanner', () => ({
    BarCodeScanner: {
        requestPermissionsAsync: jest.fn(),
    },
}));

it('renders correctly', () => {
    const tree = renderer.create(<TestFormScreen test={true} />).toJSON();
    expect(tree).toMatchSnapshot();
});
