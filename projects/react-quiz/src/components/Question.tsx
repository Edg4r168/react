import { type Question as QuestionType } from "../types/types";
import SyntaxHighLighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuestionsStore } from "../store/questions";

const getBackgroundColor = (info: QuestionType, answerIndex: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  // usuario no ha seleccionado nada todavía
  if (userSelectedAnswer == null) return "transparent";
  // si ya selecciono pero la solución es incorrecta
  if (answerIndex !== correctAnswer && answerIndex !== userSelectedAnswer)
    return "transparent";
  // si esta es la solución correcta
  if (answerIndex === correctAnswer) return "green";
  // si esta es la selección del usuario pero no es correcta
  if (answerIndex === userSelectedAnswer) return "red";

  // si no es ninguna de las anteriores
  return "transparent";
};

export const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswear = useQuestionsStore((state) => state.selectAnswear);

  const handleClick = (answerIndex: number) => () => {
    selectAnswear(info.id, answerIndex);
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: "#222", p: 2 }}>
      <Typography variant="h5">{info.question}</Typography>

      <Card variant="outlined" sx={{ textAlign: "left", marginTop: "20px" }}>
        <SyntaxHighLighter language="javascript" style={atomOneDark}>
          {info.code}
        </SyntaxHighLighter>
      </Card>

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={handleClick(index)}
              sx={{ bgcolor: getBackgroundColor(info, index) }}
              disabled={info.userSelectedAnswer != null}
            >
              <ListItemText sx={{ textAlign: "center" }}>{answer}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
