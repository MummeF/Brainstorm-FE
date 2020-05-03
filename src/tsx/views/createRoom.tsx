import React, { Component } from 'react';
import axios from 'axios';
import { Typography, TextField, Button } from "@material-ui/core";

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

class CreateRoom extends Component {

    /*
    constructor(props) {
        super(props);
     
        this.state = {
          hits: [],
          isLoading: false,
          error: null,
        };
      }
     
      componentDidMount() {
        this.setState({ isLoading: true });
     
        axios.get(API + DEFAULT_QUERY)
          .then(result => this.setState({
            hits: result.data.hits,
            isLoading: false
          }))
          .catch(error => this.setState({
            error,
            isLoading: false
          }));
      }
      */

    
    state = {
      id: []
    }
  
    sayHello() {
      alert('Hello!');
    }
    
    componentDidMount() {
      fetch('http://jsonplaceholder.typicode.com/todos')
      //fetch('http://localhost:8080/isAlive')
      .then(res => res.json())
      .then((data) => {
        this.setState({ todos: data })
        console.log(this.state.id)
      })
      .catch(console.log)
    }
    

    render() {
      return (
        <>
        <Typography variant="h3">Ein Meeting erstellen</Typography>
        <br></br>
        <Button variant="contained" color="primary" onClick={this.componentDidMount}>
            Raum erstellen
        </Button>
        <br></br>
        <br></br>
        <br></br>
        <Button variant="contained" color="primary" href="http://localhost:3000/room">
            Teilnehmen
        </Button>
         </>
      );
    }
  }
  
  export default CreateRoom;