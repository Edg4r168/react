import { useEffect, useState } from "react";
import "./App.css";
import { Ball } from "./components/Ball";

function App() {
  const [enable, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
    };

    if (enable) window.addEventListener("pointermove", handleMove);

    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar
    //    el efecto de nuevo
    return () => {
      window.removeEventListener("pointermove", handleMove);
      setPosition({ x: 0, y: 0 });
    };
  }, [enable]);

  useEffect(() => {
    document.body.classList.toggle("no-cursor", enable);

    return () => {
      document.body.classList.remove("no-cursor");
    };
  }, [enable]);

  return (
    <>
      <Ball position={position} />
      <h1>Proyecto 3</h1>
      <button onClick={() => setEnabled(!enable)}>
        {enable ? "Desactivar" : "Activar"}
      </button>
    </>
  );
}

export default App;
