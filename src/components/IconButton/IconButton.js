import React from "react";
import "./icon-button.css";
import { Icon } from "@material-ui/core";

export const IconButton = ({ iconName, src, alt }) => {
  return (
    <div className="Icon-Button">
      {iconName && <Icon className="Icon">{iconName}</Icon>}
      {src && <img className="Image" src={src} alt={alt} />}
    </div>
  );
};
