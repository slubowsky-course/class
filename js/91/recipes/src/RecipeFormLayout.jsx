import React from 'react'
import { Outlet } from 'react-router'

export default function RecipeFormLayout() {
  return (
    <div>
      Please enter ingredients and directions as a comma delimited list
      <Outlet />
    </div>
  )
}
