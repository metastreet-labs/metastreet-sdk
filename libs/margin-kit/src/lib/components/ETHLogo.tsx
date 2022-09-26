const ETHLogo = ({ className = "default-eth-logo" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 417" preserveAspectRatio="xMidYMid" className={className}>
      <path fill="#343434" d="M127.9611 0L125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32z" />
      <path fill="#8C8C8C" d="M127.962 0L0 212.32 127.962 287.959 127.962 154.158z" />
      <path
        fill="#3C3C3B"
        d="M127.9611 312.1866L126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866z"
      />
      <path fill="#8C8C8C" d="M127.962 416.9052L127.962 312.1852 0 236.5852z" />
      <path fill="#141414" d="M127.9611 287.9577L255.9211 212.3207 127.9611 154.1587z" />
      <path fill="#393939" d="M0.0009 212.3208L127.9609 287.9578 127.9609 154.1588z" />
    </svg>
  );
};

export default ETHLogo;
