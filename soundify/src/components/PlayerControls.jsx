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
  const [
    { token, playerState, currentIndex, queueList, newPlayedTrackList }, //* remove currentIndex
    dispatch,
  ] = useProvider();
  // console.log("Rendering => PlayerControls"); //TODO Remove this line
  // console.log("playerState", playerState); //TODO Remove this line
  // console.log("queueList", queueList); //TODO Remove this line

  // Changer l'état du lecteur (pause / lecture)
  const playOrPause = async () => {
    try {
      console.log("Appel => playOrPause");
      const state = playerState ? "pause" : "play";
      const playOrPauseResponse = await axios.put(
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

      // console.log("playOrPauseResponse", playOrPauseResponse); //TODO Remove this line

      // OK => empty playOrPauseResponse
      if (playOrPauseResponse.status === 204) {
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
      if (
        error.playOrPauseResponse &&
        error.playOrPauseResponse.status === 403
      ) {
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
    console.log("Appel => getQueueList()"); //TODO Remove this line
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
      // console.log("queueResponse", queueResponse); //TODO Remove this line

      // Si la requête est un succès et que la file d'attente existe
      if (queueResponse.status === 200 && queueResponse.data.queue) {
        const currentQueueList = queueResponse.data.queue;

        // console.log("currentQueueList", currentQueueList); //TODO Remove this line

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
        // console.log("newQueueList", newQueueList[currentIndex]); //TODO Remove this line
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dispatch]);

  // Récupération de la liste des Tracks récemment joués
  const getrecentlyPlayedList = async () => {
    console.log("Appel => getrecentlyPlayedList()"); //TODO Remove this line
    try {
      const recentlyPlayedResponse = await axios.get(
        // https://developer.spotify.com/documentation/web-api/reference/get-recently-played
        // Retourne un [] d'objet  items
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (
        recentlyPlayedResponse.status === 200 &&
        recentlyPlayedResponse.data.items
      ) {
        const recentlyPlayedList = recentlyPlayedResponse.data.items;

        console.log("recentlyPlayedList", recentlyPlayedList); //TODO Remove this line

        // Récupération des Tracks de la file d'attente
        const newPlayedTrackList = recentlyPlayedList.map((item) => {
          // Vérifier que l'objet track et le tableau artists existent
          if (
            item.track &&
            item.track.album &&
            item.track.album.images &&
            item.track.artists
          ) {
            return {
              id: item.track.id,
              name: item.track.name,
              artists: item.track.artists.map((artist) => artist.name),
              image: item.track.album.images[2].url,
            };
          } else {
            console.error("Données de track manquantes ou mal formées", item);
            return {};
          }
        });
        dispatch({
          type: reducerCases.SET_NEW_PLAYED_TRACKLIST,
          newPlayedTrackList: newPlayedTrackList,
        });
        console.log(
          "dispatch SET_NEW_PLAYED_TRACKLIST, newPlayedTrackList: newPlayedTrackList",
          newPlayedTrackList
        ); //TODO Remove this line
        // console.log("newPlayedTrackList", newPlayedTrackList[0]); //TODO Remove this line
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
          "Une erreur s'est produite lors de la récupération de la Tracklist jouée précédemment.",
          error
        );
      }
      return {}; // Retourner un objet vide ou une structure par défaut
    }
  };

  useEffect(() => {
    getrecentlyPlayedList();
    console.log("UseEffect => getrecentlyPlayedList()", newPlayedTrackList); //TODO Remove this line
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dispatch]);

  // Fonction pour changer de piste type = "next" ou "previous"
  const changeTrackFromQueue = async (type) => {
    // let newCurrentTrack = {};
    // let previousTrack = {};

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
      // console.log("changeTrackResponse", changeTrackResponse); //TODO Remove this line
      console.log(type); //TODO Remove this line

      if (changeTrackResponse.status === 204) {
        // dispatch({
        //   type: reducerCases.SET_PLAYER_STATE,
        //   playerState: !playerState, // PAUSE
        // });

        // Récupération du prochain/précédent Track
        if (type === "next") {
          // Ajout d'un délai pour laisser le temps au lecteur de changer de morceau
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Délai de 1000ms

          // Récupération des informations du nouveau morceau
          const trackInfoResponse = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          if (trackInfoResponse.data && trackInfoResponse.data.item) {
            const currentPlaying = {
              id: trackInfoResponse.data.item.id,
              name: trackInfoResponse.data.item.name,
              artists: trackInfoResponse.data.item.artists.map(
                (artist) => artist.name
              ),
              image: trackInfoResponse.data.item.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
          }

          // console.log("playerState", playerState); //TODO Remove this line
          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: playerState,
          });
          console.log("dispatch SET_PLAYER_STATE, playerState: playerState"); //TODO Remove this line
          // newCurrentTrack = queueList[currentIndex];
          // console.log("newCurrentTrack", newCurrentTrack); //TODO Remove this line

          // dispatch({
          //   type: reducerCases.SET_PLAYING,
          //   currentPlaying: newCurrentTrack,
          // });
          // dispatch({
          //   type: reducerCases.SET_CURRENTINDEX,  //! ---------------------------------------------------
          //   currentIndex: currentIndex + 1,
          // });
          // console.log("currentIndex", currentIndex); //TODO Remove this line
        }
        if (type === "previous") {
          //  previousTrack = newPlayedTrackList[0];
          //  console.log("previousTrack", previousTrack); //TODO Remove this line

          dispatch({
            type: reducerCases.SET_CURRENTINDEX, //! ---------------------------------------------------
            currentIndex: currentIndex - 1,
          });
          console.log("currentIndex", currentIndex); //TODO Remove this line

          // dispatch({
          //   type: reducerCases.SET_PLAYING,
          //   currentPlaying: previousTrack,
          // });

          // Ajout d'un délai pour laisser le temps au lecteur de changer de morceau
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Délai de 1000ms

          // Récupération des informations du nouveau morceau
          const trackInfoResponse = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          if (trackInfoResponse.data && trackInfoResponse.data.item) {
            const currentPlaying = {
              id: trackInfoResponse.data.item.id,
              name: trackInfoResponse.data.item.name,
              artists: trackInfoResponse.data.item.artists.map(
                (artist) => artist.name
              ),
              image: trackInfoResponse.data.item.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
          }
        }
        // console.log("playerState", playerState); //TODO Remove this line
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: playerState,
        });
        console.log("dispatch SET_PLAYER_STATE, playerState: playerState"); //TODO Remove this line
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Gérer l'erreur 403 ici
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

  const handlePreviousTrack = () => {
    console.log("Appel => handlePreviousTrack"); //TODO Remove this line
    changeTrackFromQueue("previous");
    console.log(currentIndex); //TODO Remove this line
  };

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={handlePreviousTrack} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={playOrPause} />
        ) : (
          <BsFillPlayCircleFill onClick={playOrPause} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={handleNextTrack} />
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
