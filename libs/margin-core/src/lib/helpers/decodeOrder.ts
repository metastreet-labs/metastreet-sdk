import { defaultAbiCoder } from "@ethersproject/abi";

const OfferItem =
  "tuple(uint8 itemType, address token, uint256 identifierOrCriteria, uint256 startAmount, uint256 endAmount)";
const ConsiderationItem =
  "tuple(uint8 itemType, address token, uint256 identifierOrCriteria, uint256 startAmount, uint256 endAmount, address recipient)";
export const OrderComponent = [
  `tuple(
    address offerer, 
    address zone, 
    ${OfferItem}[] offer, 
    ${ConsiderationItem}[] consideration, 
    uint8 orderType, 
    uint256 startTime, 
    uint256 endTime, 
    bytes32 zoneHash, 
    uint256 salt, 
    bytes32 conduitKey, 
    uint256 counter
  )`,
];

export const decodeOrder = (codedOrder: string) => {
  return defaultAbiCoder.decode(OrderComponent, codedOrder)[0];
};
