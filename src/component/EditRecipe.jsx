import React, { useState } from "react";
import { RecipeData } from "../shared/ListOfRecipe";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../css/EditRecipe.css";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function EditRecipe() {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required") // Validation message if the field is empty
      .max(50, "Name must be at most 50 characters"),
    description: Yup.string()
      .required("Description is required")
      .max(100, "Description must be at most 100 characters"),
    img: Yup.string()
      .url("Enter a valid URL")
      .matches(
        /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/i,
        "Enter a valid image URL"
      )
      .required("Image URL is required"),
    note: Yup.string()
      .required("Note is required")
      .max(50, "Note must be at most 50 characters"),
  });

  const recipe = useParams();
  const food = RecipeData.find((obj) => {
    return obj.id == recipe.id;
  });

  const [nameFood, setNameFood] = useState(food.name);
  const [urlFood, setUrlFood] = useState(food.image);
  const [descriptionFood, setDescriptionFood] = useState(food.description);
  const [noteFood, setNoteFood] = useState(food.admire);
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [errors, setErrors] = useState({});

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: "", quantity: 1 }]);
  };

  // const handleInputChange = (event, ingredientIndex) => {
  //   const { name, value } = event.target;
  //   const updatedIngredients = [...editedData.ingredients];
  //   updatedIngredients[ingredientIndex][name] = value;
  //   setEditedData({ ...editedData, ingredients: updatedIngredients });
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "food_name") {
      setNameFood(value);
    } else if (name === "food_des") {
      setDescriptionFood(value);
    } else if (name === "food_img") {
      setUrlFood(value);
    } else if (name === "food_note") {
      setNoteFood(value);
    }
  };
  const removeIngredientField = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][name] = value;
    setIngredients(updatedIngredients);
  };

  const handleSubmit = () => {
    validationSchema
      .validate(
        {
          name: nameFood,
          description: descriptionFood,
          img: urlFood,
          note: noteFood,
        },
        { abortEarly: false }
      )
      .then(() => {
        const recipeIndex = RecipeData.findIndex(
          (recipe) => recipe.id === food.id
        );

        if (recipeIndex !== -1) {
          // Update the values for the recipe at the found index
          RecipeData[recipeIndex].name = nameFood;
          RecipeData[recipeIndex].description = descriptionFood;
          RecipeData[recipeIndex].image = urlFood;
          RecipeData[recipeIndex].admire = noteFood;
          RecipeData[recipeIndex].ingredients = ingredients;
        }
      })
      .catch((validationError) => {
        const errorObject = {};
        validationError.inner.forEach((error) => {
          errorObject[error.path] = error.message;
        });
        setErrors(errorObject);
      });
  };

  return (
    <>
      <h2 className="header">Editing Recipe</h2>
      <Container>
        <div className="edit">
          <img src={urlFood} alt="" />
          <div className="edit_info">
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                required
                type="text"
                name="food_name"
                value={nameFood}
                onChange={handleChange}
                isInvalid={!!errors.name}
                style={{
                  backgroundColor: "#151515",
                  borderColor: "#151515",
                  color: "#e3bf4f",
                  "::placeholder": { color: "#e3bf4f" },
                  borderBottom: "2px solid #e3bf4f",
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                required
                type="text"
                name="food_des"
                value={descriptionFood} //
                onChange={handleChange}
                isInvalid={!!errors.description}
                style={{
                  backgroundColor: "#151515",
                  borderColor: "#151515",
                  color: "#e3bf4f",
                  "::placeholder": { color: "#e3bf4f" },
                  borderBottom: "2px solid #e3bf4f",
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                required
                type="text"
                name="food_img"
                value={urlFood} //
                onChange={handleChange}
                isInvalid={!!errors.img}
                style={{
                  backgroundColor: "#151515",
                  borderColor: "#151515",
                  color: "#e3bf4f",
                  "::placeholder": { color: "#e3bf4f" },
                  borderBottom: "2px solid #e3bf4f",
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.img}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                required
                type="text"
                name="food_note"
                value={noteFood} //
                onChange={handleChange}
                isInvalid={!!errors.note}
                style={{
                  backgroundColor: "#151515",
                  borderColor: "#151515",
                  color: "#e3bf4f",
                  "::placeholder": { color: "#e3bf4f" },
                  borderBottom: "2px solid #e3bf4f",
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.note}
              </Form.Control.Feedback>
            </Form.Group>
            <br></br>
            {ingredients.map((ingredient, index) => (
              <div key={index} style={{ display: "flex", gap: "20px" }}>
                <>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="name"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, e)}
                      placeholder="Ingredient Name"
                      style={{
                        backgroundColor: "#151515",
                        borderColor: "#151515",
                        color: "#e3bf4f",
                        "::placeholder": { color: "#e3bf4f" },
                        marginBottom: "20px",
                        borderBottom: "2px solid #e3bf4f",
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="quantity"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, e)}
                      placeholder="Quantity"
                      style={{
                        backgroundColor: "#151515",
                        borderColor: "#151515",
                        color: "#e3bf4f",
                        "::placeholder": { color: "#e3bf4f" },
                        borderBottom: "2px solid #e3bf4f",
                      }}
                    />
                  </Form.Group>
                  <button
                    type="button"
                    onClick={() => removeIngredientField(index)}
                    className="button_remove"
                  >
                    <FontAwesomeIcon
                      style={{ color: "#e3bf4f" }}
                      icon={faXmark}
                    ></FontAwesomeIcon>
                  </button>
                </>
              </div>
            ))}
            <button
              className="button_add"
              type="button"
              onClick={addIngredientField}
            >
              Add Ingredient
            </button>
          </div>
        </div>
        <br></br>
        <div
          className="button_end"
          style={{ display: "flex", justifyContent: "center", gap: "10px" }}
        >
          <button
            className="button_complete"
            type="button"
            onClick={handleSubmit}
          >
            Save
          </button>
          <Link to="/recipes">
            <button className="button_complete" type="button">
              Cancle
            </button>
          </Link>
        </div>
      </Container>
    </>
  );
}
