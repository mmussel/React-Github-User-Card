import React from 'react';
import './App.css';
import axios from 'axios';
// import Usercard from "./Usercard";
import styled from 'styled-components';

const Container = styled.div `
  width: 90%;
  display: flex;
  align-items: center;
  margin: 5%;
  flex-direction: column;
`
const H1 = styled.h1 `
  background-color: white;
  color: #24292e; 
  padding: 2%;
`

const Card = styled.div `
  margin: 2%;
  border-radius: 30%;
  height: 200px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  img {
      object-fit: scale-down;
      max-height: 150px;
      border-radius: 20%;
    }
  background: #24292e;
  color: white;
`

class App extends React.Component {
  state = {
    users: [],
    followers: []
  };

  componentDidMount() {
    axios.get('https://api.github.com/users/mmussel')
    .then(response => {
      // console.log(response.data)
      this.setState({
        users: response.data
      });
    })
    .catch(error => {
      console.log("error", error)
    })
  }

  getFollowers = e => {
    e.preventDefault();
    axios.get('https://api.github.com/users/mmussel/followers')
      .then(response => {
        // console.log(response.data)
        this.setState({
          followers: response.data
        })
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  render() {
    return (
      <Container>
        <H1>React Github UserCard</H1>
        <Card>
          <div>
            <img src={this.state.users.avatar_url} alt={this.state.users.name} />
          </div>
          <div>
            <h3>{this.state.users.name}</h3>
            <p>Github: {this.state.users.login}</p>
          </div>
        </Card>
        <button onClick={this.getFollowers}>Show Followers ({this.state.users.followers})</button>
          {this.state.followers.map(followers => (
            <Card key={followers.id}>
              <div>
                <img src={followers.avatar_url} alt={followers.login} />
              </div>
              <div>
                <p>Github: {followers.login}</p>
              </div>
            </Card>
          ))}
      </Container>
    );
  }
  
}

export default App;
