import { create } from "zustand";
import { Question } from "../types/types";
import { persist } from "zustand/middleware";
import confetti from "canvas-confetti";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswear: (questionId: number, answearIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: 0,

      fetchQuestions: async (limit) => {
        const res = await fetch("/data.json");
        const json = await res.json();

        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);

        set({
          questions,
        });
      },

      selectAnswear: (questionId, answearIndex) => {
        const { questions } = get();

        const newQuestions = structuredClone(questions);
        const questionInfo = newQuestions.find(
          (question) => question.id === questionId
        );

        if (!questionInfo) return;

        const isCorrectAnswer = questionInfo.correctAnswer === answearIndex;

        questionInfo.isCorrecUserAnswer = isCorrectAnswer;
        questionInfo.userSelectedAnswer = answearIndex;

        set({ questions: newQuestions });

        if (isCorrectAnswer) {
          confetti();
        }
      },

      goNextQuestion: () => {
        const { questions, currentQuestion } = get();

        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
          set({ currentQuestion: nextQuestion });
        }
      },

      goPreviousQuestion: () => {
        const { currentQuestion } = get();

        const previousQuestion = currentQuestion - 1;

        if (previousQuestion >= 0) {
          set({ currentQuestion: previousQuestion });
        }
      },
      reset: () => {
        set({ questions: [], currentQuestion: 0 });
      },
    }),
    {
      name: "questions",
    }
  )
);
