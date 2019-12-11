import { GET_REQUEST, GET_SUCCESS, GET_FAILURE} from "../actions/posts";

const initialState = {
    isFetching: false,
    postList: []
};

export function postsReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_REQUEST":
            state.isFetching = true;
            return state;
        
        case "GET_SUCCESS":
            state = {
                isFetching : false,
                postList: action.payload.postList
            }
            return state;

        case "GET_FAILURE":
            state = {
                isFetching: false,
                message: action.payload.message
            }
            return state;

        default:
            return state;
    }
}