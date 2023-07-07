import { useState } from "react";
import "./App.css";
import DropDown from "./components/DropDown";

const options = [
  { label: "opt1", value: "1" },
  { label: "opt2", value: "2" },
  { label: "opt3", value: "3" },
];

interface DropDownOptionProps {
  label: string;
  value: string;
}

function App() {
  const [selectedOption, setSelectedOption] = useState<DropDownOptionProps>();
  const handleSelection = (option: DropDownOptionProps) =>
    setSelectedOption(option);

  return (
    <div className="App">
      <h1>Hello, I'm a dropdown button. Just click me...</h1>
      <br />
      {selectedOption && (
        <SelectedOption
          label={selectedOption.label}
          value={selectedOption.value}
        />
      )}
      <DropDown
        label="Show Options"
        defaultValue={options[0]["value"]}
        options={options}
        inputName="option"
        onSelection={handleSelection}
        className="demo"
      />
    </div>
  );
}

const SelectedOption: React.FC<DropDownOptionProps> = ({ label, value }) => {
  return <p>{"You have selected: " + label + " ===> with value: " + value} </p>;
};

export default App;
