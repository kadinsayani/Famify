import React from "react";

function CustomCheckbox(props) {
  const { checked, onChange } = props;

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{
        height: 40,
        width: 40,
      }}
    />
  );
}

export default CustomCheckbox;
