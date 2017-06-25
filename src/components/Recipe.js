import React from 'react';
import ListItem from './ListItem';

export default class Recipe extends React.Component {
  state = {
    id: 0,
    name : "",
    ingredient_entry: "",
    ingredients: [],
    instructions: ""
  };
  dirty = false;
  componentWillMount = () => {
    console.log( "Recipe mount:", this.props.recipe);
    const { id, name, created, ingredients, instructions} = this.props.recipe;
    // FIXME: I think we can remove the duplication - just use props.recipe?
    this.setState( {
      id: id,
      name: name,
      created: created,
      ingredients: ingredients,
      instructions: instructions
    });
  };
  updateRecipe = () => {
    if( this.dirty){
      this.props.updateRecipe( this.state);
    }
  };
  ingredientChange = (e) => {
    this.setState( { ingredient_entry: e.target.value});
  };
  addIngredient = () => {
    this.dirty = true;
    this.setState( {
      ingredients: [...this.state.ingredients, {text: this.state.ingredient_entry}],
      ingredient_entry: ""
    });
  };
  handleKeyUp = (e) => {
    switch( e.keyCode){
      case 13:
        this.addIngredient();
        break;
      default:
        break;
    }
  };
  listClicked = (e) => {};
  deleteClicked = ( item_id) => {
    this.dirty = true;
    console.log( "delete item:", item_id);
    const nl = this.state.ingredients.filter( item => item.text !== item_id)
    this.setState( { ingredients: nl});
  };
  recipeNameChange = ( e) => {
    this.dirty = true;
    this.setState( { name: e.target.value});
    this.props.nameChanged( this.state.id, e.target.value);
  };
  instructionChange = (e) => {
    this.dirty = true;
    this.setState( { instructions: e.target.value});
  };
  onSave = (e) => {
    this.updateRecipe();
  };
  render = () => {
    const ingredients = this.state.ingredients.map( ( ing, ndx) => {
      return (
        <ListItem key={ndx}  itemClicked={this.listClicked}
          item_id={ing.text} item_text={ing.text} deleteClicked={this.deleteClicked} />
      );
    });
    let scrolly_box = {
      maxHeight: "100px",
      marginBottom: "10px"
    };
    if( this.state.ingredients.length > 4){
      scrolly_box.overflowY = "scroll";
    }
    const name_style = {
      width: "90%",
      marginBottom: "5px"
    };
    const ta_style = { width: "380px", height: "10em", marginTop: "5px"};
    return (
      <div>
        <div>
          <h2>{this.props.item_text}</h2>
        </div>
        <div>
          Name
          <input type="text" style={name_style} value={this.state.name}
            placeholder="Recipe name ..."
            onChange={this.recipeNameChange} />
        </div>
        <div>
          Ingredients
          <div>
            <div>
              <input type="text" value={this.state.ingredient_entry}
                placeholder="Enter Ingredient..." onChange={this.ingredientChange}
                onKeyUp={this.handleKeyUp}/>
            </div>
            <div style={scrolly_box}>
              <ul>{ingredients}</ul>
            </div>
          </div>
        </div>
        <div>
          Instructions
          <textarea style={ta_style} rows={8} cols={30}
            onChange={this.instructionChange} value={this.state.instructions}>
          </textarea>
        </div>
        <div>
          <button onClick={this.onSave} >Save</button>
        </div>
      </div>
    );
  };
}
