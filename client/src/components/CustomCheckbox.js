import React from "react";

function CustomCheckbox(props) {
  const { checked, onChange } = props;

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
}

export default CustomCheckbox;