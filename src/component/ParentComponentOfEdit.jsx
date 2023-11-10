import React from "react";
import EditRecipe from "./EditRecipe";
import { useParams } from "react-router-dom";
export default function ParentComponentOfEdit() {
  const { recipeId } = useParams();
  return <EditRecipe recipeId={recipeId} />;
}
