import { NextRequest, NextResponse } from "next/server";
const Moralis = require("moralis").default;
import fs from "fs";
import axios from "axios";

import FormData from "form-data";
// Convert the requires below to import from

import rfs from "recursive-fs";
import basePathConverter from "base-path-converter";
import got from "got";
const JWT =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmZGFlNzM5MS05OWY5LTQxMTAtOTQyNy1jMzliMzFlN2NjM2QiLCJlbWFpbCI6InhhbmRlcnBhbG1lcjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjI5ZjIwZjJmODJiNmM0OGFhZjZkIiwic2NvcGVkS2V5U2VjcmV0IjoiZTI0MmQ2Mzg1MTUyMzc4ZjBkYjk5N2FjYThiYTUzYmRhM2JjYjBhZWI5ZDQ5Mzc1ODAzOTdhNDBkYTdjMTFlYSIsImlhdCI6MTY5NTQ3MjI5OX0.jaulMnkRjwf3bq-5xJIVmH9oVs5q9GHTsdgLUqgTi28";

const alchemyApiKey = process.env.ALCHEMY_KEY;
const ensContract = process.env.ENS_CONTRACT;

const baseUrl = `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyApiKey}/getNFTs/`;

let running = false;

/**
 *
 * @param {NextRequest} request
 */
export async function GET(request) {
  if (running) {
    return new Response("Already running", { status: 200 });
  } else {
    running = true;
  }

  // const address = request.nextUrl.searchParams.get("address");

  // const alchemyResponse = {
  //   ownedNfts: [
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x0cee22926c2bb138a42940b68c9491a5c9ebb831362a25648159601118f5bc33",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "garypalmer.eth",
  //       description: "garypalmer.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x0cee22926c2bb138a42940b68c9491a5c9ebb831362a25648159601118f5bc33",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x0cee22926c2bb138a42940b68c9491a5c9ebb831362a25648159601118f5bc33",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/ccfc880970b90b39d2358b2c2d12414b",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x0cee22926c2bb138a42940b68c9491a5c9ebb831362a25648159601118f5bc33/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/garypalmer.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x0cee22926c2bb138a42940b68c9491a5c9ebb831362a25648159601118f5bc33/image",
  //         last_request_date: 1694781627459,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x0cee22926c2bb138a42940b68c9491a5c9ebb831362a25648159601118f5bc33/image",
  //         name: "garypalmer.eth",
  //         description: "garypalmer.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1494690721000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 10,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 10,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1580815153000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1998790776000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/garypalmer.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.203Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x0f15169db450d82871226d7ccc49949de9cae10f41fe31bd2fa496ddb5e99790",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "2223.eth",
  //       description: "2223.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x0f15169db450d82871226d7ccc49949de9cae10f41fe31bd2fa496ddb5e99790",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x0f15169db450d82871226d7ccc49949de9cae10f41fe31bd2fa496ddb5e99790",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/4493c5d9f13dfa32af2e9eed691895a1",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x0f15169db450d82871226d7ccc49949de9cae10f41fe31bd2fa496ddb5e99790/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/2223.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x0f15169db450d82871226d7ccc49949de9cae10f41fe31bd2fa496ddb5e99790/image",
  //         last_request_date: 1694782448561,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x0f15169db450d82871226d7ccc49949de9cae10f41fe31bd2fa496ddb5e99790/image",
  //         name: "2223.eth",
  //         description: "2223.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1650863247000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 4,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 4,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "digit",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1650863247000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1713977151000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/2223.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.204Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x1efd9a29ad5edcb114ecec2a00bba3e848ca84c69a59cd9082d5b53402225922",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "palmer.eth",
  //       description: "palmer.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x1efd9a29ad5edcb114ecec2a00bba3e848ca84c69a59cd9082d5b53402225922",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x1efd9a29ad5edcb114ecec2a00bba3e848ca84c69a59cd9082d5b53402225922",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/6e6410009d693123a00bc5eb7925d653",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x1efd9a29ad5edcb114ecec2a00bba3e848ca84c69a59cd9082d5b53402225922/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/palmer.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x1efd9a29ad5edcb114ecec2a00bba3e848ca84c69a59cd9082d5b53402225922/image",
  //         last_request_date: 1694924875293,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x1efd9a29ad5edcb114ecec2a00bba3e848ca84c69a59cd9082d5b53402225922/image",
  //         name: "palmer.eth",
  //         description: "palmer.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1569793806000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 6,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 6,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1580895795000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 2043127134000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/palmer.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.205Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x254a1825a2042f4204ad420e953f13b45f4beb8149da0deb4cd26ea9bff131d9",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "dysfunctions.eth",
  //       description: "dysfunctions.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x254a1825a2042f4204ad420e953f13b45f4beb8149da0deb4cd26ea9bff131d9",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x254a1825a2042f4204ad420e953f13b45f4beb8149da0deb4cd26ea9bff131d9",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/ce27ab72b39b97f947a331556ebf9c2f",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x254a1825a2042f4204ad420e953f13b45f4beb8149da0deb4cd26ea9bff131d9/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/dysfunctions.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x254a1825a2042f4204ad420e953f13b45f4beb8149da0deb4cd26ea9bff131d9/image",
  //         last_request_date: 1694924874257,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x254a1825a2042f4204ad420e953f13b45f4beb8149da0deb4cd26ea9bff131d9/image",
  //         name: "dysfunctions.eth",
  //         description: "dysfunctions.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1682030471000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1682030471000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1719898813000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/dysfunctions.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.205Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x3281e92cca9ca038140402fe7bde1527a0baa53e9289dcc34ab41eb4af4f3d61",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "",
  //       description: "",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x3281e92cca9ca038140402fe7bde1527a0baa53e9289dcc34ab41eb4af4f3d61",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x3281e92cca9ca038140402fe7bde1527a0baa53e9289dcc34ab41eb4af4f3d61",
  //       },
  //       media: [
  //         {
  //           gateway: "",
  //           raw: "",
  //         },
  //       ],
  //       metadata: {
  //         metadata: [],
  //         attributes: [],
  //       },
  //       timeLastUpdated: "2023-09-19T15:30:02.910Z",
  //       error:
  //         "Centralized gateway timed out, try again with a higher tokenUri timeout",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x3c18e1b3dfbb757cbde169ea44654051af58feeabc082f3ca3fffbd600bc6c8b",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "garypalmerjr.eth",
  //       description: "garypalmerjr.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x3c18e1b3dfbb757cbde169ea44654051af58feeabc082f3ca3fffbd600bc6c8b",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x3c18e1b3dfbb757cbde169ea44654051af58feeabc082f3ca3fffbd600bc6c8b",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/39f5e0bb5f863eb1acead1734956833c",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x3c18e1b3dfbb757cbde169ea44654051af58feeabc082f3ca3fffbd600bc6c8b/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/garypalmerjr.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x3c18e1b3dfbb757cbde169ea44654051af58feeabc082f3ca3fffbd600bc6c8b/image",
  //         last_request_date: 1695137329289,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x3c18e1b3dfbb757cbde169ea44654051af58feeabc082f3ca3fffbd600bc6c8b/image",
  //         name: "garypalmerjr.eth",
  //         description: "garypalmerjr.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1495596748000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1580872660000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 2451001898000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/garypalmerjr.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:54.614Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x455e6a515fdb881a900e40da714c9a592e0995781830be65b04fbfa8d04cdbcb",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "toothgrinder.eth",
  //       description: "toothgrinder.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x455e6a515fdb881a900e40da714c9a592e0995781830be65b04fbfa8d04cdbcb",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x455e6a515fdb881a900e40da714c9a592e0995781830be65b04fbfa8d04cdbcb",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/e87dc8350c39b298254b08dc60f6a109",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x455e6a515fdb881a900e40da714c9a592e0995781830be65b04fbfa8d04cdbcb/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/toothgrinder.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x455e6a515fdb881a900e40da714c9a592e0995781830be65b04fbfa8d04cdbcb/image",
  //         last_request_date: 1694924875889,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x455e6a515fdb881a900e40da714c9a592e0995781830be65b04fbfa8d04cdbcb/image",
  //         name: "toothgrinder.eth",
  //         description: "toothgrinder.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1682030639000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1682030639000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1713587591000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/toothgrinder.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.214Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x49906a5a08dcc730f88c2c4c4d622fd4f2062a31bd15a39c5475bbc3d613e9d9",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "indigarriangoats.eth",
  //       description: "indigarriangoats.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x49906a5a08dcc730f88c2c4c4d622fd4f2062a31bd15a39c5475bbc3d613e9d9",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x49906a5a08dcc730f88c2c4c4d622fd4f2062a31bd15a39c5475bbc3d613e9d9",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/d4320b30c9ed61aa1235b8baaffd2943",
  //           thumbnail:
  //             "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/d4320b30c9ed61aa1235b8baaffd2943",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x49906a5a08dcc730f88c2c4c4d622fd4f2062a31bd15a39c5475bbc3d613e9d9/image",
  //           format: "svg+xml",
  //           bytes: 101101,
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/indigarriangoats.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x49906a5a08dcc730f88c2c4c4d622fd4f2062a31bd15a39c5475bbc3d613e9d9/image",
  //         last_request_date: 1694924873737,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x49906a5a08dcc730f88c2c4c4d622fd4f2062a31bd15a39c5475bbc3d613e9d9/image",
  //         name: "indigarriangoats.eth",
  //         description: "indigarriangoats.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1682030471000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 16,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 16,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1682030471000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1719898813000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/indigarriangoats.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.204Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x5670b0f533998c62271669339e76fed714e1b834cf2619b0b4b895f2788ad360",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "goats.eth",
  //       description: "goats.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/39098013167394150048007088045603570140995038840398603170851733956577154749280",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/39098013167394150048007088045603570140995038840398603170851733956577154749280",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/c14e0f7fa84cbf12f49ee3f0f2867a8f",
  //           thumbnail:
  //             "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/c14e0f7fa84cbf12f49ee3f0f2867a8f",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5670b0f533998c62271669339e76fed714e1b834cf2619b0b4b895f2788ad360/image",
  //           format: "svg+xml",
  //           bytes: 1087242,
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/goats.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5670b0f533998c62271669339e76fed714e1b834cf2619b0b4b895f2788ad360/image",
  //         last_request_date: 1693766333262,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5670b0f533998c62271669339e76fed714e1b834cf2619b0b4b895f2788ad360/image",
  //         name: "goats.eth",
  //         description: "goats.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1575411792000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 5,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 5,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1617507049000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1838405713000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/goats.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.204Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x5a05820267621e111189e745101e1a90e9e0b7889bb6aed20171f37dad404a60",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "grandstander.eth",
  //       description: "grandstander.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5a05820267621e111189e745101e1a90e9e0b7889bb6aed20171f37dad404a60",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5a05820267621e111189e745101e1a90e9e0b7889bb6aed20171f37dad404a60",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/f6f4f88cb48e587ade1125f4cd62d492",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5a05820267621e111189e745101e1a90e9e0b7889bb6aed20171f37dad404a60/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/grandstander.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5a05820267621e111189e745101e1a90e9e0b7889bb6aed20171f37dad404a60/image",
  //         last_request_date: 1694229504710,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5a05820267621e111189e745101e1a90e9e0b7889bb6aed20171f37dad404a60/image",
  //         name: "grandstander.eth",
  //         description: "grandstander.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1694216483000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1694216483000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1852001243000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/grandstander.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.206Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x5b051bb0d63b5f70fb089c97f4460a4d65c3ebe932d95e6ab75b58e6c3a49c4e",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "toothgnasher.eth",
  //       description: "toothgnasher.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5b051bb0d63b5f70fb089c97f4460a4d65c3ebe932d95e6ab75b58e6c3a49c4e",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5b051bb0d63b5f70fb089c97f4460a4d65c3ebe932d95e6ab75b58e6c3a49c4e",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/b937c1ca2f63ce8e6c6e73dc8d781a4b",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5b051bb0d63b5f70fb089c97f4460a4d65c3ebe932d95e6ab75b58e6c3a49c4e/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/toothgnasher.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5b051bb0d63b5f70fb089c97f4460a4d65c3ebe932d95e6ab75b58e6c3a49c4e/image",
  //         last_request_date: 1694924874247,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5b051bb0d63b5f70fb089c97f4460a4d65c3ebe932d95e6ab75b58e6c3a49c4e/image",
  //         name: "toothgnasher.eth",
  //         description: "toothgnasher.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1682030639000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1682030639000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1713587591000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/toothgnasher.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.205Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x5cd5d24a8a20a66118d7ea2f362832133f1874d24585966e5f9731bb48f5be56",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "palmerjr.eth",
  //       description: "palmerjr.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5cd5d24a8a20a66118d7ea2f362832133f1874d24585966e5f9731bb48f5be56",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5cd5d24a8a20a66118d7ea2f362832133f1874d24585966e5f9731bb48f5be56",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/36695b3dc54b7dcea3edd03b501eeeef",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5cd5d24a8a20a66118d7ea2f362832133f1874d24585966e5f9731bb48f5be56/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/palmerjr.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5cd5d24a8a20a66118d7ea2f362832133f1874d24585966e5f9731bb48f5be56/image",
  //         last_request_date: 1694924874270,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5cd5d24a8a20a66118d7ea2f362832133f1874d24585966e5f9731bb48f5be56/image",
  //         name: "palmerjr.eth",
  //         description: "palmerjr.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1651335885000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 8,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 8,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1651335885000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1966905405000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/palmerjr.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.235Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x5d8474990b996aefa2de3dc6e7164ea91de68c1d2e848cc97792d1dcec11eab8",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "indigarriangoat.eth",
  //       description: "indigarriangoat.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5d8474990b996aefa2de3dc6e7164ea91de68c1d2e848cc97792d1dcec11eab8",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5d8474990b996aefa2de3dc6e7164ea91de68c1d2e848cc97792d1dcec11eab8",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/db956036249661b1056208c60489687e",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5d8474990b996aefa2de3dc6e7164ea91de68c1d2e848cc97792d1dcec11eab8/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/indigarriangoat.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5d8474990b996aefa2de3dc6e7164ea91de68c1d2e848cc97792d1dcec11eab8/image",
  //         last_request_date: 1694924875231,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x5d8474990b996aefa2de3dc6e7164ea91de68c1d2e848cc97792d1dcec11eab8/image",
  //         name: "indigarriangoat.eth",
  //         description: "indigarriangoat.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1682030471000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 15,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 15,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1682030471000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1719898813000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/indigarriangoat.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.203Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x71e909bd4ff306b51a45c7b112ef73b54d9611b2ff9c9b1b7f6077ada0357d65",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "🔵️check.eth",
  //       description: "🔵️check.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x71e909bd4ff306b51a45c7b112ef73b54d9611b2ff9c9b1b7f6077ada0357d65",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x71e909bd4ff306b51a45c7b112ef73b54d9611b2ff9c9b1b7f6077ada0357d65",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/fdf9c5b46dae9bc06d63e950d38f759c",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x71e909bd4ff306b51a45c7b112ef73b54d9611b2ff9c9b1b7f6077ada0357d65/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/🔵check.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x71e909bd4ff306b51a45c7b112ef73b54d9611b2ff9c9b1b7f6077ada0357d65/image",
  //         last_request_date: 1694924874403,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x71e909bd4ff306b51a45c7b112ef73b54d9611b2ff9c9b1b7f6077ada0357d65/image",
  //         name: "🔵️check.eth",
  //         description: "🔵️check.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1677104807000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 6,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 6,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "mixed",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1677104807000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1803332615000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/🔵check.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.211Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x73f0d4fdea6333e987545dc676deb0232baa4f2b335f1729eb18fa2bf3e8913f",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "gpjr.eth",
  //       description: "gpjr.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x73f0d4fdea6333e987545dc676deb0232baa4f2b335f1729eb18fa2bf3e8913f",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x73f0d4fdea6333e987545dc676deb0232baa4f2b335f1729eb18fa2bf3e8913f",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/c011cbfcedfa550661a45ab1da5c4d6d",
  //           thumbnail:
  //             "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/c011cbfcedfa550661a45ab1da5c4d6d",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x73f0d4fdea6333e987545dc676deb0232baa4f2b335f1729eb18fa2bf3e8913f/image",
  //           format: "svg+xml",
  //           bytes: 246125,
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/gpjr.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x73f0d4fdea6333e987545dc676deb0232baa4f2b335f1729eb18fa2bf3e8913f/image",
  //         last_request_date: 1694924873759,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x73f0d4fdea6333e987545dc676deb0232baa4f2b335f1729eb18fa2bf3e8913f/image",
  //         name: "gpjr.eth",
  //         description: "gpjr.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1663358651000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 4,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 4,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1663358651000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1726472555000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/gpjr.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.204Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x77c648c52e228f647f02d51f28a5e66749e1ad72e0e7735abbc3710b872fce01",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "grandstanders.eth",
  //       description: "grandstanders.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/54175566941939865291407468472625433874448389792677631359207825410640082619905",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/54175566941939865291407468472625433874448389792677631359207825410640082619905",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/31446b5c6381f3cdc703fd10c4187049",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x77c648c52e228f647f02d51f28a5e66749e1ad72e0e7735abbc3710b872fce01/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/grandstanders.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x77c648c52e228f647f02d51f28a5e66749e1ad72e0e7735abbc3710b872fce01/image",
  //         last_request_date: 1694238579421,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x77c648c52e228f647f02d51f28a5e66749e1ad72e0e7735abbc3710b872fce01/image",
  //         name: "grandstanders.eth",
  //         description: "grandstanders.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1694216339000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 13,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 13,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1694216339000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1852001099000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/grandstanders.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.206Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x8ca6e60cbb35d2668b27cbe1567d2879c4f4080599da22179953b837ebb6f631",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "bluecircles.eth",
  //       description: "bluecircles.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x8ca6e60cbb35d2668b27cbe1567d2879c4f4080599da22179953b837ebb6f631",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x8ca6e60cbb35d2668b27cbe1567d2879c4f4080599da22179953b837ebb6f631",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/fefa105a4237bc184d1015bd96965bb6",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x8ca6e60cbb35d2668b27cbe1567d2879c4f4080599da22179953b837ebb6f631/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/bluecircles.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x8ca6e60cbb35d2668b27cbe1567d2879c4f4080599da22179953b837ebb6f631/image",
  //         last_request_date: 1694924874247,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x8ca6e60cbb35d2668b27cbe1567d2879c4f4080599da22179953b837ebb6f631/image",
  //         name: "bluecircles.eth",
  //         description: "bluecircles.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1677116423000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 11,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 11,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1677116423000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1740230327000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/bluecircles.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.203Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x8ec23f6a405c1f8694fbd40ccbf33ddb2a5a5bd587287eb267907e29f8c87cb6",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "player223.eth",
  //       description: "player223.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/64571630503942912163907739146510693888670087737678831646480481436198716865718",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/64571630503942912163907739146510693888670087737678831646480481436198716865718",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/64d38c8e7d0270072a1c99ef47445752",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x8ec23f6a405c1f8694fbd40ccbf33ddb2a5a5bd587287eb267907e29f8c87cb6/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/player223.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x8ec23f6a405c1f8694fbd40ccbf33ddb2a5a5bd587287eb267907e29f8c87cb6/image",
  //         last_request_date: 1692882664384,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x8ec23f6a405c1f8694fbd40ccbf33ddb2a5a5bd587287eb267907e29f8c87cb6/image",
  //         name: "player223.eth",
  //         description: "player223.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1667278895000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 9,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 9,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "alphanumeric",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1667278895000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1698835847000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/player223.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.207Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x94585b5db13eb494c366a883d323f18620741174cbb49fd8f8efb1cfa394dbea",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "garyjr.eth",
  //       description: "garyjr.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x94585b5db13eb494c366a883d323f18620741174cbb49fd8f8efb1cfa394dbea",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x94585b5db13eb494c366a883d323f18620741174cbb49fd8f8efb1cfa394dbea",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/748671bffb2f9a4cb4a50362ef09e3a2",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x94585b5db13eb494c366a883d323f18620741174cbb49fd8f8efb1cfa394dbea/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/garyjr.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x94585b5db13eb494c366a883d323f18620741174cbb49fd8f8efb1cfa394dbea/image",
  //         last_request_date: 1693766334780,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x94585b5db13eb494c366a883d323f18620741174cbb49fd8f8efb1cfa394dbea/image",
  //         name: "garyjr.eth",
  //         description: "garyjr.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1646882379000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 6,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 6,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1646882379000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1741553235000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/garyjr.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.207Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x9567fb0feb0a566b0ec0d4040ccad782b8a06707ced86df95708f990a86e5634",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "burnisland.eth",
  //       description: "burnisland.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/67578332454063751064530304675475973537388097949492369746021029083993781196340",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/67578332454063751064530304675475973537388097949492369746021029083993781196340",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/22cd1e05b1decd755cf219e55e923afe",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x9567fb0feb0a566b0ec0d4040ccad782b8a06707ced86df95708f990a86e5634/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/burnisland.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x9567fb0feb0a566b0ec0d4040ccad782b8a06707ced86df95708f990a86e5634/image",
  //         last_request_date: 1692886308974,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x9567fb0feb0a566b0ec0d4040ccad782b8a06707ced86df95708f990a86e5634/image",
  //         name: "burnisland.eth",
  //         description: "burnisland.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1676504111000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 10,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 10,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1676504111000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1739618015000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/burnisland.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.206Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x96d023449b65ce72a578dd57282cb199adae9ead07b7e33bc252df2971c36c71",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "bayc3636.eth",
  //       description: "bayc3636.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x96d023449b65ce72a578dd57282cb199adae9ead07b7e33bc252df2971c36c71",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x96d023449b65ce72a578dd57282cb199adae9ead07b7e33bc252df2971c36c71",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/9ac970180c734725e0dc411b6a86617e",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x96d023449b65ce72a578dd57282cb199adae9ead07b7e33bc252df2971c36c71/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/bayc3636.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x96d023449b65ce72a578dd57282cb199adae9ead07b7e33bc252df2971c36c71/image",
  //         last_request_date: 1694924873759,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x96d023449b65ce72a578dd57282cb199adae9ead07b7e33bc252df2971c36c71/image",
  //         name: "bayc3636.eth",
  //         description: "bayc3636.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1626981754000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 8,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 8,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "alphanumeric",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1626981754000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1942551274000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/bayc3636.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.207Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0x974df484aaaaa5e2805313946d9d86c56224ae6847dd22be866af4ea6d190d1c",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "",
  //       description: "",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x974df484aaaaa5e2805313946d9d86c56224ae6847dd22be866af4ea6d190d1c",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x974df484aaaaa5e2805313946d9d86c56224ae6847dd22be866af4ea6d190d1c",
  //       },
  //       media: [
  //         {
  //           gateway: "",
  //           raw: "",
  //         },
  //       ],
  //       metadata: {
  //         metadata: [],
  //         attributes: [],
  //       },
  //       timeLastUpdated: "2023-09-19T15:30:01.472Z",
  //       error: "Token uri responded with a non 200 response code",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0xaa495c3b2d5ca19572fd34d5cd6c4163de55cd8db6ee3ba5873ff9c06f3a2e60",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "thegreatgary.eth",
  //       description: "thegreatgary.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/77022800650962025558317149463466663415823607737703343832325664119236670926432",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/77022800650962025558317149463466663415823607737703343832325664119236670926432",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/44a68ff9b9e62ed2bfd6606df13b4696",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xaa495c3b2d5ca19572fd34d5cd6c4163de55cd8db6ee3ba5873ff9c06f3a2e60/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/thegreatgary.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xaa495c3b2d5ca19572fd34d5cd6c4163de55cd8db6ee3ba5873ff9c06f3a2e60/image",
  //         last_request_date: 1694794855057,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xaa495c3b2d5ca19572fd34d5cd6c4163de55cd8db6ee3ba5873ff9c06f3a2e60/image",
  //         name: "thegreatgary.eth",
  //         description: "thegreatgary.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1694214899000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1694214899000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1851999659000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/thegreatgary.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.205Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0xab22e814435b3b46c35c26fcd1e9e703218a16bcf9706a0a4d8cf2a3c622579b",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "garypalmerjunior.eth",
  //       description: "garypalmerjunior.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xab22e814435b3b46c35c26fcd1e9e703218a16bcf9706a0a4d8cf2a3c622579b",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xab22e814435b3b46c35c26fcd1e9e703218a16bcf9706a0a4d8cf2a3c622579b",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/a03618a9805c668a2fcda48731b1a9f3",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xab22e814435b3b46c35c26fcd1e9e703218a16bcf9706a0a4d8cf2a3c622579b/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/garypalmerjunior.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xab22e814435b3b46c35c26fcd1e9e703218a16bcf9706a0a4d8cf2a3c622579b/image",
  //         last_request_date: 1694924874247,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xab22e814435b3b46c35c26fcd1e9e703218a16bcf9706a0a4d8cf2a3c622579b/image",
  //         name: "garypalmerjunior.eth",
  //         description: "garypalmerjunior.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1657748915000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 16,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 16,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1657748915000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1689305867000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/garypalmerjunior.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.209Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0xac2ac05d93981843f4312ca973635c8233af886c4c6f9fdfa0bfb3c754effb83",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "🔵️badge.eth",
  //       description: "🔵️badge.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xac2ac05d93981843f4312ca973635c8233af886c4c6f9fdfa0bfb3c754effb83",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xac2ac05d93981843f4312ca973635c8233af886c4c6f9fdfa0bfb3c754effb83",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/d67d71e2dd33505b44f5e479b125b436",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xac2ac05d93981843f4312ca973635c8233af886c4c6f9fdfa0bfb3c754effb83/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/🔵badge.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xac2ac05d93981843f4312ca973635c8233af886c4c6f9fdfa0bfb3c754effb83/image",
  //         last_request_date: 1694924873985,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xac2ac05d93981843f4312ca973635c8233af886c4c6f9fdfa0bfb3c754effb83/image",
  //         name: "🔵️badge.eth",
  //         description: "🔵️badge.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1677104891000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 6,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 6,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "mixed",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1677104891000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1771775747000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/🔵badge.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.206Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0xb4945a56db11dc8266a60c36fe54a6ad88b8a6110b9ae82bdd9822d4799a6b12",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "preschooler.eth",
  //       description: "preschooler.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/81678429609372514928365106858422568725939309830357785090012916192805601831698",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/81678429609372514928365106858422568725939309830357785090012916192805601831698",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/1f4b96c159a6e646b5e66b8559944354",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xb4945a56db11dc8266a60c36fe54a6ad88b8a6110b9ae82bdd9822d4799a6b12/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/preschooler.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xb4945a56db11dc8266a60c36fe54a6ad88b8a6110b9ae82bdd9822d4799a6b12/image",
  //         last_request_date: 1693999220773,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xb4945a56db11dc8266a60c36fe54a6ad88b8a6110b9ae82bdd9822d4799a6b12/image",
  //         name: "preschooler.eth",
  //         description: "preschooler.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1656122712000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 11,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 11,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1675360991000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1738474895000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/preschooler.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.205Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0xc525ff95c864279e92eb2baa48aaed9cba2db1dd74e36fead2e3be0bd9f10639",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "ethgary.eth",
  //       description: "ethgary.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xc525ff95c864279e92eb2baa48aaed9cba2db1dd74e36fead2e3be0bd9f10639",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xc525ff95c864279e92eb2baa48aaed9cba2db1dd74e36fead2e3be0bd9f10639",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/2c6b719fc3bc19bb2e8b199052626f3f",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xc525ff95c864279e92eb2baa48aaed9cba2db1dd74e36fead2e3be0bd9f10639/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/ethgary.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xc525ff95c864279e92eb2baa48aaed9cba2db1dd74e36fead2e3be0bd9f10639/image",
  //         last_request_date: 1694924875744,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xc525ff95c864279e92eb2baa48aaed9cba2db1dd74e36fead2e3be0bd9f10639/image",
  //         name: "ethgary.eth",
  //         description: "ethgary.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1669598051000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 7,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 7,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1669598051000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1701155003000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/ethgary.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.203Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0xd59a9b25ef95ef6d735c974233e2fa2a495dae2d3eb679548e26b5f86c108a63",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "22068.eth",
  //       description: "22068.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xd59a9b25ef95ef6d735c974233e2fa2a495dae2d3eb679548e26b5f86c108a63",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xd59a9b25ef95ef6d735c974233e2fa2a495dae2d3eb679548e26b5f86c108a63",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/59e40bb3026dbae1f339f0050171468e",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xd59a9b25ef95ef6d735c974233e2fa2a495dae2d3eb679548e26b5f86c108a63/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/22068.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xd59a9b25ef95ef6d735c974233e2fa2a495dae2d3eb679548e26b5f86c108a63/image",
  //         last_request_date: 1694924874246,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xd59a9b25ef95ef6d735c974233e2fa2a495dae2d3eb679548e26b5f86c108a63/image",
  //         name: "22068.eth",
  //         description: "22068.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1651436199000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 5,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 5,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "digit",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1651436199000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1967005719000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/22068.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.207Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0xe2b5812651fdae32cafcf7878c0be86bbd5c6efcaefc7066fb32d2d489fc8ee2",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "hotdogcannon.eth",
  //       description: "hotdogcannon.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe2b5812651fdae32cafcf7878c0be86bbd5c6efcaefc7066fb32d2d489fc8ee2",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe2b5812651fdae32cafcf7878c0be86bbd5c6efcaefc7066fb32d2d489fc8ee2",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/2587a28d4ac9e720d4e7fbf0fdfe8ed8",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe2b5812651fdae32cafcf7878c0be86bbd5c6efcaefc7066fb32d2d489fc8ee2/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/hotdogcannon.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe2b5812651fdae32cafcf7878c0be86bbd5c6efcaefc7066fb32d2d489fc8ee2/image",
  //         last_request_date: 1694924874405,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe2b5812651fdae32cafcf7878c0be86bbd5c6efcaefc7066fb32d2d489fc8ee2/image",
  //         name: "hotdogcannon.eth",
  //         description: "hotdogcannon.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1682030471000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 12,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1682030471000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1719898813000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/hotdogcannon.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.208Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0xe9ca15c3ef52e7b543559992118e3c91b82bd8cd63665b94c9fff6318c5c088e",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "bluebadges.eth",
  //       description: "bluebadges.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe9ca15c3ef52e7b543559992118e3c91b82bd8cd63665b94c9fff6318c5c088e",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe9ca15c3ef52e7b543559992118e3c91b82bd8cd63665b94c9fff6318c5c088e",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/ec76bfac7d8e665f908d4bfb8d5482e4",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe9ca15c3ef52e7b543559992118e3c91b82bd8cd63665b94c9fff6318c5c088e/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/bluebadges.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe9ca15c3ef52e7b543559992118e3c91b82bd8cd63665b94c9fff6318c5c088e/image",
  //         last_request_date: 1694264207204,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe9ca15c3ef52e7b543559992118e3c91b82bd8cd63665b94c9fff6318c5c088e/image",
  //         name: "bluebadges.eth",
  //         description: "bluebadges.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1677116519000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 10,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 10,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1677116519000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1740230423000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/bluebadges.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.209Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //     {
  //       contract: {
  //         address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //       },
  //       id: {
  //         tokenId:
  //           "0xf71854bebbc331d48707d8a409409bf7796f3135e1be61e9fadf7064b538c8f0",
  //         tokenMetadata: {
  //           tokenType: "ERC721",
  //         },
  //       },
  //       balance: "1",
  //       title: "hotdogcannons.eth",
  //       description: "hotdogcannons.eth, an ENS name.",
  //       tokenUri: {
  //         gateway:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xf71854bebbc331d48707d8a409409bf7796f3135e1be61e9fadf7064b538c8f0",
  //         raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xf71854bebbc331d48707d8a409409bf7796f3135e1be61e9fadf7064b538c8f0",
  //       },
  //       media: [
  //         {
  //           gateway:
  //             "https://nft-cdn.alchemy.com/eth-mainnet/984b87ca06e3a4d4d2c108cf96f7ac52",
  //           raw: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xf71854bebbc331d48707d8a409409bf7796f3135e1be61e9fadf7064b538c8f0/image",
  //           format: "svg+xml",
  //         },
  //       ],
  //       metadata: {
  //         background_image:
  //           "https://metadata.ens.domains/mainnet/avatar/hotdogcannons.eth",
  //         image:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xf71854bebbc331d48707d8a409409bf7796f3135e1be61e9fadf7064b538c8f0/image",
  //         last_request_date: 1694924875755,
  //         is_normalized: true,
  //         image_url:
  //           "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xf71854bebbc331d48707d8a409409bf7796f3135e1be61e9fadf7064b538c8f0/image",
  //         name: "hotdogcannons.eth",
  //         description: "hotdogcannons.eth, an ENS name.",
  //         attributes: [
  //           {
  //             display_type: "date",
  //             value: 1682030471000,
  //             trait_type: "Created Date",
  //           },
  //           {
  //             display_type: "number",
  //             value: 13,
  //             trait_type: "Length",
  //           },
  //           {
  //             display_type: "number",
  //             value: 13,
  //             trait_type: "Segment Length",
  //           },
  //           {
  //             display_type: "string",
  //             value: "letter",
  //             trait_type: "Character Set",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1682030471000,
  //             trait_type: "Registration Date",
  //           },
  //           {
  //             display_type: "date",
  //             value: 1719898813000,
  //             trait_type: "Expiration Date",
  //           },
  //         ],
  //         version: 0,
  //         url: "https://app.ens.domains/name/hotdogcannons.eth",
  //       },
  //       timeLastUpdated: "2023-09-19T15:28:49.205Z",
  //       contractMetadata: {
  //         tokenType: "ERC721",
  //         contractDeployer: "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
  //         deployedBlockNumber: 9380410,
  //         openSea: {
  //           floorPrice: 0.001,
  //           collectionName: "ENS: Ethereum Name Service",
  //           collectionSlug: "ens",
  //           safelistRequestStatus: "verified",
  //           imageUrl:
  //             "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
  //           description:
  //             "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
  //           externalUrl: "https://ens.domains",
  //           twitterUsername: "ensdomains",
  //           lastIngestedAt: "2023-09-18T10:20:40.000Z",
  //         },
  //       },
  //     },
  //   ],
  // };

  // // await axios({
  // //   method: "get",
  // //   url: `${baseUrl}?owner=${address}&contractAddresses[]=${ensContract}`,
  // // });

  // const data = alchemyResponse.ownedNfts
  //   .map((nft) => {
  //     if (nft.title) {
  //       return {
  //         name: nft.title,
  //         image: nft.metadata.image_url,
  //       };
  //     }
  //   })
  //   .filter((nft) => nft);

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const src = "./webpage";
  var status = 0;
  try {
    const { dirs, files } = await rfs.read(src);
    let data = new FormData();
    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }
    const response = await got(url, {
      method: "POST",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization: JWT,
      },
      body: data,
    }).on("uploadProgress", (progress) => {
      console.log(progress);
    });
    console.log(JSON.parse(response.body));

    running = false;
    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

/**
 *
 * @param {NextRequest} request
 */
export async function POST(request) {
  // const url = request.nextUrl.searchParams.get("url");

  // await fs.writeFileSync(
  //   "redirect.html",
  //   `<meta http-equiv="refresh" content="0; url=${url}" />`
  // );

  const fileUploads = [
    {
      path: "redirect.html",
      content: fs.readFileSync("./redirect.html", { encoding: "base64" }),
    },
  ];

  await Moralis.start({
    apiKey: "",
  });
  const res = await Moralis.EvmApi.ipfs.uploadFolder({
    abi: fileUploads,
  });

  const get = await Moralis.EvmApi.ipfs.console.log(res.result);

  return NextResponse.json({ url });
}
