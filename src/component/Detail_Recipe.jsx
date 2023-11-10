// Details.js
import React, { useState } from "react";
import "../css/Detail_Recipe.css";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { RecipeData } from "../shared/ListOfRecipe";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToShoppingList } from "../redux/action";

function Details({ selectedItem }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const hanleDelte = (recipeData) => {
    const indexToDelete = RecipeData.findIndex(
      (recipe) => recipe.id === recipeData
    );

    if (indexToDelete !== -1) {
      RecipeData.splice(indexToDelete, 1); // Remove 1 item at the found index
      setShow(false);
      alert("Delete successfully, please click other recipe.");
    } else {
      console.log("Recipe not found");
    }
  };
  const handleAddToShoppingList = () => {
    selectedItem.ingredients.forEach((ingredient) => {
      dispatch(addToShoppingList(ingredient));
    });
    alert("Added to shopping list.");
  };
  return (
    <div className="container">
      {selectedItem ? (
        <div className="row">
          {/* Display other details here */}

          <div className="col-6 food-image" style={{ paddingLeft: "100px" }}>
            <img src={selectedItem.image} alt="" />
          </div>

          <div className="col-5 food-info" style={{ paddingRight: "100px" }}>
            <div
              className="food-name"
              style={{
                color: "#e3bf4f",
                fontFamily: "Noto Serif",
                fontSize: "2rem",
              }}
            >
              <h3>{selectedItem.name}</h3>
            </div>

            <div className="food-des info" style={{ color: "#a6a6a6" }}>
              <p>{selectedItem.description}</p>
            </div>
            <div className="food-igr">
              <p className="info" style={{ color: "#a6a6a6" }}>
                Ingredients:
              </p>
              {selectedItem.ingredients.map((ingredient) => (
                <ul className="info" style={{ marginLeft: "0", padding: "0" }}>
                  <li className="info" style={{ color: "#a6a6a6" }}>
                    {ingredient.name} -- {ingredient.quantity}
                    <div
                      style={{
                        backgroundColor: "#a6a6a6",
                        height: "1px",
                      }}
                    ></div>
                  </li>
                </ul>
              ))}
            </div>
            <br></br>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Mange Recipe
              </button>
              <ul
                className="dropdown-menu menu-item"
                style={{
                  backgroundColor: "#2f3035",
                  padding: "0px",
                  borderRadius: "10%",
                }}
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={handleAddToShoppingList}
                  >
                    To Shopping List
                  </a>
                </li>
                <li>
                  <Link
                    to={`/edit/${selectedItem.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <a className="dropdown-item" href="#">
                      Edit Recipe
                    </a>
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={handleShow}>
                    Delete Recipe
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete this item ?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => hanleDelte(selectedItem.id)}
              >
                Delete
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <p className="inform">
          Select an item from the sidebar to view details.
        </p>
      )}
    </div>
  );
}

export default Details;
