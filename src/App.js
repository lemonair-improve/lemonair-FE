import "./App.css";
import styled from "styled-components";
// import RoundButton from "./styled_components/RoundButton";
// import SquareButton from "./styled_components/SquredButton";
// import RotateBox from "./animated_components/RotateButton";
// import BlinkEventButton from "./event_components/BlinkEventButton";
import ChannelInfo from "./sbltest/Channel";
import VideoPlayer from "./ReactPlayer";

const StBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid ${(props) => props.borderColor};
  margin: 20px;
`;

const App = () => {
  return (
    <div>
      <ChannelInfo></ChannelInfo>
    </div>
  );
};
export default App;
