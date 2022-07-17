import React from "react";
import { Link } from "react-router-dom";

const Tag = (props) => {
  const template = (
    <div
      style={{
        background: props.bck ? props.bck : "#fff",
        fontSize: props.size ? props.size : "15px",
        color: props.color ? props.color : "#000",
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...props.add,
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
  }

  return template;
};

export default Tag;
