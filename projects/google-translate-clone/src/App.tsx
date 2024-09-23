import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslete } from "./hooks/useTranslete";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from "./constants";
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import { TextArea } from "./components/TextAria";
import { useEffect } from "react";
import { translate } from "./services/cloudflareWorkers";
import { useDebounce } from "./hooks/useDebouce";

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    setFromLanguage,
    setFromText,
    setResult,
    setToLanguage,
    interchangeLanguages,
  } = useTranslete();

  // const [isSpeaking, setIsSpeaking] = useState(false);

  const debouceFromText = useDebounce(fromText);

  useEffect(() => {
    if (debouceFromText === "") return;

    translate({ fromLanguage, toLanguage, text: debouceFromText })
      .then((result) => {
        if (result == null) return;

        setResult(result);
      })
      .catch(() => setResult("Error al traducir texto"));
  }, [debouceFromText, toLanguage, fromLanguage]);

  const handleClipboard = () => {
    window.navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    speechSynthesis.speak(utterance);
  };

  // const handleSpeak = () => {
  //   if (!isSpeaking) {
  //     console.log({ result });
  //     const utterance = new SpeechSynthesisUtterance(result);
  //     utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];

  //     utterance.onend = () => {
  //       setIsSpeaking(false);
  //     };

  //     speechSynthesis.speak(utterance);
  //     // setIsSpeaking(true);
  //   } else {
  //     if (speechSynthesis.speaking) {
  //       speechSynthesis.pause();
  //       setIsSpeaking(false);
  //     } else {
  //       speechSynthesis.resume();
  //       setIsSpeaking(true);
  //     }
  //   }
  // };

  return (
    <>
      <h1>Google Translate</h1>
      <Container fluid>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}
              />

              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              ></TextArea>
            </Stack>
          </Col>
          <Col xs="auto">
            <Button
              variant="Link"
              disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={() => {
                interchangeLanguages();
              }}
            >
              <ArrowsIcon />
            </Button>
          </Col>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
              />

              <TextArea
                type={SectionType.To}
                value={result}
                loading={loading}
                onChange={setResult}
              ></TextArea>
              <div style={{ display: "flex" }}>
                <Button variant="Link" onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button variant="Link" onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
