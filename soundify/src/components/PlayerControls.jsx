import { useEffect } from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useProvider } from "../utils/Provider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

function PlayerControls() {
  const [{ token, playerState, currentIndex, queueList }, dispatch] =
    useProvider();
  // console.log("Rendering => PlayerControls"); //TODO Remove this line
  // console.log("playerState", playerState); //TODO Remove this line
  // console.log("queueList", queueList); //TODO Remove this line

  // Changer l'état du lecteur (pause / lecture)
  const changeState = async () => {
    try {
      const state = playerState ? "pause" : "play";
      const response = await axios.put(
        // https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
        // https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      // console.log("response", response); //TODO Remove this line

      // OK => empty response
      if (response.status === 204) {
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: !playerState,
        });
        console.log(
          "dispatch SET_PLAYER_STATE, playerState: !playerState",
          playerState
        ); //TODO Remove this line
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Gérer l'erreur 403 ici
        console.error(
          "Cette fonctionnalité nécessite un compte Spotify Premium. Reste sur PAUSE",
          error
        );
        console.error(
          "Cette fonctionnalité nécessite un compte Spotify Premium. Reste sur PAUSE",
          error
        );
      } else {
        // Gérer d'autres types d'erreurs ici
        console.error(
          "Une erreur s'est produite lors de la modification Play/Pause de l'état du lecteur.",
          error
        );
      }
    }
  };

  // Récupération des Tracks de la file d'attente
  const getQueueList = async () => {
    try {
      // Récupération de la file d'attente
      const queueResponse = await axios.get(
        // https://developer.spotify.com/documentation/web-api/reference/get-queue
        // Retourne un [] d'objet  currently_playing + queue
        "https://api.spotify.com/v1/me/player/queue",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("queueResponse", queueResponse); //TODO Remove this line

      // Si la requête est un succès et que la file d'attente existe
      if (queueResponse.status === 200 && queueResponse.data.queue) {
        const currentQueueList = queueResponse.data.queue;

        console.log("currentQueueList", currentQueueList); //TODO Remove this line

        // Récupération des Tracks de la file d'attente
        const newQueueList = currentQueueList.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
          };
        });
        //console.log("newQueueList", newQueueList); //TODO Remove this line
        dispatch({
          type: reducerCases.SET_QUEUELIST,
          queueList: newQueueList,
        });
        console.log("dispatch SET_QUEUELIST, queueList: newQueueList"); //TODO Remove this line
        console.log("newQueueList", newQueueList[currentIndex]); //TODO Remove this line
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Gérer l'erreur 403 ici
        console.error("Erreur d'authentification.", error);
      } else if (error.response && error.response.status === 401) {
        console.error("Token expiré. Cliquer sur Logout ou fermer l'onglet.");
        // Rediriger vers la page de connexion
        window.location.href = "http://localhost:5173";
      } else {
        console.error(
          "Une erreur s'est produite lors de la récupération de la file d'attente.",
          error
        );
      }
    }
  };

  useEffect(() => {
    getQueueList();
    console.log("UseEffect => getQueueList()", queueList); //TODO Remove this line
  }, [token, dispatch]);

  // Fonction pour changer de piste type = "next" ou "previous"
  const changeTrackFromQueue = async (type) => {
    let newCurrentTrack = [];
    
    console.log("Appel => changeTrackFromQueue()"); //TODO Remove this line
    try {
      // Changement de piste
      const changeTrackResponse = await axios.post(
        // https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track
        // https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
        //* empty response
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(
        "dispatch SET_PLAYER_STATE, playerState: playerState => PAUSE"
      ); //TODO Remove this line
      console.log("changeTrackResponse", changeTrackResponse); //TODO Remove this line
      console.log(type); //TODO Remove this line

      if (changeTrackResponse.status === 204) {
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: !playerState, // PAUSE
        });

 

        // Récupération du prochain/précédent Track
        if (type === "next") {
          newCurrentTrack = queueList[currentIndex];
          console.log("newCurrentTrack", newCurrentTrack); //TODO Remove this line


          dispatch({
            type: reducerCases.SET_PLAYING,
            currentPlaying: newCurrentTrack,
          });
          dispatch({
            type: reducerCases.SET_CURRENTINDEX,
            currentIndex: currentIndex + 1,
          });
           console.log("currentIndex", currentIndex); //TODO Remove this line
        } else if (type === "previous") {
          // currentIndex--;
         // currentPreviousTrack = queueList[-1];
         // console.log("currentPreviousTrack", currentPreviousTrack); //TODO Remove this line

          // dispatch({
          //   type: reducerCases.SET_CURRENTINDEX,
          //   currentIndex: currentIndex - 1,
          // });

          // dispatch({
          //   type: reducerCases.SET_PLAYING,
          //   currentPlaying: currentPreviousTrack,
          // });

          // console.log("currentIndex", currentIndex); //TODO Remove this line
        } else {
          console.log("Aucun titre précédent dans la file d'attente.");
        }
      }

      console.log("playerState", playerState); //TODO Remove this line
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: playerState,
      });
      console.log("dispatch SET_PLAYER_STATE, playerState: playerState"); //TODO Remove this line
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Gérer l'erreur 403 ici
        console.error(
          "Cette fonctionnalité nécessite un compte Spotify Premium.",
          error
        );
        console.error(
          "Cette fonctionnalité nécessite un compte Spotify Premium.",
          error
        );
      } else {
        console.error(
          "Une erreur s'est produite lors du changement de piste.",
          error
        );
      }
    }
  };

  const handleNextTrack = () => {

    console.log("Appel => handleNextTrack"); //TODO Remove this line
    changeTrackFromQueue("next");
     console.log(currentIndex); //TODO Remove this line
  };

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => handleNextTrack } />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrackFromQueue("next")} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
      font-size: 2rem;
      transition: 0.2s ease-in-out;
      &:hover {
        color: #b3b3b3;
      }
    }
  }
  .previous,
  .next {
    font-size: 1.3rem;
  }
`;

export default PlayerControls;
