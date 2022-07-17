import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Tag from "../../ui/Tag";
import Cards from "./Cards";

let tagDefault = {
  bck: "#0e1731",
  size: "100px",
  color: "#fff",
};

const MeetPlayers = () => {
  const [show, setShow] = useState(false);
  const showTextTag = (text) => (
    <Tag
      {...tagDefault}
      add={{
        marginBottom: "27px",
      }}
    >
      {text}
    </Tag>
  );

  return (
    <Fade
      onVisibilityChange={(inView) => {
        if (inView) {
          setShow(true);
        }
      }}
      triggerOnce
    >
      <div className="home_meetplayers">
        <div className="container">
          <div className="home_meetplayers_wrapper">
            <div className="home_card_wrapper">
              <Cards show={show} />
            </div>
            <div className="home_text_wrapper">
              <div>{showTextTag("Meet")}</div>
              <div>{showTextTag("The")}</div>
              <div>{showTextTag("Players")}</div>
              <div>
                <Tag
                  bck="#fff"
                  size="27px"
                  color="#0e1731"
                  link={true}
                  linkTo="/the_team"
                  add={{
                    marginBottom: "27px",
                    border: "1px solid #0e1731",
                  }}
                >
                  Meet them here
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default MeetPlayers;
