import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import "./header.css";

export const Header = () => {
  const [step, setStep] = useState("sub");
  return (
    <>
      <div className="Header">
        <h4>Chat du stream</h4>
      </div>
      <div className="Sub-Header">
        <ChevronLeft
          className="Chevron"
          onClick={() => setStep((prev) => (prev === "sub" ? "bits" : "sub"))}
        />
        {step === "sub" ? (
          <p>Offrez un abonnement pour être n°1 !</p>
        ) : (
          <p>Envoyez un cheers maintenant pour être le n°1 !</p>
        )}
        <ChevronRight
          className="Chevron"
          onClick={() => setStep((prev) => (prev === "sub" ? "bits" : "sub"))}
        />
      </div>
    </>
  );
};
