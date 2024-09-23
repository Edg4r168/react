import "./App.css";
import { useCatFact } from "./hooks/useCatFact";
import { useCatImage } from "./hooks/useCatImage";

export function App() {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  const handleClick = () => {
    refreshFact();
  };

  return (
    <>
      <main>
        <h1>App de gatos</h1>

        <button onClick={handleClick}>Get new fact</button>

        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Imagen extraida de usando las primeras tres palabras de ${fact}`}
          />
        )}
      </main>
    </>
  );
}
