import MetaStreetButton from "../../MetaStreetButton";
import useBuyWithLeverage from "../state/useBuyWithLeverage";

interface ModalSuccessProps {
  onClose: () => void;
}

const dashboardURL = "https://trades.metastreet.xyz";

const ModalSuccess = (props: ModalSuccessProps) => {
  const { tokens } = useBuyWithLeverage();

  const { collectionName, tokenID } = tokens[0];
  const count = tokens.length;

  const onClick = () => {
    window.open(dashboardURL, "_blank");
    props.onClose();
  };

  return (
    <div className="flex flex-col">
      <p className="text-center text-msTextImportant">
        You bought{" "}
        <span className="font-bold">{count == 1 ? `${collectionName} #${tokenID}` : `${count} ${collectionName}`}</span>{" "}
        with leverage. You can now track this loan in{" "}
        <a href={dashboardURL} className="font-bold" rel="noreferrer noopener" target="_blank">
          trades.metastreet.xyz
        </a>
        , the dashboard that centralizes all positions.
      </p>
      <MetaStreetButton onClick={onClick}>Check Your Positions</MetaStreetButton>
    </div>
  );
};

export default ModalSuccess;
