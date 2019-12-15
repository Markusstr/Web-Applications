import React from "react";
import { Spinner } from "react-bootstrap";

class Posts extends React.Component {
    state = {
        fetching: true,
        postList: []
    };

    async componentDidMount() {
        //dispatch = useDispatch();
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

    /*async handleRemove(item) {
        let response, data;
        const bodyData = {
            id: item._id
        }
        try {
            response = await fetch("http://localhost:8080/api/removePost", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            data = await response.json();
        }
        catch (err) {
            //TODO: Error handling
        }
    }*/

    render() {
        const posts = this.state.postList;
    
        const postList = this.state.fetching ?
            <div className="loading">
                <Spinner animation="border" /> 
            </div> :
            posts.map((item, index) => {
                return(
                    <div key={item._id} className="post-container">
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

/*function Posts() {
    console.log("Posts");
    const [info, setInfo] = useState({fetching: true, postList: []});
    let username = useSelector(state => state.loggedReducer.username);

    const dispatch = useDispatch();

    const handleRemove = (async item => {
        let response, data;
        const bodyData = {
            id: item._id
        }
        try {
            response = await fetch("http://localhost:8080/api/removePost", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            data = await response.json();
        }
        catch (err) {
            //TODO: Error handling
        }
        dispatch(setLoggedState());
    });
    let response2, data2;
    const fetchData = async() => {
        console.log("Fetchdata");
        try {
            response2 = await fetch("http://localhost:8080/api/getPosts");
            data2 = await response2.json();
            setInfo({fetching: false, postList: data2});
        }
        catch (err) {
            setInfo({fething: false});
        }
    }
    fetchData();
    


    return(
        <div>
            {info.fetching ? 
            <div className="loading">
                <Spinner animation="border" /> 
            </div> : [
            info.postList.map(item => (
                <div key={item._id} className="post-container">
                    <div className="center-row">
                        <h4>{item.username}</h4>
                        <div className="date">
                        {item.username === username ? 
                        <Button variant="link" onClick={() => handleRemove(item)}>Remove</Button>
                        : "" }
                        <h6>{item.date}</h6>
                        </div>
                        
                    </div>
                    <hr />
                    <p>{item.text}</p>
                </div>
            ))]}
        </div>
    );
}*/



export default Posts;