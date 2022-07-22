import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { matchesCollection } from "../../../firebase";
import { getDocs, query, limit, startAfter } from "firebase/firestore";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Matches = () => {
  const [lastFetchedMatches, setLastFetchedMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(null);

  const getMatches = async () => {
    const q = query(matchesCollection, limit(2));
    const docSnap = await getDocs(q);

    const lastVisible = docSnap.docs[docSnap.docs.length - 1];
    const matches = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setLastFetchedMatches(lastVisible);
    setMatches(matches);

    setLoading(false);
  };

  useEffect(() => {
    if (!matches) {
      setLoading(true);
      getMatches();
    }
  }, [matches]);

  const loadMoreMatches = async () => {
    if (lastFetchedMatches) {
      setLoading(true);

      const q = query(
        matchesCollection,
        startAfter(lastFetchedMatches),
        limit(2)
      );
      const docSnap = await getDocs(q);

      const lastVisible = docSnap.docs[docSnap.docs.length - 1];
      const newMatches = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLastFetchedMatches(lastVisible);
      setMatches((prevState) => [...prevState, ...newMatches]);
    } else {
      toast.error("Nothing to load");
    }

    setLoading(false);
  };

  return (
    <AdminLayout title="The matches">
      <div className="mb-5">
        <Button
          disableElevation
          variant="outlined"
          component={Link}
          to="/admin_matches/add_match"
        >
          Add match
        </Button>
      </div>

      <Paper className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Match</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches
              ? matches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell>{match.date}</TableCell>
                    <TableCell>
                      <Link to={`/admin_matches/edit_match/${match.id}`}>
                        {match.away}
                        <strong> - </strong>
                        {match.local}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {match.resultAway}
                      <strong> - </strong>
                      {match.resultLocal}
                    </TableCell>
                    <TableCell>
                      {match.final === "Yes" ? (
                        <span className="matches_tag_red">Final</span>
                      ) : (
                        <span className="matches_tag_green">
                          Not played yet
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={() => loadMoreMatches()}
      >
        Load more
      </Button>

      <div className="admin_progress">
        {loading ? (
          <CircularProgress
            thickness={7}
            style={{
              color: "#98c5e9",
            }}
          />
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default Matches;
