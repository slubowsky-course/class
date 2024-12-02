import './Recipe.css';
import React from 'react';
import ListComponent from './ListComponent';
import { Component } from 'react';

export default class Recipe extends Component {
  state = {
    pictureShowing: true
  };

  togglePicture = () => {
    this.setState({
      pictureShowing: !this.state.pictureShowing
    });
  }

  render() {
    const { name, ingredients, directions, picture } = this.props.recipe;

    const { pictureShowing } = this.state;

    return (
      <>
        <h2>{name}</h2>
        {pictureShowing ? <img src={picture} /> : null}
        <br />
        <button onClick={this.togglePicture}>{pictureShowing ? 'hide picture' : 'show picture'}</button>
        <ListComponent name="ingredients" list={ingredients} />
        <ListComponent name="directions" list={directions} />
      </>
    );
  }
}
