import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { playersCollection } from "../../../firebase";
import { getDocs, query, limit, startAfter } from "firebase/firestore";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";

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

  console.log(players);

  return (
    <AdminLayout title="The players">
      <Button onClick={() => loadMorePlayers()}>Load more</Button>
    </AdminLayout>
  );
};

export default Players;
