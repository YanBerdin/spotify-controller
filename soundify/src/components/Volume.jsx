import axios from "axios";
import styled from "styled-components";
import { useProvider } from "../utils/Provider";

export default function Volume() {
  const [{ token }] = useProvider();

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
      if (error.response && error.response.status === 403) {
        if (
          error instanceof axios.AxiosError &&
          error.code === "ERR_BAD_REQUEST"
        ) {
          console.error(
            "Cette fonctionnalité PLAY/PAUSE nécessite un compte Spotify Premium.",
            error
          );
        }
      } else {
        // Gérer d'autres types d'erreurs ici
        console.error("Le réglage du volume ne répond pas:", error);
      }
    }
  };

  return (
    <Container>
      <input
        type="range"
        onMouseUp={(event) => handleVolumeChange(event)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </Container>
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
