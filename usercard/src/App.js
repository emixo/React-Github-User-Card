import React, { Component } from "react";
import axios from "axios";
import "./App.css";
class App extends Component {
  state = {
    users: [],
    followers: [],
    display: false
  };

  componentDidMount() {
    console.log("app is mounting");
    axios
      .get("https://api.github.com/users/emixo")
      .then((res) => {
        console.log(res.data);
        this.setState({
          users: [res.data],

        })
      })
      .catch((err) => {
        console.log(err);
      });
      axios
      .get("https://api.github.com/users/emixo/followers")
      .then((res) => {
        console.log(res.data);
        this.setState({
          followers: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleFollowers = (event) => {
    event.preventDefault()
    this.setState({display:!this.state.display})

  }


  render() {
    return (
      <div className="App">
        <h1>Git User Cards</h1>
        <div className="users">
          {this.state.users.map((user) => (
            <div key={user.id} className="user">
              <h2>{user.name}</h2>
              <img src={user.avatar_url} />
              <p>{user.bio}</p>
              <button onClick={this.toggleFollowers}>Followers</button>
              {this.state.display && this.state.followers.map(follower => (
              <div key={follower.id}>
                <img src={follower.avatar_url} />
                <h3>{follower.login}</h3>
              </div>))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default App;