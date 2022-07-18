import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { playersCollection } from "../../../firebase";
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

const Players = () => {
  const [lastFetchedPlayers, setLastFetchedPlayers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState(null);

  const getPlayers = async () => {
    const q = query(playersCollection, limit(2));
    const docSnap = await getDocs(q);

    const lastVisible = docSnap.docs[docSnap.docs.length - 1];
    const players = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setLastFetchedPlayers(lastVisible);
    setPlayers(players);

    setLoading(false);
  };

  useEffect(() => {
    if (!players) {
      setLoading(true);
      getPlayers();
    }
  }, [players]);

  const loadMorePlayers = async () => {
    if (lastFetchedPlayers) {
      setLoading(true);

      const q = query(
        playersCollection,
        startAfter(lastFetchedPlayers),
        limit(2)
      );
      const docSnap = await getDocs(q);

      const lastVisible = docSnap.docs[docSnap.docs.length - 1];
      const newPlayers = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLastFetchedPlayers(lastVisible);
      setPlayers((prevState) => [...prevState, ...newPlayers]);
    } else {
      toast.error("Nothing to load");
    }

    setLoading(false);
  };

  return (
    <AdminLayout title="The players">
      <div className="mb-5">
        <Button
          disableElevation
          variant="outlined"
          component={Link}
          to="/admin_players/add_player"
        >
          Add player
        </Button>
      </div>

      <Paper className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players
              ? players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.lastname}
                      </Link>
                    </TableCell>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>{player.position}</TableCell>
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
        onClick={() => loadMorePlayers()}
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

export default Players;
