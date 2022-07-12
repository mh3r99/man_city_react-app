import React, { useState } from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

const Stripes = () => {
  const [first, setfirst] = useState();
  const showStripes = () => <div>stripes</div>;
  return <div className="features_stripes">{showStripes()}</div>;
};

export default Stripes;
