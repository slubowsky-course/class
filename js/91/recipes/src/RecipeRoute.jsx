import React from 'react'
import { Outlet, useParams } from 'react-router'

export default function RecipeRoute(props) {
  const { id } = useParams();
  const recipe = props.recipes.find(r => r.id === +id);

  return (
    <Outlet context={recipe} />
  )
}
