import React from 'react';
import axios from 'axios';
import DisplayDog from './DisplayDog';
import NavBar from './NavBar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      selectAnimal: '',
      featuredDog: '',
      allDogs: '',
    }
    this.nextDog = this.nextDog.bind(this);
    this.previousDog = this.previousDog.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
  }
  

  componentWillMount() {
    axios.get('/dog-tinder-api?location=07470') 
      .then(response => {
        return response.data;
      })
      .then(data => {
        this.setState({
          featuredDog: data.petfinder.pets.pet[0],
          allDogs: data.petfinder.pets.pet
        })
      })
      .catch(error => {
        console.error(error)
      });
  }

  nextDog() {
    let next = this.state.index + 1; 
    this.setState({
      featuredDog: this.state.allDogs[next],
      index: next
    });
  }

  previousDog() {
    let previous = this.state.index - 1;
    this.setState({
      featuredDog: this.state.allDogs[previous],
      index: previous
    });
  }
  
  //sends submitted zipcode to server to zipcode endpoint
  handleSearchQuery(query) {
    axios.get('/dog-tinder-api?', {
      params: query
    })
    .then(response => {
      this.setState({
        //set all dogs equal to animals retrieved from specified zipcode 
        allDogs: response.data
      }) 
    }) 
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    console.log('THIS IS THE FEATURED DOG FROM APP COMPONENT:', this.state.featuredDog)
    return (
      <div>
        <h1 style={{fontSize:'50px'}}>Dog Tinder</h1>
        <NavBar submitQuery={this.handleSearchQuery}/>
        {this.state.featuredDog !== '' ? <DisplayDog dog={this.state.featuredDog} nextDog={this.nextDog} previousDog={this.previousDog} index={this.state.index}/> : <div></div>}
      </div>
    );
  }
}



