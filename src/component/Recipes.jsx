import React from "react";
import "../css/Recipes.css";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar_Recipe";
import Details from "./Detail_Recipe";
import { RecipeData } from "../shared/ListOfRecipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Recipes() {
  const [selectedItem, setSelectedItem] = useState(null);

  console.log(RecipeData);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="recipe">
      <div
        className="recipe-title"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffff",
          fontFamily: "'Handlee', cursive",
        }}
      >
        <h2>Easy, tasty & luxury</h2>
        <div
          className="create-new-btn"
          style={{ position: "absolute", right: "250px" }}
        >
          <Link to={"/add new"}>
            <FontAwesomeIcon style={{ color: "#e3bf4f" }} icon={faPlus} />
          </Link>
        </div>
      </div>

      <Container>
        <div className="section">
          <br></br>
        </div>
        <Details selectedItem={selectedItem} />
        <br></br>
        <br></br>
        <Sidebar items={RecipeData} onItemClick={handleItemClick} />
      </Container>
    </div>
  );
}
