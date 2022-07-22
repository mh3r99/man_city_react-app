import { CircularProgress } from "@material-ui/core";
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

  const showPlayerByCategory = (category) =>
    players?.map((player, i) => {
      return player.position === category ? (
        <Slide left key={player.id} triggerOnce>
          <div className="item">
            <PlayerCard
              number={player.number}
              name={player.name}
              lastname={player.lastname}
              bck={player.url}
            />
          </div>
        </Slide>
      ) : null;
    });

  return (
    <div className="the_team_container">
      {loading ? (
        <div className="progress">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Keepers</div>
            <div className="team_cards">{showPlayerByCategory("Keeper")}</div>
          </div>
          <div className="team_category_wrapper">
            <div className="title">Defence</div>
            <div className="team_cards">{showPlayerByCategory("Defence")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Midfield</div>
            <div className="team_cards">{showPlayerByCategory("Midfield")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Strikers</div>
            <div className="team_cards">{showPlayerByCategory("Striker")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheTeam;
