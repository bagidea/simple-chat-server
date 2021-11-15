// package: 
// file: protos/client.proto

import * as jspb from "google-protobuf";
import * as protos_player_pb from "../protos/player_pb";

export class Client extends jspb.Message {
  hasPlayer(): boolean;
  clearPlayer(): void;
  getPlayer(): protos_player_pb.Player | undefined;
  setPlayer(value?: protos_player_pb.Player): void;

  getRoomid(): string;
  setRoomid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Client.AsObject;
  static toObject(includeInstance: boolean, msg: Client): Client.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Client, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Client;
  static deserializeBinaryFromReader(message: Client, reader: jspb.BinaryReader): Client;
}

export namespace Client {
  export type AsObject = {
    player?: protos_player_pb.Player.AsObject,
    roomid: string,
  }
}

export class ClientMap extends jspb.Message {
  getUsersMap(): jspb.Map<string, Client>;
  clearUsersMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientMap.AsObject;
  static toObject(includeInstance: boolean, msg: ClientMap): ClientMap.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientMap, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientMap;
  static deserializeBinaryFromReader(message: ClientMap, reader: jspb.BinaryReader): ClientMap;
}

export namespace ClientMap {
  export type AsObject = {
    usersMap: Array<[string, Client.AsObject]>,
  }
}

