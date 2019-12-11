import React from "react";
import {Spinner} from "react-bootstrap";

class Posts extends React.Component {
    state = {
        fetching: true,
        postList: []
    };

    async componentDidMount() {
        let response, data;
        try {
            response = await fetch("http://localhost:8080/api/getPosts")
            data = await response.json();
            this.setState({fetching: false, postList: data});
        }
        catch (err) {
            this.setState({fething: false});
        }
        
    }

    render() {
        const posts = this.state.postList;
    
        const postList = this.state.fetching ?
            <div className="loading">
                <Spinner animation="border" /> 
            </div> :
            posts.map((item, index) => {
                return(
                    <div className="post-container">
                        <h4>{item.username}</h4>
                        <hr />
                        <p>{item.text}</p>
                    </div>
                );
        })
        return (
            <div>
                {postList}
            </div>
        );
    }
}

export default Posts;