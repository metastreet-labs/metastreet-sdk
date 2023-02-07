# MetaStreet SDK

This SDK aims to make it easy for web apps to integrate MetaStreet leverage trading features. It’s composed of 3 packages:

- `pe-contracts-typechain`: this is a very basic package that contains MetaStreet Purchase Escrow (pe) contracts ABIs, and their corresponding typechain generated code.
- `margin-core`: this package provides functions that let you interact with MetaStreet’s PE contracts, either to send transactions or read on-chain data, which is easier than using `pe-contracts-typechain`. The package also contains functions to easily query the subgraph, as well as all the needed contract addresses and API URLs.
- `margin-kit`: this is a **React JS** package, it contains ready-to-use components that can be plugged into any React app to integrate MetaStreet’s leveraged trading features in a few lines of code. It also contains building blocks that you can use to build your own custom components.

# Demo

We built a demo app to showcase SDK features, you can check the code under [apps/test](apps/test), or visit the [hosted version](https://sdk-demo.metastreet.xyz/).
You can also see how the SDK is implemented in a full-fledged marketplace on our [PowerSweep](https://powersweep.metastreet.xyz/) ([On Görli](https://powersweep-goerli.metastreet.xyz/)) product.

# Installation

### margin-kit

1. Install the package and it's peer dependencies:
   `npm i @metastreet-labs/margin-kit ethers react react-dom @tanstack/react-query`
   or
   `yarn add @metastreet-labs/margin-kit ethers react react-dom @tanstack/react-query`
2. import the CSS file
   `import "@metastreet-labs/margin-kit/styles/default.css”`
3. wrap your React app in a `MetaStreetConfig`, passing in all the required web3 configuration.
   `MetaStreetConfig` also lets you customize the subgraph URIs. You can use the default subgraph URI for Goerli, but for mainnet, you have to either pass in your own URI, or use ours but with your API key, example:

```tsx
import "@metastreet-labs/margin-kit/styles/default.css"
import { defaultMainnetSubgraphURI, MetaStreetConfig } from "@metastreet-labs/margin-kit";

const MyApp = () => {
  // you can use defaultMainnetSubgraphURI with your own API key
  let mainnetSubgraphURI = defaultMainnetSubgraphURI("your api key");
  // or you can use your own subgraph URI
  mainnetSubgraphURI = "my subgraph uri";

  return (
    <MetaStreetConfig
      {...required web3 config}
      subgraphs={{
        mainnet: mainnetSubgraphURI,
        // the default Goerli URI should work fine, but feel free to change it if you need to
        //goerli: "",
      }}
    >
      {Your app...}
    </MetaStreetConfig>
  );
};
```

Take a look at our [DemoMetaStreetConfig](https://github.com/metastreet-labs/metastreet-sdk/blob/main/apps/test/src/components/DemoMetaStreetConfig.tsx) for an idea on how to pass the required params. It uses wagmi, but you can use whatever wallet connection library you want.

### margin-core

`npm i @metastreet-labs/margin-core`
or
`yarn add @metastreet-labs/margin-core`

### pe-contracts-typechain

`npm i @metastreet-labs/pe-contracts-typechain`
or
`yarn add @metastreet-labs/pe-contracts-typechain`

# Leveraged Trading Functionality

MetaStreet lets you **buy NFTs with leverage**, you pay a down payment and the rest is borrowed from MetaStreet vaults, then the NFT is purchased and put into MetaStreet’s escrow contracts. After that, you can either:

1. **Repay**: you repay the loan, and the NFT will be transferred to you.
2. **Refinance**: you extend the leverage (…explain more)
3. **List for Sale**: you list the NFT for sale, and when it’s sold, the loan is repaid from the purchase price, and you receive whatever’s left.

## Buy With Leverage

Users can buy one or multiple NFTs with leverage, they select the `debt amount` and `duration` of the loan, and they will be quoted a `repayment`. Once they’re happy with the loan terms, they can proceed with the purchase.

The NFTs need to be supported by Reservoir, i.e be listed in one of [Reservoir’s whitelisted marketplaces](https://docs.reservoir.tools/docs/aggregated-liquidity#ask-liquidity-listings).

`margin-kit` offers out-of-the-box React components that handle buying with leverage:

1. `BuyWithLeverageButton`: it takes an array of `BWLTokens`, and is either disabled with an error message if the passed-in tokens can’t be purchased with leverage (check the codebase to see what checks are being made), or enabled if the tokens can be purchased, in which case the passed in `onClick` callback should show the UI where the user selects the loan terms.
   The `BuyWithLeverageButton` component is styled and MetaStreet branded, if you want to customize it, you can use the `useBuyWithLeverageButton` hook. Check the code for `BuyWithLeverageButton` as an example.
2. `BuyWithLeverageModal`: it also takes an array of `BWLTokens` to be purchased, users can select the loan `debt` and `duration`, and a `repayment` will be quoted for them, using either `quoteSingleERC721` or `quoteMultipleERC721` functions from MetaStreet’s LeverageBuyWrapper contract. The modal also shows different information about the loan, which is mainly calculated from `debt`, `duration`, and `repayment`. Once the user is happy with the terms, they can hit the buy button, which will initiate the buy with leverage transaction, calling either `buySingleERC721WithETH` or `buyMultipleERC721WithETH` contract functions.
   Again, if you’re not happy with the styling of the modal, you can either try to modify the CSS file or build a completely customized component. If you chose to build it from scratch, you can use the `BuyWithLeverageProvider` component which does the heavy lifting and handles all of the state management.
3. `BuyWithLeverage`: this is just a component that wraps the above `BuyWithLeverageButton` and `BuyWithLeverageModal`.

The demo app has a fully functional Buy With Leverage implementation, [check out the code.](https://github.com/metastreet-labs/metastreet-sdk/blob/main/apps/test/src/components/BuyWithLeverageSection.tsx)

## Managing Loans

After buying an NFT with leverage, users can manage their leverage positions by interacting with MetaSreet’s LeverageBuyWrapper smart contracts.

### Fetching Loans

In order to manage loans, we first need to fetch them. That’s done using MetaStreet’s Leverage Buy Subgraph (see subgraph section). You can either:

1. Write your own GraphQL queries
2. Use the fetchers from `margin-core` if you don’t want to write GraphQL
3. Use the hooks from `margin-kit`, they work out-of-the-box for Goerli, but you’ll have to provide an API key, or a different subgraph URI for mainnet. Your custom config should be passed to `DeploymentProvider`.

The loans are represented as `LeverageBuy` objects and used as inputs for different functions, we’ll go through them in the next sections.

> PS: the subgraph also contains a LeverageBuyEvent entity, representing the different events that happened to a LeverageBuy position (refinanced, repaid, listed for sale…etc).

Check out the `PositionsSection` component of the [demo app](https://github.com/metastreet-labs/metastreet-sdk/blob/main/apps/test/src/components/PositionsSection.tsx) to see how we fetch `LeverageBuy` entities of the connected address, and display them in a table.

### Refinancing Loans

A loan can be refinanced to extend its leverage/duration, the mechanism is the same for buying with leverage, users select a new `debt` and `duration`, and a new `repayment` will be quoted for them,

`margin-kit` offers a modal component that handles refinancing out-of-the-box:

- `RefinanceModal`: it takes a `LeverageBuy` object, users can select a new `debt` and `duration`, and a new `repayment` will be quoted for them using the `quoteRefinance` contract function. The modal shows different information about the new loan, the same as with the `BuyWithLeverageModal`. Once the user is happy with the new terms, they can hit the Refinance button, triggering the refinance transaction, by calling the `refiannceETH` function from MetaStreet’s `PurchaseEscrowPlatform` contract.
  If you’re not happy with the styling of the modal, you can either try to modify the CSS file or build a completely customized component. If you chose to build it from scratch, you can use the `RefinanceProvider` component which does the heavy lifting and handles all of the state management.

Check out how the `RefinanceModal` is used inside the `LBRow` component of the [demo app](https://github.com/metastreet-labs/metastreet-sdk/blob/main/apps/test/src/components/PositionsSection.tsx)

### Listing For Sale

Users can list their loan’s underlying NFT for sale on OpenSea, and when the NFT is sold, the loan is repaid from the selling price, and users get whatever’s left. This means that users can’t list their NFTs for a price less than the loan’s repayment (plus fees and royalties).

`margin-kit` offers a modal component that handles listing for sale:

- `ListForSaleModal`: it takes a `LeverageBuy` object and a `postOrderToOpensea` callback that you have to define (more on this below), users can enter their listing price using a number input which is pre-populated with the minimum listing price. The modal also displays different information about the loan, and how much the user will gain/lose after the NFT is sold at the selected price.
  If you’re not happy with the styling of the modal, you can either try to modify the CSS file or build a completely customized component. If you chose to build it from scratch, you can use the `ListForSaleProvider` component which does the heavy lifting and handles all of the state management. - `postOrderToOpensea(order: Order)`: this is a function that you have to write, it should make a call to OpenSea API to post the order off-chain. This is necessary for the listing to be visible on OpenSea’s frontend. It should make a POST request to [this endpoint for mainnet](https://docs.opensea.io/v2.0/reference/create-an-order), or [this one for Goerli](https://docs.opensea.io/v2.0/reference/create-an-order-testnets). Check out the `NotListedLB` component of the [demo app](https://github.com/metastreet-labs/metastreet-sdk/blob/main/apps/test/src/components/PositionsSection.tsx) for an example on how to do it for Goerli.
  The reason why we didn’t handle this on the SDK is because the mainnet endpoint requires an OpenSea API key, so the request has to be done server-side.

The listing duration is set to 7 days, after that it will expire and users will have to re-list. There’s a `cancelListing` function on the `PurchaseEscrowPlatform` contract that can be used to cancel a listing before it expires, you can use the `useCancelListing` hook from `margin-kit`.

Check out the [demo app](https://github.com/metastreet-labs/metastreet-sdk/blob/main/apps/test/src/components/PositionsSection.tsx) for an example on how to list an NFT for sale (`NotListedLB` component) and how to cancel a listing (`ListedLB` component).

### Repaying

Users can choose to repay their loans, in which case the underlying NFT will be transferred to their address. This is done by calling `repayETH` on the `PurchaseEscrowPlatform` contract. You can use the `useRepayETH` hook from `margin-kit`, check out the `RepayButton` component of the [demo app](https://github.com/metastreet-labs/metastreet-sdk/blob/main/apps/test/src/components/PositionsSection.tsx) for an example.

## License

MetaStreet SDK is MIT [licensed](./LICENSE).
