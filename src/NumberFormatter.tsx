import React, { useState } from 'react';

const NumberFormatter = ({ placeholder = "", className = "" }) => {
  const [value, setValue] = useState('');

  const handleChange = (event:any) => {
    const { value } = event.target;
    // Only allow digits and decimal points
    const cleanValue = value.replace(/[^0-9.]/g, ''); 
    const parts = cleanValue.split('.'); // Split into whole and decimal parts
    let whole = parts[0]; // Directly use the whole part without removing zeros initially
    let decimal = parts.length > 1 ? parts[1].replace(/[^0-9]/g, '') : undefined; // Clean non-numeric characters from decimal part

    // Reformat whole number with commas
    if (!isNaN(parseFloat(whole))) {
      whole = parseInt(whole, 10).toLocaleString();
    }

    // Combine whole number and decimal part, ensuring only a single decimal point is present
    let formattedValue = decimal !== undefined ? `${whole}.${decimal}` : whole;

    setValue(formattedValue || ''); // Set value or reset if cleaned value becomes empty
  };

  return (
    <input
      type="text"
      className={`form-control ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default NumberFormatter;
