import classNames from "classnames";

interface TokenImageProps {
  src: string;
  className?: string;
}

const TokenImage = (props: TokenImageProps) => {
  const { src, className } = props;

  return <img className={classNames("bwl-token-image", className)} src={src} alt="" />;
};

export default TokenImage;
