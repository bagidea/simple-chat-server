// package: 
// file: protos/contract.proto

import * as jspb from "google-protobuf";

export class Standard extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getText(): string;
  setText(value: string): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Standard.AsObject;
  static toObject(includeInstance: boolean, msg: Standard): Standard.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Standard, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Standard;
  static deserializeBinaryFromReader(message: Standard, reader: jspb.BinaryReader): Standard;
}

export namespace Standard {
  export type AsObject = {
    success: boolean,
    text: string,
    data: Uint8Array | string,
  }
}

export class Login extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Login.AsObject;
  static toObject(includeInstance: boolean, msg: Login): Login.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Login, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Login;
  static deserializeBinaryFromReader(message: Login, reader: jspb.BinaryReader): Login;
}

export namespace Login {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class CreateRoom extends jspb.Message {
  getNum(): number;
  setNum(value: number): void;

  getStatus(): string;
  setStatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRoom.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRoom): CreateRoom.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRoom, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRoom;
  static deserializeBinaryFromReader(message: CreateRoom, reader: jspb.BinaryReader): CreateRoom;
}

export namespace CreateRoom {
  export type AsObject = {
    num: number,
    status: string,
  }
}

export class JoinRoom extends jspb.Message {
  getRoomid(): string;
  setRoomid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JoinRoom.AsObject;
  static toObject(includeInstance: boolean, msg: JoinRoom): JoinRoom.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: JoinRoom, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JoinRoom;
  static deserializeBinaryFromReader(message: JoinRoom, reader: jspb.BinaryReader): JoinRoom;
}

export namespace JoinRoom {
  export type AsObject = {
    roomid: string,
  }
}

export class SendMessage extends jspb.Message {
  getMsg(): string;
  setMsg(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessage): SendMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessage;
  static deserializeBinaryFromReader(message: SendMessage, reader: jspb.BinaryReader): SendMessage;
}

export namespace SendMessage {
  export type AsObject = {
    msg: string,
  }
}

