import React from "react";
import Featured from "./Featured/Featured";
import Matches from "./Matches/Matches";
import MeetPlayers from "./MeetPlayers/MeetPlayers";

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <Matches />
      <MeetPlayers />
    </div>
  );
};

export default Home;
