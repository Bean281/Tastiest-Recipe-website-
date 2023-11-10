import React, { useState } from "react";
import "../css/CreateRecipeForm.css";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RecipeData } from "../shared/ListOfRecipe";

export default function CreateRecipeForm() {
  const [ingredients, setIngredients] = useState([]);

  const schema = yup
    .object({
      name: yup.string().required("Name is required"),
      description: yup.string().required("Description is required"),
      img: yup
        .string()
        .url("Enter a valid URL")
        .matches(
          /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/i,
          "Enter a valid image URL"
        )
        .required("Image URL is required"),
      ingredients: yup.array().of(
        yup.object().shape({
          name: yup.string().required("Ingredient name is required"),
          quantity: yup.string().required("Quantity is required"),
        })
      ),
    })
    .required();

  const addIngredientField = () => {
    const currentIngredients = getValues("ingredients");
    const newIngredients = [...currentIngredients, { name: "", quantity: "" }];
    setValue("ingredients", newIngredients);
    setIngredients(newIngredients); // Update the ingredients state
  };

  const removeIngredientField = (index) => {
    const currentIngredients = getValues("ingredients");
    const newIngredients = [...currentIngredients];
    newIngredients.splice(index, 1);
    setValue("ingredients", newIngredients);
    setIngredients(newIngredients); // Update the ingredients state
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const newRecipe = {
      id: RecipeData.length + 1,
      name: data.name,
      description: data.description,
      image: data.img,
      ingredients: ingredients,
      admire: "",
    };
    RecipeData.push(newRecipe);
  };

  return (
    <>
      <h2 style={{ color: "#ffff" }}>Create New Recipe</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <p className="error_message">{errors.name?.message}</p>

        <input {...register("description")} />
        <p className="error_message">{errors.description?.message}</p>

        <div>
          <label htmlFor="img">Image URL</label>
          <Controller
            name="img"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <input {...field} type="text" placeholder="Enter Image URL" />
                {errors.img && <p>{errors.img.message}</p>}
                {field.value && !errors.imageUrl && (
                  <img src={field.value} alt="Rendered Image" />
                )}
              </div>
            )}
          />
        </div>
        <h2>Ingredients</h2>
        {getValues("ingredients").map((ingredient, index) => (
          <div key={index} className="ingredient">
            <Controller
              name={`ingredients[${index}].name`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Ingredient Name"
                  className="name"
                />
              )}
            />
            <Controller
              name={`ingredients[${index}].quantity`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Quantity"
                  className="quantity"
                />
              )}
            />
            <button
              type="button"
              onClick={() => removeIngredientField(index)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredientField}
          className="add-button"
        >
          Add Ingredient
        </button>
        <button>Submit</button>
      </form>
    </>
  );
}
