// package: 
// file: protos/map.proto

import * as jspb from "google-protobuf";

export class Move extends jspb.Message {
  getFrom(): number;
  setFrom(value: number): void;

  getTo(): number;
  setTo(value: number): void;

  clearRouteList(): void;
  getRouteList(): Array<number>;
  setRouteList(value: Array<number>): void;
  addRoute(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Move.AsObject;
  static toObject(includeInstance: boolean, msg: Move): Move.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Move, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Move;
  static deserializeBinaryFromReader(message: Move, reader: jspb.BinaryReader): Move;
}

export namespace Move {
  export type AsObject = {
    from: number,
    to: number,
    routeList: Array<number>,
  }
}

export class Map extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  clearJailsList(): void;
  getJailsList(): Array<number>;
  setJailsList(value: Array<number>): void;
  addJails(value: number, index?: number): number;

  clearBossList(): void;
  getBossList(): Array<number>;
  setBossList(value: Array<number>): void;
  addBoss(value: number, index?: number): number;

  clearTreasureList(): void;
  getTreasureList(): Array<number>;
  setTreasureList(value: Array<number>): void;
  addTreasure(value: number, index?: number): number;

  clearTrapsList(): void;
  getTrapsList(): Array<number>;
  setTrapsList(value: Array<number>): void;
  addTraps(value: number, index?: number): number;

  clearMoveupList(): void;
  getMoveupList(): Array<Move>;
  setMoveupList(value: Array<Move>): void;
  addMoveup(value?: Move, index?: number): Move;

  clearMovedownList(): void;
  getMovedownList(): Array<Move>;
  setMovedownList(value: Array<Move>): void;
  addMovedown(value?: Move, index?: number): Move;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Map.AsObject;
  static toObject(includeInstance: boolean, msg: Map): Map.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Map, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Map;
  static deserializeBinaryFromReader(message: Map, reader: jspb.BinaryReader): Map;
}

export namespace Map {
  export type AsObject = {
    id: number,
    jailsList: Array<number>,
    bossList: Array<number>,
    treasureList: Array<number>,
    trapsList: Array<number>,
    moveupList: Array<Move.AsObject>,
    movedownList: Array<Move.AsObject>,
  }
}

