import React from "react";

function CustomCheckbox(props) {
  const { checked, onChange } = props;

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{
        height: 30,
        width: 30,
      }}
    />
  );
}

export default CustomCheckbox;