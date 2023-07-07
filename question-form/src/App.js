import "./App.css";
import QuestionForm from "./components/QuestionForm";

function App() {
  return (
    <div className="App">
      <QuestionForm />
      <hr />
      <QuestionForm isMultichoice />
    </div>
  );
}

export default App;
