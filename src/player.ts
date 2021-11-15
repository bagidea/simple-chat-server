import { Player } from "../dist/protos/player_pb";

export const CreatePlayer = (id: number, name: string, lv: string, language: string, diceId: number, characterId: number, heartValue: number, avatar: string, shield: number, jailBreak: number, stamina: number): Player => {
    const player: Player = new Player();

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