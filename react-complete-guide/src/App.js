import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {

  const [personState, setPersonState] = useState({
    persons : [
      { name: 'Max', age: '28'},
      { name: 'Min', age: '31'},
      { name: 'Subho', age: '27'},
    ],
    otherState: 'Some ther value'
  });

  const switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // this.state.persons[0].name = "Subhajit";
    setPersonState({
      persons : [
        { name: 'Subhajit', age: '28'},
        { name: newName, age: '31'},
        { name: 'Subho', age: '27'},
      ]
    });
  };

  const nameChangedHandler = (event) => {
    setPersonState({
      persons : [
        { name: 'Subhajit', age: '28'},
        { name: event.target.value, age: '31'},
        { name: 'Subho', age: '27'},
      ]
    });
  };
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">Welcome to React</h1>
    //     </header>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.js</code> and save to reload.
    //     </p>
    //   </div>
    // );
    // return React.createElement('div', {className: "App"}, React.createElement('h1', null,'I\'m a React app!!'));
    return (
      <div className="App">
        <h1>Hi, I'm React App!!</h1>
        <button onClick= {() =>switchNameHandler("Subhajit!!")}>Switch name!</button>
        <Person name={personState.persons[0].name} age={personState.persons[0].age}/>
        <Person name={personState.persons[1].name} age={personState.persons[1].age}
        changed={nameChangedHandler}/>
        <Person click={switchNameHandler.bind(this, 'Sourav')} name={personState.persons[2].name} age={personState.persons[2].age}>Some Text</Person>
      </div>
    );
}

export default app;
