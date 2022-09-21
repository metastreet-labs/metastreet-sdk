import classNames from "classnames";

type TokenImageProps = {
  src: string;
  className?: string;
};

const TokenImage = (props: TokenImageProps) => {
  const { src, className } = props;

  return (
    <img
      className={classNames("rounded-lg object-cover drop-shadow-msTokenImage", className)}
      src={src}
      alt="Token image"
    />
  );
};

export default TokenImage;
