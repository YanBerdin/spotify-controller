import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";


function Footer() {
  console.log("Rendering => Footer"); //TODO Remove this line
  return (
    <Container>
      <CurrentTrack />
      <PlayerControls />
      <Volume/>
    </Container>
 
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 0 0.5rem;
`;

export default Footer;
