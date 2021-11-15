// package: 
// file: protos/room.proto

import * as jspb from "google-protobuf";
import * as protos_client_pb from "../protos/client_pb";
import * as protos_map_pb from "../protos/map_pb";

export class Room extends jspb.Message {
  getRoomid(): string;
  setRoomid(value: string): void;

  getUsersMap(): jspb.Map<string, protos_client_pb.Client>;
  clearUsersMap(): void;
  hasMap(): boolean;
  clearMap(): void;
  getMap(): protos_map_pb.Map | undefined;
  setMap(value?: protos_map_pb.Map): void;

  getStatus(): string;
  setStatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Room.AsObject;
  static toObject(includeInstance: boolean, msg: Room): Room.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Room, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Room;
  static deserializeBinaryFromReader(message: Room, reader: jspb.BinaryReader): Room;
}

export namespace Room {
  export type AsObject = {
    roomid: string,
    usersMap: Array<[string, protos_client_pb.Client.AsObject]>,
    map?: protos_map_pb.Map.AsObject,
    status: string,
  }
}

export class RoomMap extends jspb.Message {
  getRoomsMap(): jspb.Map<string, Room>;
  clearRoomsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomMap.AsObject;
  static toObject(includeInstance: boolean, msg: RoomMap): RoomMap.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoomMap, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomMap;
  static deserializeBinaryFromReader(message: RoomMap, reader: jspb.BinaryReader): RoomMap;
}

export namespace RoomMap {
  export type AsObject = {
    roomsMap: Array<[string, Room.AsObject]>,
  }
}

