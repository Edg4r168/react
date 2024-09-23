import "./styles.css";

export const Ball = ({ position }) => {
  return (
    <div
      className="ball"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    ></div>
  );
};
