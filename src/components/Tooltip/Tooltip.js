import "./tooltip.css";

export const Tooltip = ({ text, position, children }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">{text}</span>
    </div>
  );
};
