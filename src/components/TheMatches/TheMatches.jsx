import { CircularProgress } from "@material-ui/core";
import { getDocs } from "firebase/firestore";
import React, { useState, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { matchesCollection } from "../../firebase";
import LeagueTable from "./LeagueTable";
import MatchesList from "./MatchesList";

const initialState = {
  filterMatches: null,
  playedFilter: "All",
  resultFilter: "All",
};

const TheMatches = () => {
  const [matches, setMatches] = useState(null);
  const [state, dispatch] = useReducer((prevState, nextState) => {
    return {
      ...prevState,
      ...nextState,
    };
  }, initialState);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const docSnap = await getDocs(matchesCollection);

        const matches = docSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMatches(matches);
        dispatch({
          ...state,
          filterMatches: matches,
        });
      } catch (error) {
        toast.error(error);
      }
    };

    if (!matches) {
      getMatches();
    }
  }, [matches, state]);

  const showPlayed = (played) => {
    // all, yes, no
    const filteredList = matches.filter((match) => {
      return match.final === played;
    });

    dispatch({
      ...state,
      filterMatches: played === "All" ? matches : filteredList,
      playedFilter: played,
      resultFilter: "All",
    });
  };

  const showResult = (result) => {
    const filteredList = matches.filter((match) => {
      return match.result === result;
    });

    dispatch({
      ...state,
      filterMatches: result === "All" ? matches : filteredList,
      playedFilter: "All",
      resultFilter: result,
    });
  };

  console.log(state);

  return (
    <>
      {matches ? (
        <div className="the_matches_container">
          <div className="the_matches_wrapper">
            <div className="left">
              <div className="match_filters">
                <div className="match_filters_box">
                  <div className="tag">Show Matches</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        state.playedFilter === "All" ? "active" : ""
                      }`}
                      onClick={() => showPlayed("All")}
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        state.playedFilter === "Yes" ? "active" : ""
                      }`}
                      onClick={() => showPlayed("Yes")}
                    >
                      Played
                    </div>
                    <div
                      className={`option ${
                        state.playedFilter === "No" ? "active" : ""
                      }`}
                      onClick={() => showPlayed("No")}
                    >
                      Not Played
                    </div>
                  </div>
                </div>
                <div className="match_filters_box">
                  <div className="tag">Result games</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        state.resultFilter === "All" ? "active" : ""
                      }`}
                      onClick={() => showResult("All")}
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "W" ? "active" : ""
                      }`}
                      onClick={() => showResult("W")}
                    >
                      W
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "L" ? "active" : ""
                      }`}
                      onClick={() => showResult("L")}
                    >
                      L
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "D" ? "active" : ""
                      }`}
                      onClick={() => showResult("D")}
                    >
                      D
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
