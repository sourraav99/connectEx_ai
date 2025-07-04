const initialState = {
    isLoggedIn: false,
    userData: null,
};

const authReducer = (state = initialState, action) => {
    console.log('action=====>>>>', action);

    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload,
                // userData: action.payload,
            };
        case 'SET_LOGGED_OUT':
            return {
                ...state,
                isLoggedIn: false,
                userData: null,
            };
        default:
            return state;
    }
};

export default authReducer;
