import { useEffect, useRef, useState } from "react";
import { useProvider } from "../utils/Provider";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";
import Login from "./Login";

function Soundify() {
  const [{ token }, dispatch] = useProvider();
  // const [{userInfo}] = useProvider(); //TODO Remove this line
  // console.log(userInfo); //TODO Remove this line
  // const [{selectedPlaylist}] = useProvider(); //TODO Remove this line
  // console.log(selectedPlaylist); //TODO Remove this line
  console.log("Rendering => Soundify"); //TODO Remove this line

  const [$navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfoResponse = await axios.get(
          "https://api.spotify.com/v1/me",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const userInfo = {
          userId: userInfoResponse.data.id,
          userUrl: userInfoResponse.data.external_urls.spotify,
          name: userInfoResponse.data.display_name,
        };
        dispatch({ type: reducerCases.SET_USER, userInfo });
      } catch (error) {
        // Handle error here
        if (error.response && error.response.status === 401) {
          console.error("Token expiré. Cliquer sur Logout ou fermer l'onglet.");
          // Rediriger vers la page de connexion
          window.location.href = "http://localhost:5173";
        } else {
          console.error("Error fetching user info:", error);
        }
      }
    };
    getUserInfo();
    console.log("Appel => getUserInfo()"); //TODO Remove this line
  }, [dispatch, token]);

  // Récupération de l'état de lecture actuel
  useEffect(() => {
    const getPlaybackState = async () => {
      try {
        const playBackResponse = await axios.get(
          // https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
          "https://api.spotify.com/v1/me/player",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("playBackResponse", playBackResponse); //TODO Remove this line

        if (playBackResponse.status === 200 && playBackResponse.data != "") {
          // Si le statut de la réponse est 200, cela signifie que le lecteur est en pause
          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: playBackResponse.data.is_playing,
          });
          console.log("dispatch SET_PLAYER_STATE, playerState: false"); //TODO Remove this line
        } else if (
          playBackResponse.status === 200 &&
          playBackResponse.data === ""
        ) {
          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: false,
          });
        }
        // console.log("playBackResponse", playBackResponse); //TODO Remove this line
        console.log(
          "dispatch SET_PLAYER_STATE, playerState: playBackResponse.is_playing"
        ); //TODO Remove this line
        // console.log("is_playing", playBackResponse.data.is_playing); //TODO Remove this line
      } catch (error) {
        // Handle error here
        if (error.response && error.response.status === 401) {
          console.error(
            "Token expiré. Cliquer sur Logout ou fermer l'onglet.",
            error
          );
          // window.location.href = "http://localhost:5173"; //? Boucle infinie
        } else {
          console.error("Error fetching playback state:", error);
          // window.location.href = "http://localhost:5173"; //? Boucle infinie
        }
      }
    };
    getPlaybackState();
    console.log("Appel => getPlaybackState()"); //TODO Remove this line
  }, [dispatch, token]);

  return !token ? (
    <Login />
  ) : (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar $navBackground={$navBackground} />

          <div className="body__contents">
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}
const Container = styled.div`
  --color-background: rgb(32, 87, 100);
  --color-scrollbar-thumb: rgb(255, 255, 255, 0.6);
  --color-button-bg: black;
  --color-button-text: #49f585;

  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;

  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1)), var(--color-background);

    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
    
    &::-webkit-scrollbar {
        color: "#b3b3b3";
        width: 0.3rem;
        max-height: 2rem;
        &-thumb {
          background-color: var(--color-scrollbar-thumb);
        }
  }
`;

export default Soundify;
