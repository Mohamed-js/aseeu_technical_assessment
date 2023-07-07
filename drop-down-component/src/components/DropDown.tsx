import React, { useState } from "react";

interface DropDownOptionProps {
  label: string;
  value: string;
}

interface DropDownProps {
  label?: string;
  defaultValue?: string;
  options: DropDownOptionProps[];
  inputName: string;
  onSelection: (option: DropDownOptionProps) => void;
  className?: string;
}

const DropDown: React.FC<DropDownProps> = ({
  label,
  defaultValue,
  options,
  inputName,
  onSelection,
  className,
}) => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [selectedOption, setSelectedValue] = useState<
    DropDownOptionProps | undefined
  >();

  const handleOptionSelection = (option: DropDownOptionProps) => {
    setSelectedValue(option);
    onSelection(option);
    setMenuIsOpened(false);
  };

  return (
    <div className={`dropdown ${className ? className : ""}`}>
      <button
        className="dropdown-button"
        onClick={() => setMenuIsOpened(!menuIsOpened)}
      >
        {label ? label : "Select"}
      </button>
      {menuIsOpened && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.value}
              className={`dropdown-option ${
                selectedOption && selectedOption.value === option.value
                  ? "active"
                  : ""
              }`}
              onClick={() => handleOptionSelection(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      <input
        type="hidden"
        name={inputName}
        value={
          selectedOption && selectedOption.value
            ? selectedOption.value
            : defaultValue
        }
      />
    </div>
  );
};

export default DropDown;
