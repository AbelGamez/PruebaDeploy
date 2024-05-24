import React, { useState } from 'react';

const Checkbox = ({ label, checked: initialChecked }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
