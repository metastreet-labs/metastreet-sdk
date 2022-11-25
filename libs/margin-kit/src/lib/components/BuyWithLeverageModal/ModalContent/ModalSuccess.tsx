import MetaStreetButton from "../../MetaStreetButton";
import SuccessAnimation from "../../SuccessAnimation";
import { useBuyWithLeverage } from "../state/useBuyWithLeverage";

interface ModalSuccessProps {
  onClose: () => void;
  callForActionLink?: string;
}

const ModalSuccess = (props: ModalSuccessProps) => {
  const { tokens } = useBuyWithLeverage();

  const { collectionName, tokenID } = tokens[0];
  const count = tokens.length;

  const onClick = () => {
    window.open(props.callForActionLink, "_blank");
    props.onClose();
  };

  return (
    <div className="bwl-modal-success">
      <p className="bwl-modal-success-paragraph">
        Congrats! You bought{" "}
        <span className="bwl-modal-success-paragraph-strong">
          {count == 1 ? `${collectionName} #${tokenID}` : `${count} ${collectionName}`}
        </span>{" "}
        with leverage. Head to the{" "}
        <a
          href={props.callForActionLink}
          className="bwl-modal-success-paragraph-strong bwl-modal-success-paragraph-link "
          rel="noreferrer noopener"
          target="_blank"
        >
          Trades Dashboard
        </a>{" "}
        to manage your position.
      </p>
      <MetaStreetButton onClick={onClick}>Check Your Positions</MetaStreetButton>
    </div>
  );
};

export const BuyWithLeverageSuccessAnimation = () => {
  const DASH_URL = "https://player.vimeo.com/external/759253076.mpd?s=35d7c5853116455f43e689cd4026d4da50c5ac15";
  const MP4_URL =
    "https://player.vimeo.com/progressive_redirect/playback/759253076/rendition/480p/file.mp4?loc=external&signature=d6433dfe2cca7940b41c9527dce155eaa002ca5cfb2a32c7ba98c8a16218af41";
  return <SuccessAnimation dashURL={DASH_URL} mp4URL={MP4_URL} />;
};

export default ModalSuccess;
