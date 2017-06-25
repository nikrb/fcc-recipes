import React from 'react';
import Recipe from './Recipe';
import ListItem from './ListItem';
import RecipeActions from './RecipeActions';

export default class RecipeList extends React.Component {
  state = {
    recipe_list: []
  };
  // temp id before we save a recipe
  sequence_id = 0;
  getRecipeList = () => {
    RecipeActions.getAll()
    .then( (results) => {
      console.log( "recipe list loaded:", results);
      const recipes = results.map( (recipe) => {
        return {...recipe, show: false};
      });
      this.setState( {recipe_list: recipes});
    });
  };
  componentWillMount = () => {
    this.getRecipeList();
  };
  updateRecipe = ( recipe) => {
    const test_id = `${recipe.id}`;
    // if id starts with new_recipe let indexedDB set the id
    if( test_id.indexOf( "new_recipe") === 0){
      recipe.id = 0;
    }
    RecipeActions.updateRecipe( recipe)
    .then( (result) => {
      console.log( "update recipe:", result);
      // find the recipe and update it
      const nl = this.state.recipe_list.map( (r) => {
        if( r.id === test_id){
          return {...r, id: r.id};
        }
        return r;
      });
      this.setState( {recipe_list: nl});
    });
  };
  newClick = (e) => {
    const selectedRecipe = { id: "new_recipe"+this.sequence_id++, created: new Date(),
      name:"", ingredients: [], instructions: [], show: true};
    this.setState( {recipe_list: [...this.state.recipe_list, selectedRecipe]});
  };
  handleNameChange = ( id, new_name) => {
    const nl = this.state.recipe_list.map( ( recipe) => {
      if( recipe.id === id){
        return {...recipe, name: new_name};
      }
      return recipe;
    });
    this.setState( { recipe_list: nl});
  };
  listClicked = ( item_id) => {
    const nl = this.state.recipe_list.map( (recipe) => {
      if( recipe.id === item_id){
        return {...recipe, show:!recipe.show};
      }
      return recipe;
    });
    this.setState( {recipe_list: nl});
  };
  deleteClicked = (item_id) => {
    const newlist = this.state.recipe_list.filter( (recipe) => {
      return recipe.id !== item_id;
    });
    this.setState( { recipe_list: newlist});
    const sel = this.state.recipe_list.filter( (recipe) => {
      return recipe.id === item_id;
    });
    console.log( "delete recipe:", sel[0]);
    RecipeActions.deleteRecipe( sel[0].id)
    .then( (res) => {
      console.log( "recipe deleted response:", res);
    });
  };
  render = () => {
    const recipe_style = {
      width: "400px",
      padding: "10px",
      backgroundColor: "cornflowerblue",
      borderRadius: "10px"
    };
    const leftit = {
      paddingLeft: "0"
    };
    const recipe_list = this.state.recipe_list.map( ( recipe, ndx) => {
      if( recipe.show){
        return (
          <div key={ndx} style={recipe_style}>
            <ListItem itemClicked={this.listClicked}
              item_id={recipe.id} item_text={recipe.name} deleteClicked={this.deleteClicked} />
            <Recipe recipe={recipe} nameChanged={this.handleNameChange}
              updateRecipe={this.updateRecipe} />
          </div>
        );
      }
      return (
        <div key={ndx} style={recipe_style}>
          <ListItem itemClicked={this.listClicked}
            item_id={recipe.id} item_text={recipe.name} deleteClicked={this.deleteClicked} />
        </div>
      );
    });
    return (
      <div>
        <div>
          <button type="button" onClick={this.newClick}>New</button>
        </div>
        <div>
          <ul style={leftit}>
            {recipe_list}
          </ul>
        </div>
      </div>
    );
  };
}
