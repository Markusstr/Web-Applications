const initialState = {
    loggedState: false,
    username: "",
    sessionID: ""
};

export function loggedReducer(state = initialState, action) {
    switch (action.type) {
        case "SIGN_IN":
            state.loggedState = true;
            return state;
        case "SIGN_OUT":
            state.loggedState = false;
            return state;
        case "SET_USERNAME":
            state.username = action.payload.username;
            return state;
        case "SET_SESSION_ID":
            state.sessionID = action.payload.sessionID;
            return state;
        default:
            return state;
    }
}