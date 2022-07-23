import { CircularProgress } from "@material-ui/core";
import { getDocs } from "firebase/firestore";
import React, { useState, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { matchesCollection } from "../../firebase";
import LeagueTable from "./LeagueTable";
import MatchesList from "./MatchesList";

const TheMatches = () => {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const docSnap = await getDocs(matchesCollection);

        const matches = docSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMatches(matches);
      } catch (error) {
        toast.error(error);
      }
    };

    if (!matches) {
      getMatches();
    }
  }, [matches]);

  return (
    <>
      {matches ? (
        <div className="the_matches_container">
          <div className="the_matches_wrapper">
            <div className="left">list</div>
            <div className="right">
              <LeagueTable />
            </div>
          </div>
        </div>
      ) : (
        <div className="progress">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default TheMatches;
