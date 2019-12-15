import Cookies from "js-cookie";

export const checkCookie = async(username) => {
    let response, data;
    let cookie = Cookies.get("sessionID");
    if (cookie === null || cookie === undefined) {
        return false;
    }
    const bodyData = {
        sessionID: cookie
    }
    try {
        response = await fetch("http://mongo-node-backend.rahtiapp.fi/api/getUserByID", {
            method: "post",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(bodyData)
        });
        data = await response.json();
    }
    catch (err) {
        return false;
    }
    if (data === null) {
        return false;
    }
    else {
        return data;
    }
}