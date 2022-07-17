import React, { useState, useEffect } from "react";
import { Slide } from "react-awesome-reveal";
import { matchesCollection } from "../../../firebase";
import { getDocs } from "firebase/firestore";

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

  return <div>hello</div>;
};

export default Blocks;
