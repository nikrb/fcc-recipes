import React, { Component } from 'react';
import RecipeList from './components/RecipeList';
import './App.css';

class App extends Component {
  state = {
    font_size: 12
  };
  smallerFont = () => {
    localStorage.setItem( 'font_size', this.state.font_size-1);
    this.setState( { font_size: this.state.font_size - 1});
  };
  largerFont = () => {
    localStorage.setItem( 'font_size', this.state.font_size+1);
    this.setState( { font_size: this.state.font_size + 1});
  };
  render() {
    const style = {
      fontSize: `${this.state.font_size/10}em`,
      userSelect: "none"
    };
    const large_font = {
      fontSize: ".9em",
      margin:"0",
      padding:"2px"
    }
    const small_font = {
      fontSize: ".6em",
      margin:"0",
      padding:"2px"
    };
    const scale_wrapper = {
      position: "absolute",
      right: "0",
      top: "0"
    };
    return (
      <div className="App" style={style}>
        <div style={scale_wrapper}>
          <button type="button" style={small_font} onClick={this.smallerFont} >A</button>
          <button type="button" style={large_font} onClick={this.largerFont} >A</button>
        </div>
        <h1>Mum's Recipes</h1>
        <RecipeList />
      </div>
    );
  }
}

export default App;
