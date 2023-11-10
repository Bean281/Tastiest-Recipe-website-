import "../css/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../img/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <header>
      <div className="navbar-recipe">
        <div className="logo">Tastiest</div>
        <ul className="navbar-item">
          <Link className="item" to="">
            <li>Recipe Book</li>
          </Link>
          <Link className="item" to="/recipes">
            <li>Recipes</li>
          </Link>
          <Link className="item" to="/list">
            <li>Shopping List</li>
          </Link>
        </ul>
        <div className="toggle-btn">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
