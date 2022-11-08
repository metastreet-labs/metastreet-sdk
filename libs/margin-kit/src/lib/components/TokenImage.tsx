import classNames from "classnames";

interface TokenImageProps {
  src?: string;
  className?: string;
}

const TokenImage = (props: TokenImageProps) => {
  const { src, className } = props;

  return src ? (
    <img className={classNames("bwl-token-image", className)} src={src} alt="" />
  ) : (
    <div className={classNames("bwl-token-image bg-gray-200 animate-pulse", className)} />
  );
};

export default TokenImage;
