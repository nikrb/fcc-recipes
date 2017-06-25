import React, { Component } from 'react';
import RecipeList from './components/RecipeList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Mum's Recipes</h1>
        <RecipeList />
      </div>
    );
  }
}

export default App;
