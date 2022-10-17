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
    <div className="bwl-modal-success">
      <p className="bwl-modal-success-paragraph">
        Congrats! You bought{" "}
        <span className="bwl-modal-success-paragraph-strong">
          {count == 1 ? `${collectionName} #${tokenID}` : `${count} ${collectionName}`}
        </span>{" "}
        with leverage. Head to the{" "}
        <a
          href={dashboardURL}
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

export default ModalSuccess;
