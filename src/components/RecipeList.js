import React from 'react';
import Recipe from './Recipe';
import ListItem from './ListItem';
import RecipeActions from './RecipeActions';

export default class RecipeList extends React.Component {
  state = {
    recipe_list: [],
    recipe_changed: false
  };
  selectedRecipe = null;
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
    window.addEventListener( "recipe_update_complete", this.handleRecipeUpdateComplete);
  };
  componentWillUnmount = () => {
    window.removeEventListener( "recipe_update_complete", this.handleRecipeUpdateComplete);
  };
  handleRecipeUpdateComplete = ( e) => {
    console.log( "event:", e);
    this.getRecipeList();
  };
  newClick = (e) => {
    this.selectedRecipe = { created: new Date(), name:"", ingredients: [],
      instructions: [], show: true};
    this.setState( {recipe_list: [...this.state.recipe_list, this.selectedRecipe]});
  };
  handleNameChange = ( new_name) => {
    this.selectedRecipe.name = new_name;
    this.setState( { recipe_changed: !this.state.recipe_changed});
  };
  listClicked = ( item_id) => {
    this.selectedRecipe = this.state.recipe_list.find( ( recipe) => {
      return recipe.name === item_id;
    });
    // TODO: expand selected recipe
    this.selectedRecipe.show = !this.selectedRecipe.show;
    this.setState( {recipe_changed: !this.state.recipe_changed});
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
