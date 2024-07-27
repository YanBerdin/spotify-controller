import axios from "axios";
import styled from "styled-components";
import { useNotification } from "../utils/NotificationContext";
import { useProvider } from "../utils/Provider";
import Notification from "./Notification";

export default function Volume() {
  const [{ token }] = useProvider();

  const { showErrorToast } = useNotification();

  const handleVolumeChange = async (event) => {
    const volume = parseInt(event.target.value);

    try {
      await axios.put(
        "https://api.spotify.com/v1/me/player/volume",
        {},
        {
          params: {
            volume_percent: volume,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      let errorMessage = "errorMessage : Le réglage du volume ne répond pas.";
      console.log(error.response); //TODO Remove this line
      if (error.response) {
        if (error.response.status === 403) {
          if (
            error instanceof axios.AxiosError &&
            error.code === "ERR_BAD_REQUEST"
          ) {
            errorMessage =
              "Cette fonctionnalité Volume nécessite un compte Spotify Premium.";
          }
          console.error(
            "error.response.status === 403 => Cette fonctionnalité Volume nécessite un compte Spotify Premium.",
            error
          );
          showErrorToast(
            new Error(
              "Le réglage de Volume nécessite un compte Spotify Premium."
            )
          );
        }
      } else {
        // Gérer d'autres types d'erreurs ici
        console.error(errorMessage, error);
        showErrorToast(new Error(errorMessage));
      }
    }
  };

  return (
    <>
      <Container>
        <div>
          <input
            type="range"
            onMouseUp={(event) => handleVolumeChange(event)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </Container>
      <Notification />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  gap: 1rem;
  input {
    width: 9rem;
    height: 0.3rem;
    border-radius: 2rem;
    color: #1ed760;
    transition: background 0.3s;
    cursor: pointer;
    /* &:hover {
      background: #ddd;
    }
    &:active {
      background: #bbb;
    } */
  }
`;
