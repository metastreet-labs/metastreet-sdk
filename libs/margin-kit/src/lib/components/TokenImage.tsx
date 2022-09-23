import classNames from "classnames";

interface TokenImageProps {
  src: string;
  className?: string;
}

const TokenImage = (props: TokenImageProps) => {
  const { src, className } = props;

  return <img className={classNames("rounded-lg object-cover drop-shadow-msTokenImage", className)} src={src} alt="" />;
};

export default TokenImage;
