// Version 01 schema

export type Multihash = string;
export type HashPointer = string;
export type Uid = string;
export type Datetime = string;

// Block schema
export interface Block {
  sequence: number; // 0-indexed
  // The ISO 8601-formatted datetime at which the earliest version of this block was created.
  origin_created: Datetime; // new
  version: 1;
  // Points to the same block in the previous version of the blockchain.
  prev_version_hash?: HashPointer; // new
  // Points to the previous block in the blockchain. null for first block.
  prev_hash: HashPointer | null;
  // Operations contained in the block.
  operations: Operation[];
}

// Operation schema

export enum OperationTypes {
  REQUEST_INVITE = "REQUEST_INVITE",
  TRUST = "TRUST"
}

interface OperationBase {
  sequence: number; // 0-indexed
  creator_uid: Uid; // new
}

// Data objects

// new
export interface RequestInviteData {
  full_name: string;
  // Uid of user requesting invite from.
  to_uid: Uid;
  // Multihash of invite video.
  video_multihash: Multihash;
}

// new
export interface TrustData {
  // Uid of user to trust.
  to_uid: Uid;
}

export type RequestInviteOperation = OperationBase & {
  op_code: OperationTypes.REQUEST_INVITE;
  data: RequestInviteData;
};

export type TrustOperation = OperationBase & {
  op_code: OperationTypes.TRUST;
  data: TrustData;
};

export type Operation = RequestInviteOperation | TrustOperation;
