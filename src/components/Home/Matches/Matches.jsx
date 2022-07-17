import React from "react";
import Tag from "../../ui/Tag";
import Blocks from "./Blocks";

const Matches = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag bck="#0e1731" size="50px" color="#fff">
          Matches
        </Tag>
        <Blocks />
        <Tag size="22px" color="#0e1731" link={true} linkTo="/the_matches">
          See more matches
        </Tag>
      </div>
    </div>
  );
};

export default Matches;
