// package: 
// file: protos/global.proto

import * as jspb from "google-protobuf";
import * as protos_client_pb from "../protos/client_pb";
import * as protos_room_pb from "../protos/room_pb";
import * as protos_server_pb from "../protos/server_pb";

export class Global extends jspb.Message {
  getOnline(): number;
  setOnline(value: number): void;

  getUsersMap(): jspb.Map<string, protos_client_pb.Client>;
  clearUsersMap(): void;
  getRoomsMap(): jspb.Map<string, protos_room_pb.Room>;
  clearRoomsMap(): void;
  getRoomobjectsMap(): jspb.Map<string, protos_server_pb.RoomObject>;
  clearRoomobjectsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Global.AsObject;
  static toObject(includeInstance: boolean, msg: Global): Global.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Global, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Global;
  static deserializeBinaryFromReader(message: Global, reader: jspb.BinaryReader): Global;
}

export namespace Global {
  export type AsObject = {
    online: number,
    usersMap: Array<[string, protos_client_pb.Client.AsObject]>,
    roomsMap: Array<[string, protos_room_pb.Room.AsObject]>,
    roomobjectsMap: Array<[string, protos_server_pb.RoomObject.AsObject]>,
  }
}

