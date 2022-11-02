export interface Offer {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
}

export interface Consideration {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient: string;
}

export interface Order {
  kind: "single-token";
  offerer: string;
  zone: string;
  zoneHash: string;
  startTime: string;
  endTime: string;
  orderType: number;
  salt: string;
  conduitKey: string;
  offer: Offer[];
  consideration: Consideration[];
  totalOriginalConsiderationItems: number;
  counter: string;
}

export const cleanupOrder = (order: Order): Order => {
  return {
    kind: "single-token",
    offerer: order.offerer,
    zone: order.zone,
    zoneHash: order.zoneHash,
    startTime: order.startTime.toString(),
    endTime: order.endTime.toString(),
    orderType: order.orderType,
    salt: order.salt.toString(),
    conduitKey: order.conduitKey,
    offer: order.offer.map((o: Offer) => ({
      itemType: o.itemType,
      token: o.token,
      identifierOrCriteria: o.identifierOrCriteria.toString(),
      startAmount: o.startAmount.toString(),
      endAmount: o.endAmount.toString(),
    })),
    consideration: order.consideration.map((c: Consideration) => ({
      itemType: c.itemType,
      token: c.token,
      identifierOrCriteria: c.identifierOrCriteria.toString(),
      startAmount: c.startAmount.toString(),
      endAmount: c.endAmount.toString(),
      recipient: c.recipient,
    })),
    totalOriginalConsiderationItems: order.consideration.length,
    counter: order.counter.toString(),
  };
};
