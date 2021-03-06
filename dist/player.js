"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlayer = void 0;
const player_pb_1 = require("../dist/protos/player_pb");
const CreatePlayer = (id, name, lv, language, diceId, characterId, heartValue, avatar, shield, jailBreak, stamina) => {
    const player = new player_pb_1.Player();
    player.setId(id);
    player.setName(name);
    player.setLv(lv);
    player.setLanguage(language);
    player.setDiceid(diceId);
    player.setCharacterid(characterId);
    player.setHeartvalue(heartValue);
    player.setAvatar(avatar);
    player.setShield(shield);
    player.setJailbreak(jailBreak);
    player.setStamina(stamina);
    return player;
};
exports.CreatePlayer = CreatePlayer;
