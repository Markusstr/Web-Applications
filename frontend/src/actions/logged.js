
export function setLoggedState() {
    return {
        type: "SIGN_IN"
    };
}

export function removeLoggedState() {
    return {
        type: "SIGN_OUT"
    };
}

export function setUsername(username) {
    return {
        type: "SET_USERNAME",
        payload: {
            username
        }
    };
}

export function setSessionID(sessionID) {
    return {
        type: "SET_SESSION_ID",
        payload: {
            sessionID
        }
    };
}

