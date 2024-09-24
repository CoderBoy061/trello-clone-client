import React from "react";

const Input = ({type,placeholder,onChange,name,value}) => {
  return <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />;
};

export default Input;
