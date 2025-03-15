import React, { useState, useRef } from "react";

const SearchableDropdown = ({
  options = [],
  onChange,
  placeholder = "Search...",
  valueKey = "_id",
  labelKey = "name",
  extraParams = {},
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = options.filter(
    (option) =>
      option[labelKey]?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedOptions.some((item) => item[valueKey] === option[valueKey])
  );

  const handleOptionClick = (selectedOption) => {
    const updatedOptions = [...selectedOptions, selectedOption];
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions, extraParams); // Pass updated selection
    setSearchTerm(""); // Reset search term after selection
  };

  const handleRemoveOption = (removedOption) => {
    const updatedOptions = selectedOptions.filter(
      (item) => item[valueKey] !== removedOption[valueKey]
    );
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions, extraParams); // Pass updated selection
  };

  const handleBlur = (e) => {
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setShowDropdown(false);
    }
  };

  return (
   <>
      {/* Input and Selected Items */}
      <div className={`dropdown ${className} form-control d-flex align-items-center flex-wrap gap-2`} ref={dropdownRef}>
        {selectedOptions.map((option) => (
          <span
            key={option[valueKey]}
            className="badge bg-primary text-white d-flex align-items-center"
            style={{ padding: "0.4rem 0.6rem", cursor: "pointer" }}
          >
            {option[labelKey]}
            <button
              type="button"
              className="btn-close btn-close-white ms-2"
              style={{ fontSize: "0.8rem" }}
              onClick={() => handleRemoveOption(option)}
            ></button>
          </span>
        ))}
        <input
          type="text"
          className="border-0 flex-grow-1"
          style={{ outline: "none", minWidth: "150px" }}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowDropdown(true)} // Open dropdown on focus
          onBlur={handleBlur} // Close dropdown only when focus leaves the entire component
        />
      </div>

      {/* Dropdown menu */}
      {showDropdown && filteredOptions.length > 0 && (
        <ul
          className="dropdown-menu show w-100 "
          style={{ maxHeight: "150px", overflowY: "auto" }}
        >
          {filteredOptions.map((option) => (
            <li key={option[valueKey]} >
              <button
                type="button"
                className="dropdown-item "
                style={{ color: 'white', backgroundColor: 'black' }}
                onMouseDown={(e) => e.preventDefault()} // Prevent closing on click
                onClick={() => handleOptionClick(option)}
              >
                {option[labelKey]}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* No options found */}
      {showDropdown && filteredOptions.length === 0 && (
        <ul className="dropdown-menu show w-100">
          <li>
            <button type="button" className="dropdown-item disabled">
              No options found
            </button>
          </li>
        </ul>
      )}

      {/* Display selected items below the dropdown */}
      {/* {selectedOptions.length > 0 && (
        <p className="mt-2">
          <strong>Selected:</strong>{" "}
          {selectedOptions.map((item) => item[labelKey]).join(", ")}
        </p>
      )} */}
    </>
  );
};

export default SearchableDropdown;
