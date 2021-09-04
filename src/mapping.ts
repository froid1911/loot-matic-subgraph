import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Transfer
} from "../generated/Contract/Contract"
import { TokenId } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let tokenEntity = TokenId.load(event.params.tokenId.toString());
  if(tokenEntity === null) {
    // create all
    createAllEntities();
    tokenEntity = TokenId.load(event.params.tokenId.toString());
  }

  tokenEntity.owner = event.params.to;
  tokenEntity.save();
}

function createAllEntities(): void {
  for(let i=1; i<7778; i++) {
    let tokenEntity = new TokenId(i.toString());
    tokenEntity.save();
  }
}