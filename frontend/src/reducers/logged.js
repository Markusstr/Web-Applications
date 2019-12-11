const initialState = {
    loggedState: false,
    username: ""
};

export function loggedReducer(state = initialState, action) {
    switch (action.type) {
        case "SIGN_IN":
            state.loggedState = true;
            return state;
        default:
            return state;
    }
}