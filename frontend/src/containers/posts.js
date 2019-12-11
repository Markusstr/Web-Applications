import { compose } from "redux";
import { connect } from "react-redux";
import { asyncConnect} from "redux-connect";

import { getPosts } from "../actionCreators/posts";
import { PostList } from "../components/post"

const _async = asyncConnect([
    {
        promise: ({ store: {dispatch }}) => {
            return dispatch(getPosts());
        }
    }
]);

const mapStateToProps = state => {
    return {
        postList: state.postsReducer.postList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => {
            dispatch(getPosts());
        }
    };
};

const _connect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    _async,
    _connect
)(PostList);