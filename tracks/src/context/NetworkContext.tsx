import createDataContext from './createDataContext';

const networkReducer = (state, action) => {
    switch (action.type) {
        case 'network-state-changed':
            return {
                ...state,
                connected: action.payload.connected,
                networkType: action.payload.type,
            };
        default:
            return state;
    }
};

const networkChanged = (dispatch) => (connected, type) => {
    dispatch({ type: 'network-state-changed', payload: { connected, type } });
};

export const { Context, Provider } = createDataContext(
    networkReducer,
    { networkChanged },
    { connected: null, networkType: null }
);
