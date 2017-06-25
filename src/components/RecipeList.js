import React from 'react';
import Recipe from './Recipe';
import ListItem from './ListItem';
import RecipeActions from './RecipeActions';

export default class RecipeList extends React.Component {
  state = {
    recipe_list: []
  };
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
  handleRecipeUpdateComplete = ( e) => {
    console.log( "event:", e);
    this.getRecipeList();
  };
  newClick = (e) => {
    const selectedRecipe = { created: new Date(), name:"", ingredients: [],
      instructions: [], show: true};
    this.setState( {recipe_list: [...this.state.recipe_list, selectedRecipe]});
  };
  handleNameChange = ( new_name) => {
    const nl = this.state.recipe_list.map( ( recipe) => {
      if( recipe.name === new_name){
        return {...recipe, name: new_name};
      }
      return recipe;
    });
    this.setState( { recipe_list: nl});
  };
  listClicked = ( item_id) => {
    const nl = this.state.recipe_list.map( (recipe) => {
      if( recipe.name === item_id){
        return {...recipe, show:!recipe.show};
      }
      return recipe;
    });
    this.setState( {recipe_list: nl});
  };
  deleteClicked = (item_id) => {
    const newlist = this.state.recipe_list.filter( (recipe) => {
      return recipe.name !== item_id;
    });
    this.setState( { recipe_list: newlist});
    const sel = this.state.recipe_list.filter( (recipe) => {
      return recipe.name === item_id;
    });
    console.log( "delete recipe:", sel[0]);
    RecipeActions.deleteRecipe( sel[0].id)
    .then( (res) => {
      console.log( "recipe deleted response:", res);
      this.getRecipeList();
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
              item_id={recipe.name} item_text={recipe.name} deleteClicked={this.deleteClicked} />
            <Recipe recipe={recipe} nameChanged={this.handleNameChange} />
          </div>
        );
      }
      return (
        <div key={ndx} style={recipe_style}>
          <ListItem itemClicked={this.listClicked}
            item_id={recipe.name} item_text={recipe.name} deleteClicked={this.deleteClicked} />
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
