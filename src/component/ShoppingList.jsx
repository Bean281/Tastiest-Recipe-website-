import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromShoppingList,
  updateShoppingList,
  addToList,
} from "../redux/action";
import { Container, Form } from "react-bootstrap";
import "../css/ShoppingList.css";

export default function ShoppingList() {
  const shoppingList = useSelector((state) => state.handleShoppingList.list);

  const [selectedName, setSelectedName] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [onClick, setOnClick] = useState(false);

  const dispatch = useDispatch();

  const handleItemClick = (item) => {
    if (onClick === true) {
      setOnClick(false);
      setSelectedName("");
      setSelectedQuantity("");
    } else {
      const nameIngredient = item.name;
      const quantityIngredient = item.qty;
      setSelectedName(nameIngredient);
      setSelectedQuantity(quantityIngredient);
      setOnClick(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ingredient_name") {
      setSelectedName(value);
    } else if (name === "ingredient_quantity") {
      setSelectedQuantity(value);
    }
  };

  const handleClear = () => {
    setSelectedQuantity("");
  };

  const handleUpdate = () => {
    dispatch(updateShoppingList(selectedName, selectedQuantity));
    setOnClick(false); // Reset the selection after updating
  };

  const handleDelete = (item) => {
    dispatch(deleteFromShoppingList(item.name));
    setOnClick(false);
  };

  const handleAdd = () => {
    dispatch(addToList(selectedName, selectedQuantity));
    setOnClick(false);
  };

  return (
    <div>
      <h2 className="header">Shopping List</h2>
      <br></br>
      <div
        className="table_show"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <ul>
          {shoppingList.map((item) => (
            <div className="ingredient_item">
              <li
                key={item.name}
                onClick={() => handleItemClick(item)}
                style={{ display: "flex", gap: "20px" }}
              >
                <Form.Group>
                  <Form.Control
                    value={item.name}
                    readOnly
                    style={{
                      marginBottom: "20px",
                      backgroundColor: "#151515",
                      borderColor: "#151515",
                      color: "#e3bf4f",
                      borderBottom: "2px solid #e3bf4f",
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    value={item.qty}
                    readOnly
                    style={{
                      width: "50px",
                      backgroundColor: "#151515",
                      borderColor: "#151515",
                      color: "#e3bf4f",
                      borderBottom: "2px solid #e3bf4f",
                    }}
                  />
                </Form.Group>
              </li>
            </div>
          ))}
        </ul>
        <div>
          {/* <p style={{ color: "white" }}>Name: {selectedName}</p> */}
          <Container style={{ border: "2px dashed #e3bf4f", padding: "30px" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              <Form.Group>
                <Form.Label></Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="ingredient_name"
                  value={selectedName}
                  onChange={handleChange}
                  style={{
                    marginBottom: "20px",
                    backgroundColor: "#151515",
                    borderColor: "#151515",
                    color: "#e3bf4f",
                    borderBottom: "2px solid #e3bf4f",
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label></Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="ingredient_quantity"
                  value={selectedQuantity}
                  onChange={handleChange}
                  style={{
                    width: "50px",
                    backgroundColor: "#151515",
                    borderColor: "#151515",
                    color: "#e3bf4f",
                    borderBottom: "2px solid #e3bf4f",
                  }}
                />
              </Form.Group>
            </div>
            {onClick ? (
              <div className="button_3_group">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="button_3"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      shoppingList.find((item) => item.name === selectedName)
                    )
                  }
                  className="button_3"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="button_3"
                >
                  Clear
                </button>
              </div>
            ) : (
              <div className="button_2_group">
                <button type="button" onClick={handleAdd} className="button_2">
                  Add
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="button_2"
                >
                  Clear
                </button>
              </div>
            )}
            ;
          </Container>
        </div>
      </div>
    </div>
  );
}
