import styled from "styled-components";
import { useProvider } from "../utils/Provider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import PropTypes from "prop-types";
import { reducerCases } from "../utils/Constants";

function Navbar({ $navBackground }) {
  const [{ userInfo }] = useProvider();
  // console.log(userInfo); //TODO Remove this line
  console.log("Rendering => Navbar"); //TODO Remove this line

  const logout = () => {
    window.sessionStorage.removeItem("token");
    dispatch({ type: reducerCases.SET_TOKEN, token: "" });

    // Redirect vers login page
    window.location.href = "http://localhost:3000";
  };
  // console.log(token);

  return (
    <Container $navBackground={$navBackground}>
      <div className="search__bar">
        <FaSearch />
        <input type="text" placeholder="Artists, songs, or podcasts" />
      </div>
      <div className="avatar">
        <a href={userInfo?.userUrl}>
          <CgProfile />
          <span>{userInfo?.name}</span>
        </a>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  --background-default: none;
  --background-active: rgba(0, 0, 0, 0.7);
  --color-icon-default: #c7c5c5;
  --color-icon-hover: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ $navBackground }) =>
    $navBackground ? "var(--background-active)" : "var(--background-default)"};

  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      background-color: white;
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 1rem 0.4rem 0.3rem;
    /*padding-right: 1rem;*/
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    
  } a {
       display: flex;
       justify-content: center;
       align-items: center;
       gap: 0.5rem;
       text-decoration: none;
       color: var(--color-icon-default);
       font-weight: bold;
       /*transition: color 0.3s ease-in-out;*/
       
       
    } svg {
          font-size: 1.3rem;
          background-color: #282828;
          padding: 0.2rem;
          border-radius: 1rem;
          color: var(--color-icon-default);
          /*transition: color 0.3s ease-in-out;*/
        }
        &:hover {
        color: var(--color-icon-hover);
        } svg {
          color: var(--color-icon-hover);
        }
    }
  }
  .avatar {
      button {
        position: absolute; 
        top: 100%; 
        left: 50%;
        transform: translateX(-50%); 
        display: none;
        opacity: 0; 
        transition: opacity 0.2s, visibility 0s 0.5s ;
      }
      &:hover {
        button {
          display: block;
          background-color: black;
          opacity: 1;
          transition-delay: 0s;
          border-radius: 1rem;        }
      }
    }
} 
`;

Navbar.propTypes = {
  $navBackground: PropTypes.bool,
};

export default Navbar;
