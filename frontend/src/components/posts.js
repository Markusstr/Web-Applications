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
            response = await fetch("http://mongo-node-backend.rahtiapp.fi/api/getPosts");
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
                    <div key={index} className="post-container">
                        <div className="center-row">
                            <h4>{item.username}</h4>
                            <div className="date">
                            <h6>{item.date}</h6>
                            </div>
                        </div>
                        
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