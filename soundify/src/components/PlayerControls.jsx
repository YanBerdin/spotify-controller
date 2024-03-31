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
// import { useEffect } from "react";

function PlayerControls() {
  const [{ token, playerState, queueList }, dispatch] = useProvider();
  console.log("Rendering => PlayerControls"); //TODO Remove this line
  console.log("playerState", playerState); //TODO Remove this line
  console.log("queueList", queueList); //TODO Remove this line

  // Fonction pour changer l'état du lecteur (pause / lecture)
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
        console.log("dispatch SET_PLAYER_STATE, playerState: !playerState"); //TODO Remove this line
        console.log(playerState);
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

  // Récupération de l'état du lecteur
  //const isPlaying = changeTrackResponse.data.is_playing;

  //let currentIndex = -1; // Index du titre actuellement joué //TODO: a mettre  ds Constants

  //* Fonction pour changer de piste type = "next" ou "previous"
  const changeTrackFromQueue = async (type) => {
    console.log("Appel => changeTrackAndGetInfo"); //TODO Remove this line
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

        // Récupérer la musique en cours de lecture
        // const trackInfoResponse = await axios.get(
        // "https://api.spotify.com/v1/me/player/currently-playing",

        // Récupération des informations du nouveau morceau
        if (type === "next") {
          //const nextTrackInQueue = queueList[0];
          // currentIndex++;
          //queueList = queue[currentIndex];

          // const currentPlaying = {
          //   id: trackInfoResponse.data.item.id,
          //   name: trackInfoResponse.data.item.name,
          //   artists: trackInfoResponse.data.item.artists.map(
          //     (artist) => artist.name
          //   ),
          //   image: trackInfoResponse.data.item.album.images[2].url,
          // };

          // dispatch({
          //   type: reducerCases.SET_PLAYER_STATE,
          //   playerState: nextTrack,
          // });

          dispatch({ type: reducerCases.SET_PLAYING, nextTrack });
          console.log("playerState", playerState); //TODO Remove this line

          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: playerState,
          });
          console.log("dispatch reducerCases.SET_PLAYING, currentPlaying"); //TODO Remove this line
          // } else {
          //   dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
          console.log("dispatch SET_PLAYER_STATE, playerState: playerState"); //TODO Remove this line
          console.log("trackInfoResponse.data", trackInfoResponse.data);
          // getPlaybackState();

          console.log("playerState", playerState); //TODO Remove this line
        }
      }
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
        // Gérer d'autres types d'erreurs ici
        console.error(
          "Une erreur s'est produite lors du changement de piste.",
          error
        );
      }
    }

    //   function playNext() {
    //     if (currentIndex < queue.length - 1) {
    //       currentIndex++;
    //       playTrack(queue[currentIndex]);
    //     }
    //   }

    //   function playPrevious() {
    //     if (currentIndex > 0) {
    //       currentIndex--;
    //       playTrack(queue[currentIndex]);
    //     } else {
    //       console.log("Aucun titre précédent dans la file d'attente.");
    //     }
    //   }
  };
  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrackFromQueue("previous")} />
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
