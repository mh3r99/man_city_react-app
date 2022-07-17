import React from "react";
import Animate from "react-move";
import { easePolyOut } from "d3-ease";

import Otamendi from "../../../Resources/images/players/Otamendi.png";
import Sterling from "../../../Resources/images/players/Raheem_Sterling.png";
import Kompany from "../../../Resources/images/players/Vincent_Kompany.png";

let cards = [
  {
    bottom: 90,
    lef: 300,
    player: Kompany,
  },
  {
    bottom: 60,
    lef: 200,
    player: Sterling,
  },
  {
    bottom: 30,
    lef: 100,
    player: Otamendi,
  },
  {
    bottom: 0,
    lef: 0,
    player: Kompany,
  },
];

const Cards = () => {
  const showAnimateCards = () =>
    cards.map((card, i) => <Animate key={i}></Animate>);

  return <div>{showAnimateCards()}</div>;
};

export default Cards;
