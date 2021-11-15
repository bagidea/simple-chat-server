// package: 
// file: protos/player.proto

import * as jspb from "google-protobuf";

export class Player extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getLv(): string;
  setLv(value: string): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  getDiceid(): number;
  setDiceid(value: number): void;

  getCharacterid(): number;
  setCharacterid(value: number): void;

  getHeartvalue(): number;
  setHeartvalue(value: number): void;

  getAvatar(): string;
  setAvatar(value: string): void;

  getShield(): number;
  setShield(value: number): void;

  getJailbreak(): number;
  setJailbreak(value: number): void;

  getStamina(): number;
  setStamina(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Player.AsObject;
  static toObject(includeInstance: boolean, msg: Player): Player.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Player, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Player;
  static deserializeBinaryFromReader(message: Player, reader: jspb.BinaryReader): Player;
}

export namespace Player {
  export type AsObject = {
    id: number,
    name: string,
    lv: string,
    language: string,
    diceid: number,
    characterid: number,
    heartvalue: number,
    avatar: string,
    shield: number,
    jailbreak: number,
    stamina: number,
  }
}

