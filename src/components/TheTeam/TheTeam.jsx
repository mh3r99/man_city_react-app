import { getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useState } from "react";
import { useEffect } from "react";
import { Slide } from "react-awesome-reveal";
import { toast } from "react-toastify";
import { playersCollection } from "../../firebase";
import PlayerCard from "../ui/PlayerCard";

const TheTeam = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(null);

  const storage = getStorage();

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const docSnap = await getDocs(playersCollection);

        const players = docSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let promises = [];

        players.forEach((player, i) => {
          promises.push(
            new Promise((resolve, reject) => {
              const imageRef = ref(storage, `players/${player.image}`);
              getDownloadURL(imageRef)
                .then((url) => {
                  players[i].url = url;
                  resolve();
                })
                .catch((error) => {
                  reject();
                });
            })
          );
        });

        Promise.all(promises).then(() => {
          setPlayers(players);
        });
      } catch (error) {
        console.log(error);
        toast.error("Sorry try again later");
      } finally {
        setLoading(false);
      }
    };

    if (!players) {
      getPlayers();
    }
  }, [players]);

  console.log(players);

  return (
    <div>
      <PlayerCard />
    </div>
  );
};

export default TheTeam;
