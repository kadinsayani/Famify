import React from "react";

function CustomCheckbox(props) {
  const { checked, onChange } = props;

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{
        height: 35,
        width: 35,
      }}
    />
  );
}

export default CustomCheckbox;
