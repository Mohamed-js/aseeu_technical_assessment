import { useRef, useState } from "react";

const QuestionForm = ({ isMultichoice = false }) => {
  const answerInputRef = useRef();
  const [answers, setAnswers] = useState([]);
  const [singleAnswer, setSingleAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [rightAnswers, setRightAnswers] = useState([]);

  //    Handles form Submition
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || answers.length < 2 || rightAnswers.length < 1) {
      return alert(
        "You must have at least a question with two answers with at least one correct answer."
      );
    }
    const data = {
      question,
      answers,
      rightAnswers,
      isMultichoice,
    };
    alert(Object.entries(data).map((pair) => pair[0] + ": " + pair[1] + "\n"));
  };

  //   Stores the question
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  //   Stores a single question
  const handleAnswerChange = (e) => {
    setSingleAnswer(e.target.value);
  };

  //   Add the single question to the questions list
  const handleAddOption = () => {
    if (singleAnswer) {
      setAnswers((prev) => [...prev, singleAnswer]);
      setSingleAnswer("");
      answerInputRef.current.value = "";
      return;
    }
    alert("You can't enter an empty option.");
  };

  //   Handle selecting the right answer(s)
  const handleAnswerSelect = (e) => {
    const isChecked = e.target.checked;
    if (isMultichoice) {
      if (isChecked) {
        setRightAnswers((prev) => [...prev, Number(e.target.value)]);
      } else {
        setRightAnswers((prev) =>
          prev.filter((n) => Number(n) !== Number(e.target.value))
        );
      }
      return;
    }
    setRightAnswers([e.target.value]);
  };

  return (
    <div className="question-form-container">
      <FormHeader isMultichoice={isMultichoice} />
      <form className="question-form" onSubmit={handleSubmit}>
        <QuestionInput handleQuestionChange={handleQuestionChange} />
        <AnswerInput
          handleAnswerChange={handleAnswerChange}
          answerInputRef={answerInputRef}
          handleAddOption={handleAddOption}
        />
        <Answers
          answers={answers}
          isMultichoice={isMultichoice}
          handleAnswerSelect={handleAnswerSelect}
        />
        <SubmitBtn />
      </form>
    </div>
  );
};

// ========================================
// ========== Child components ============
// ========================================

const FormHeader = ({ isMultichoice }) => {
  return <h1>{isMultichoice ? "Multichoice" : "Normal"} Question</h1>;
};

const QuestionInput = ({ handleQuestionChange }) => {
  return (
    <input
      type="text"
      name="title"
      onChange={handleQuestionChange}
      placeholder="Enter the question title..."
    />
  );
};

const AnswerInput = ({
  handleAnswerChange,
  answerInputRef,
  handleAddOption,
}) => {
  return (
    <div className="input-btn-group">
      <input
        type="text"
        name="title"
        placeholder="Enter an option..."
        onChange={handleAnswerChange}
        ref={answerInputRef}
      />
      <button type="button" className="btn" onClick={handleAddOption}>
        Add Option
      </button>
    </div>
  );
};

const Answers = ({ answers, isMultichoice, handleAnswerSelect }) => {
  return (
    <div className="answers">
      {answers.length > 0 && (
        <h2 className="answers-header">
          Check the right answer{isMultichoice && "s"}
        </h2>
      )}
      {answers.length > 0 &&
        answers.map((answer, i) => (
          <div className="checkbox-group">
            <input
              onChange={handleAnswerSelect}
              name="answer"
              value={i}
              type={isMultichoice ? "checkbox" : "radio"}
            />
            <label>{answer}</label>
          </div>
        ))}
    </div>
  );
};

const SubmitBtn = () => {
  return (
    <div className="submit-container">
      <input className="btn" type="submit" value="Submit" />
    </div>
  );
};

export default QuestionForm;
