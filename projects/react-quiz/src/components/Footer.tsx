import { useQuestionsData } from "../hooks/useQuestionsData";
import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/questions";

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: "20px" }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div style={{ marginTop: "16px" }}>
        <Button onClick={reset}>Reiniciar</Button>
      </div>
    </footer>
  );
};
