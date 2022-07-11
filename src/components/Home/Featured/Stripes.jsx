import React from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import { useState } from "react";

const Stripes = () => {
  const [first, setfirst] = useState();
  const showStripes = () => <div>stripes</div>;
  return <div className="features_stripes">{showStripes()}</div>;
};

export default Stripes;
