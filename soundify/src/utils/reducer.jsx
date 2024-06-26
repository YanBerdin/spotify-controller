import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
  selectedPlaylist: null,
  selectedPlaylistId: "29cplenOi8Aun1nEDjwqdF",
  currentPlaying: null,
  playerState: false,
  queueList: [],
  newPlayedTrackList: [],
  currentIndex: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
    case reducerCases.SET_QUEUELIST:
      return {
        ...state,
        queueList: action.queueList,
      };
    case reducerCases.SET_CURRENTINDEX:
      return {
        ...state,
        currentIndex: action.currentIndex,
      };
    case reducerCases.SET_NEW_PLAYED_TRACKLIST:
      return {
        ...state,
        newPlayedTrackList: action.newPlayedTrackList,
      };
    default:
      return state;
  }
};

export default reducer;
