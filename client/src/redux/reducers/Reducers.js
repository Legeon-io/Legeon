const sessionReducer = (state = { username: undefined }, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                username: action.payload.username,
            };
        case 'LOGOUT':
            return {
                ...state,
                username: undefined,
            };
        default:
            return state;
    }
};

export default sessionReducer;