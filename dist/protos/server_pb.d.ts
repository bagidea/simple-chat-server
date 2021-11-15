// package: 
// file: protos/server.proto

import * as jspb from "google-protobuf";
import * as protos_player_pb from "../protos/player_pb";
import * as protos_map_pb from "../protos/map_pb";
import * as protos_reward_pb from "../protos/reward_pb";

export class RoomObject extends jspb.Message {
  getRoomid(): string;
  setRoomid(value: string): void;

  getNum(): number;
  setNum(value: number): void;

  getDatetime(): string;
  setDatetime(value: string): void;

  getHost(): number;
  setHost(value: number): void;

  clearPlayersList(): void;
  getPlayersList(): Array<protos_player_pb.Player>;
  setPlayersList(value: Array<protos_player_pb.Player>): void;
  addPlayers(value?: protos_player_pb.Player, index?: number): protos_player_pb.Player;

  hasMap(): boolean;
  clearMap(): void;
  getMap(): protos_map_pb.Map | undefined;
  setMap(value?: protos_map_pb.Map): void;

  clearRewardsList(): void;
  getRewardsList(): Array<protos_reward_pb.Reward>;
  setRewardsList(value: Array<protos_reward_pb.Reward>): void;
  addRewards(value?: protos_reward_pb.Reward, index?: number): protos_reward_pb.Reward;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomObject.AsObject;
  static toObject(includeInstance: boolean, msg: RoomObject): RoomObject.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoomObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomObject;
  static deserializeBinaryFromReader(message: RoomObject, reader: jspb.BinaryReader): RoomObject;
}

export namespace RoomObject {
  export type AsObject = {
    roomid: string,
    num: number,
    datetime: string,
    host: number,
    playersList: Array<protos_player_pb.Player.AsObject>,
    map?: protos_map_pb.Map.AsObject,
    rewardsList: Array<protos_reward_pb.Reward.AsObject>,
  }
}

export class ReceiveMessage extends jspb.Message {
  hasPlayer(): boolean;
  clearPlayer(): void;
  getPlayer(): protos_player_pb.Player | undefined;
  setPlayer(value?: protos_player_pb.Player): void;

  getMsg(): string;
  setMsg(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReceiveMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ReceiveMessage): ReceiveMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReceiveMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReceiveMessage;
  static deserializeBinaryFromReader(message: ReceiveMessage, reader: jspb.BinaryReader): ReceiveMessage;
}

export namespace ReceiveMessage {
  export type AsObject = {
    player?: protos_player_pb.Player.AsObject,
    msg: string,
  }
}

export class JoinAndLeaveRoom extends jspb.Message {
  hasPlayer(): boolean;
  clearPlayer(): void;
  getPlayer(): protos_player_pb.Player | undefined;
  setPlayer(value?: protos_player_pb.Player): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JoinAndLeaveRoom.AsObject;
  static toObject(includeInstance: boolean, msg: JoinAndLeaveRoom): JoinAndLeaveRoom.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: JoinAndLeaveRoom, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JoinAndLeaveRoom;
  static deserializeBinaryFromReader(message: JoinAndLeaveRoom, reader: jspb.BinaryReader): JoinAndLeaveRoom;
}

export namespace JoinAndLeaveRoom {
  export type AsObject = {
    player?: protos_player_pb.Player.AsObject,
  }
}

