// Sidebar.js
import React, { useState } from "react";
import "../css/Sidebar_Recipe.css";

function Sidebar({ items, onItemClick }) {
  const [clickedItems, setClickedItems] = useState(
    new Array(items.length).fill(false)
  );
  const handleItemClick = (index) => {
    // Added
    const updatedClickedItems = clickedItems.map((item, i) =>
      i === index ? !item : false
    );
    setClickedItems(updatedClickedItems);
  };

  return (
    <div className="sidebar">
      <ul className="item_list">
        {items.map((item, index) => (
          <div
            className={`all ${clickedItems[index] ? "clicked" : ""}`}
            key={item.id}
            onClick={() => handleItemClick(index)}
          >
            <div className="review_box">
              <div
                className="review_card"
                key={item.id}
                onClick={() => onItemClick(item)}
              >
                <div className="food_info">
                  <img src={item.image} alt="" />
                </div>

                <div
                  className={`food_text ${
                    clickedItems[index] ? "clicked-text" : ""
                  }`}
                >
                  <h4 className="name">{item.name}</h4>
                  <div className="description">{item.admire}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
