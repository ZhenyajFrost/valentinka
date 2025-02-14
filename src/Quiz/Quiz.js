import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [hearts, setHearts] = useState(Array(5).fill("🤍")); // 5 білих сердечок

  const navigate = useNavigate();

  const questions = [
    {
      question: "Наш перший поцілунок (відносно початку стосунків)",
      options: ["Через день", "За тиждень", "Через місяць", "За 3 дні"],
      correctAnswer: "Через місяць",
      type: "multiple",
    },
    {
      question: "Наша перша поїздка",
      options: ["Мукачево", "Прага", "Хуст", "Великий"],
      correctAnswer: "Мукачево",
      type: "multiple",
    },
    {
      question: "Моє справжнє ім'я",
      options: ["Євген", "Ліза", "Женя", "Котик"],
      correctAnswer: "Котик",
      type: "multiple",
    },
    {
      question: "Куди ми ходили перед стосунками)",
      options: ["На каву", "На чаювання", "В тису", "В походи"],
      correctAnswer: "На чаювання",
      type: "multiple",
    },
    {
      question: "Скільки днів ми разом",
      correctAnswer: "701",
      type: "input",
    },
  ];

  const isAnswerCorrect = (questionIndex, value) => {
    return value === questions[questionIndex].correctAnswer;
  };

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({ ...answers, [questionIndex]: value });

    setHearts((prevHearts) => {
      const newHearts = [...prevHearts];
      newHearts[questionIndex] = isAnswerCorrect(questionIndex, value) ? "❤️" : "💔";
      return newHearts;
    });

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateScore();
      }
    }, 500);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Запобігає відправці форми
      handleAnswerChange(currentQuestionIndex, answers[currentQuestionIndex] || "");
    }
  };

  const calculateScore = () => {
    setShowResult(true);
    setTimeout(() => {
      navigate("/enverlope");
    }, 2000);
  };

  return (
    <div className="quiz-container">
      <div className="hearts-container">
        {hearts.map((heart, index) => (
          <span key={index} className="heartt">{heart}</span>
        ))}
      </div>

      <form onSubmit={(e) => e.preventDefault()}> {/* Запобігає оновленню сторінки */}
        <div className="question">
          <p>{questions[currentQuestionIndex].question}</p>
          {questions[currentQuestionIndex].type === "multiple" ? (
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type="radio"
                    name={`question${currentQuestionIndex}`}
                    value={option}
                    onChange={() => handleAnswerChange(currentQuestionIndex, option)}
                    checked={answers[currentQuestionIndex] === option}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <div className="input-answer">
              <input
                type="text"
                value={answers[currentQuestionIndex] || ""}
                onChange={(e) => setAnswers({ ...answers, [currentQuestionIndex]: e.target.value })}
                placeholder="Введіть відповідь"
                onKeyDown={handleInputKeyDown}
              />
            </div>
          )}
        </div>
      </form>

      {showResult && (
        <div className="result">
          <h2 className="result-text">Заслуговуєш на подарунок!</h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;
