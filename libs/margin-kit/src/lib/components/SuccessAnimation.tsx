import classNames from "classnames";

interface SuccessAnimationProps {
  dashURL: string;
  mp4URL: string;
  className?: string;
}

const SuccessAnimation = (props: SuccessAnimationProps) => {
  return (
    <video autoPlay loop className={classNames("success-animation", props.className)}>
      <source src={props.dashURL} />
      <source src={props.mp4URL} />
      Your browser doesn't support the video tag
    </video>
  );
};

export default SuccessAnimation;
