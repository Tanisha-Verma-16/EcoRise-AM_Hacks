import React, { useState, useEffect, useCallback } from "react";
import { Award, Timer, Check, X } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface Answer {
  question: number;
  selected: number;
  correct: number;
  isCorrect: boolean;
}

interface ClimateQuizProps {
  onCoinEarned: (coins: number) => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the greenhouse effect?",
    options: [
      "Plants growing in a greenhouse",
      "Gases trapping heat in Earth's atmosphere",
      "The effect of solar panels on plants",
      "Temperature changes in glass buildings",
    ],
    correct: 1,
  },
  {
    id: 2,
    question: "Which gas contributes most to the greenhouse effect?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correct: 2,
  },
  {
    id: 3,
    question: "What is the primary cause of ocean acidification?",
    options: ["Plastic pollution", "Oil spills", "Carbon dioxide absorption", "Marine wildlife"],
    correct: 2,
  },
  {
    id: 4,
    question: "Which renewable energy source currently provides the most power globally?",
    options: ["Solar power", "Hydroelectric power", "Wind power", "Geothermal power"],
    correct: 1,
  },
  {
    id: 5,
    question: "What is carbon sequestration?",
    options: ["Burning fossil fuels", "Capturing and storing carbon dioxide", "Measuring carbon footprint", "Trading carbon credits"],
    correct: 1,
  },
];

const ClimateQuiz: React.FC<ClimateQuizProps> = ({ onCoinEarned }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);

  const handleAnswer = useCallback((answerIndex: number): void => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct;

    setAnswers((prev) => [
      ...prev,
      { question: currentQuestion, selected: answerIndex, correct: questions[currentQuestion].correct, isCorrect },
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(15);
      } else {
        setShowResults(true);
        const percentage = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
        if (percentage >= 70) {
          onCoinEarned(100);
        }
      }
    }, 1000);
  }, [currentQuestion, selectedAnswer, score, onCoinEarned]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isQuizStarted && !showResults && selectedAnswer === null) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswer(-1);
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizStarted, showResults, selectedAnswer, handleAnswer]);

  const restartQuiz = (): void => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setTimeLeft(15);
    setAnswers([]);
    setIsQuizStarted(true);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return !isQuizStarted ? (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">Climate Challenge Quiz</h2>
      <p className="text-gray-700 mb-8 text-center">
        Test your knowledge about climate change. You have 15 seconds per question. Score 70% or higher to earn coins!
      </p>
      <button onClick={() => setIsQuizStarted(true)} className="w-full py-4 bg-green-600 text-white rounded-lg font-bold">
        Start Quiz
      </button>
    </div>
  ) : showResults ? (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <Award className="w-16 h-16 mx-auto text-green-600 mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-green-800">Quiz Complete!</h2>
        <p className="text-4xl font-bold text-green-600 mb-2">
          {score} / {questions.length}
        </p>
      </div>
      <button onClick={restartQuiz} className="w-full py-3 bg-green-600 text-white rounded-lg font-bold">
        Try Again
      </button>
    </div>
  ) : (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg">
      <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
        <div className="h-full bg-green-600 rounded-full" style={{ width: `${progressPercentage}%` }} />
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-700">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-2">
          <Timer className="text-green-600" />
          <span className="font-bold text-gray-700">{timeLeft}s</span>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6 text-gray-800">{questions[currentQuestion].question}</h2>

      <div className="space-y-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(index)} className="w-full p-4 text-left rounded-lg border border-gray-200">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClimateQuiz;
