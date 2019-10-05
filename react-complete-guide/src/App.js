import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Dialog from './Dialog/Dialog';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonToolbar, Button} from 'react-bootstrap';
import Radium, {StyleRoot} from 'radium';

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Manu', age: 29 },
      { id: '3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    modalShow : false
  };
  setModalShow = (showVar) => {
    this.setState({
      modalShow : showVar
    });
  };

  /*switchNameHandler = ( newName ) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState( {
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    } )
  }*/

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    // const person = this.state.persons[personIndex];
    const person = {
        ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState( {
      persons: persons
    } )
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex,1);
    this.setState({
      persons: persons
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      },
    };

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            })
          }
         {/* 
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age} />
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind( this, 'Max!' )}
            changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
          <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age} />
         */}
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    // let classes = ['Red','Bold'].join(' ');
    let classes = [];
    if(this.state.persons.length<=2) {
      classes.push('Red');
    }
    if(this.state.persons.length<=1) {
      classes.push('Bold');
    }

    return (
      <StyleRoot>
        <div className="App">
        <ButtonToolbar>
          <Button variant="primary" onClick={() => this.setModalShow(true)}>
            Launch vertically centered modal
          </Button>
          <Dialog show={this.state.modalShow} onHide={() => this.setModalShow(false)} />
        </ButtonToolbar>
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
      </StyleRoot>
      
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);

