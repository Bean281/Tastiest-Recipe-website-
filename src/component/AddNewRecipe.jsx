import React, { useState } from "react";
import * as Yup from "yup";
import "../css/AddNewRecipe.css";
import { RecipeData } from "../shared/ListOfRecipe";
import { Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

export default function AddNewRecipe() {
  const [nameFood, setNameFood] = useState("");
  const [urlFood, setUrlFood] = useState("");
  const [descriptionFood, setDescriptionFood] = useState("");
  const [noteFood, setNoteFood] = useState("");
  const [ingredients, setIngredients] = useState([
    { nameIngredient: "", quantity: 1 },
  ]);
  const [errors, setErrors] = useState({});

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: "".trim(), quantity: 1 }]);
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
        const newRecipe = {
          id: RecipeData.length + 1, // Generate a unique ID
          name: nameFood,
          image: urlFood,
          description: descriptionFood, // You can add a description input if needed
          ingredients: ingredients,
          admire: noteFood,
        };
        RecipeData.push(newRecipe);
        alert("Create new recipe successfully");
        setErrors({});
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
      <h2 className="header">Create new recipe</h2>
      <Container>
        <div className="create">
          <img src={urlFood} alt="" />
          <div className="form_info">
            <Form.Group>
              <Form.Label className="title"></Form.Label>
              <Form.Control
                required
                className="input_text"
                type="text"
                name="food_name"
                value={nameFood}
                onChange={handleChange}
                isInvalid={!!errors.name}
                placeholder="Name"
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
              <Form.Label className="title"></Form.Label>
              <Form.Control
                required
                className="input_text"
                type="text"
                name="food_des"
                value={descriptionFood} //
                onChange={handleChange}
                isInvalid={!!errors.description}
                placeholder="Description"
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
              <Form.Label className="title"></Form.Label>
              <Form.Control
                required
                className="input_text"
                type="text"
                name="food_img"
                value={urlFood} //
                onChange={handleChange}
                isInvalid={!!errors.img}
                placeholder="URL"
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
              <Form.Label className="title"></Form.Label>
              <Form.Control
                required
                className="input_text"
                type="text"
                name="food_note"
                value={noteFood} //
                onChange={handleChange}
                isInvalid={!!errors.note}
                placeholder="Note"
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
                <Form.Group>
                  <Form.Control
                    className="input_text"
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
                      borderBottom: "2px solid #e3bf4f",
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    className="input_text"
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
                      marginBottom: "20px",
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

                <br></br>
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
