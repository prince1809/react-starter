import React, { PureComponent } from 'react';
import  classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

class App extends PureComponent {

  constructor(props) {
    super(props)
    console.log('[App.js] Inside constructor',props)
    this.state = {
      persons: [
        {id: '1', name : 'Prince', age: 28},
        {id: '2', name: 'John', age: 28},
        {id: '3', name: 'Alex', age: 28}
      ],
      otherState: 'Some other value',
      showPersons: false
    }
  }

  componentWillMount(){
    console.log('[App.js] Inside ComponentWillMount')
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount')
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return true;
  // }
  
  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }


  // state  = {
  //   persons: [
  //     {id: '1', name : 'Prince', age: 28},
  //     {id: '2', name: 'John', age: 28},
  //     {id: '3', name: 'Alex', age: 28}
  //   ],
  //   otherState: 'Some other vlaue',
  //   showPersons: false
  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons;
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState( {persons: persons} );
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  render() {

    console.log('[App.js] Inside render');

    let persons = null;

    if(this.state.showPersons) {
      persons =
          <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />
    }

    return (
      <WithClass classes={classes.App}>
          <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
          <Cockpit 
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonHandler} />
          {persons}
      </WithClass>
    );
  }
}

export default App;
