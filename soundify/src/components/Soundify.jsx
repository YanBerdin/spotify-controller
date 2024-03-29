import React, { useEffect, useRef, useState } from "react";
import { useProvider } from "../utils/Provider";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

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
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const userInfo = {
          userId: data.id,
          userUrl: data.external_urls.spotify,
          name: data.display_name,
        };
        dispatch({ type: reducerCases.SET_USER, userInfo });
      } catch (error) {
        // Handle error here
        if (error.response && error.response.status === 401) {
          console.error("Token expiré. Cliquer sur Logout ou fermer l'onglet.");
          // Rediriger vers la page de connexion
          window.location.href = "http://localhost:3000";
        } else {
          console.error("Error fetching user info:", error);
        }
      }
    };
    getUserInfo();
  }, [dispatch, token]);

  useEffect(() => {
    const getPlaybackState = async () => {
      try {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/player",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: data.is_playing,
        });
        console.log("dispatch SET_PLAYER_STATE, playerState: data.is_playing"); //TODO Remove this line
        console.log("is_playing", data.is_playing); //TODO Remove this line
      } catch (error) {
        // Handle error here
        if (error.response && error.response.status === 401) {
          console.error(
            "Token expiré. Cliquer sur Logout ou fermer l'onglet.",
            error
          );
          // window.location.href = "http://localhost:3000"; //? Boucle infinie
        } else {
          console.error("Error fetching playback state:", error);
          // window.location.href = "http://localhost:3000"; //? Boucle infinie
        }
      }
    };
    getPlaybackState();
    console.log("Appel => getPlaybackState()"); //TODO Remove this line
  }, [dispatch, token]);

  return (
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

  /* #logout {
    padding: 0.5rem 2rem;
    border-radius: 3rem;
    background-color: var(--color-button-bg);
    color: var(--color-button-text);
    border: none;
    font-size: 0.8rem;
    cursor: pointer;
  } */
`;

export default Soundify;
