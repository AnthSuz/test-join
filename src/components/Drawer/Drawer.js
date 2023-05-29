import React, { useState } from "react";
import "./drawer.css";
import { Close } from "@material-ui/icons";

export const Drawer = ({ title, content, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="Drawer">
      {open && (
        <div className="test">
          <div className="Header-Drawer">
            <p>{title}</p>
            <Close className="Close-Drawer" onClick={() => setOpen(false)} />
          </div>
          <div>{content}</div>
        </div>
      )}
      <div onClick={() => setOpen(!open)}>{children}</div>
    </div>
  );
};
