import MetaStreetButton from "../../MetaStreetButton";
import SuccessAnimation from "../../SuccessAnimation";

interface RefinanceModalSuccessProps {
  onClose: () => void;
}

const RefinanceModalSuccess = (props: RefinanceModalSuccessProps) => {
  return (
    <>
      <p className="bwl-modal-success-paragraph">Your loan was refinanced!</p>
      <MetaStreetButton onClick={props.onClose}>Close</MetaStreetButton>
    </>
  );
};

export const RefinanceModalSuccessAnimation = () => {
  const DASH_URL = "https://player.vimeo.com/external/759259054.mpd?s=a0fa0bffc5f73f6c4ce453cdbb907740aec3353c";
  const MP4_URL =
    "https://player.vimeo.com/progressive_redirect/playback/759259054/rendition/480p/file.mp4?loc=external&signature=d56c08ed778cc03ab127d1fb553d1a27bc6f5ba6e5cae0545810f5b00470f368";

  return <SuccessAnimation dashURL={DASH_URL} mp4URL={MP4_URL} />;
};

export default RefinanceModalSuccess;
