import React, { useState, useEffect } from "react";
import { Slide } from "react-awesome-reveal";
import { matchesCollection } from "../../../firebase";
import { getDocs } from "firebase/firestore";
import MatchesBlock from "../../ui/MatchesBlock";

const Blocks = () => {
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    const docSnap = await getDocs(matchesCollection);

    const matches = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMatches(matches);
  };

  useEffect(() => {
    if (!matches.length > 0) {
      getMatches();
    }
  }, [matches]);

  const showMatches = (matches) =>
    matches
      ? matches.map((match) => (
          <Slide bottom key={match.id} className="item" triggerOnce>
            <div>
              <div className="wrapper">
                <MatchesBlock match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;

  return <div className="home_matches">{showMatches(matches)}</div>;
};

export default Blocks;
