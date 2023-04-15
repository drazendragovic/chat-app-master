import React from "react";

import "./Colors.css";
import { COLORS } from "../../shared/config";

export default function Colors({ random, selectColor, colorSelected }) {
  return (
    <ul className={random ? "colors-list color-disabled" : "colors-list"}>
      {COLORS.colors.map((color, index) => {
        return (
          <li
            className={
              colorSelected === color ? "color color-selected" : "color"
            }
            style={{ backgroundColor: color }}
            onClick={selectColor}
            key={index}
            id={color}
          ></li>
        );
      })}
    </ul>
  );
}
