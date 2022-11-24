interface Response {
  _meta: { block: { number: number } };
}

const getPayload = () => {
  const payload = {
    operationName: "BlockNumber",
    query: `
      query BlockNumber {
        _meta {
          block {
            number
          }
        }
      }
    `,
  };
  return JSON.stringify(payload);
};

export const getBlockNumber = async (subgraphURI: string): Promise<number> => {
  const response = await fetch(subgraphURI, {
    method: "POST",
    body: getPayload(),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const json = await response.json();
    const data = json.data as Response;

    if (data) return data._meta.block.number;
    throw new Error("no data found");
  } else {
    const text = await response.text();
    throw new Error(text);
  }
};
