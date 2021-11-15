"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_pb_1 = require("../dist/protos/client_pb");
const global_pb_1 = require("../dist/protos/global_pb");
const server_pb_1 = require("../dist/protos/server_pb");
const socket_io_1 = require("socket.io");
const contract_pb_1 = require("../dist/protos/contract_pb");
const player_1 = require("./player");
const room_pb_1 = require("../dist/protos/room_pb");
const map_1 = require("./map");
const reward_pb_1 = require("../dist/protos/reward_pb");
//// Test Data //////
const headRooms = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const testUser = {
    "user1": { password: "1234", player: { id: 123, name: "Tee", lv: "10", language: "th", diceId: 1, characterId: 1, heartValue: 1, avatar: "1", shield: 3, jailBreak: 1, stamina: 100 } },
    "user2": { password: "1234", player: { id: 325, name: "Tae", lv: "4", language: "th", diceId: 1, characterId: 2, heartValue: 1, avatar: "8", shield: 3, jailBreak: 1, stamina: 100 } },
    "user3": { password: "1234", player: { id: 191, name: "Jerry", lv: "7", language: "th", diceId: 1, characterId: 4, heartValue: 1, avatar: "2", shield: 5, jailBreak: 0, stamina: 150 } },
    "user4": { password: "1234", player: { id: 456, name: "BagIdea", lv: "99", language: "th", diceId: 1, characterId: 1, heartValue: 3, avatar: "10", shield: 5, jailBreak: 5, stamina: 250 } },
};
////////////////////
const serverData = new global_pb_1.Global();
serverData.setOnline(0);
const io = new socket_io_1.Server(6336, { cors: { origin: "*" } });
io.on('connection', (socket) => {
    serverData.setOnline(serverData.getOnline() + 1);
    //console.log(serverData.getOnline())
    socket.on('login', (req) => {
        const res = new contract_pb_1.Standard();
        res.setSuccess(false);
        try {
            const e = contract_pb_1.Login.deserializeBinary(req);
            const username = e.getUsername();
            const password = e.getPassword();
            if (!!testUser[username]) {
                if (testUser[username].password == password) {
                    if (!serverData.getUsersMap().get(socket.id)) {
                        const client = new client_pb_1.Client();
                        const db = testUser[username].player;
                        const player = (0, player_1.CreatePlayer)(db.id, db.name, db.lv, db.language, db.diceId, db.characterId, db.heartValue, db.avatar, db.shield, db.jailBreak, db.stamina);
                        client.setPlayer(player);
                        client.setRoomid("");
                        serverData.getUsersMap().set(socket.id, client);
                        res.setSuccess(true);
                        res.setText("Login complete.");
                        res.setData(player.serializeBinary());
                    }
                    else {
                        res.setText("Already login.");
                    }
                }
                else {
                    res.setText("Invalid password.");
                }
            }
            else {
                res.setText("Username not found.");
            }
        }
        catch (e) {
            res.setText("Invalid data format.");
        }
        io.to(socket.id).emit('login-response', res.serializeBinary());
    });
    socket.on('get-all', () => {
        const res = new contract_pb_1.Standard();
        res.setSuccess(true);
        res.setText("Get all complete.");
        res.setData(serverData.serializeBinary());
        io.to(socket.id).emit('get-all-response', res.serializeBinary());
    });
    socket.on('get-users', () => {
        const res = new contract_pb_1.Standard();
        const users = new client_pb_1.ClientMap();
        serverData.getUsersMap().forEach((value, key) => { users.getUsersMap().set(key, value); });
        res.setSuccess(true);
        res.setText("Get users complete.");
        res.setData(users.serializeBinary());
        io.to(socket.id).emit('get-users-response', res.serializeBinary());
    });
    socket.on('get-rooms', () => {
        const res = new contract_pb_1.Standard();
        const rooms = new room_pb_1.RoomMap();
        serverData.getRoomsMap().forEach((value, key) => { if (value.getStatus() == "public")
            rooms.getRoomsMap().set(key, value); });
        res.setSuccess(true);
        res.setText("Get rooms complete.");
        res.setData(rooms.serializeBinary());
        io.to(socket.id).emit('get-rooms-response', res.serializeBinary());
    });
    socket.on('create-room', (req) => {
        const res = new contract_pb_1.Standard();
        res.setSuccess(false);
        const client = serverData.getUsersMap().get(socket.id);
        if (!!client) {
            if (client.getRoomid() == "") {
                try {
                    const e = contract_pb_1.CreateRoom.deserializeBinary(req);
                    const roomId = headRooms[Math.floor(Math.random() * headRooms.length)] + "-" + Math.floor(Math.random() * 100000);
                    const dateTime = (new Date()).toLocaleDateString("th-TH");
                    const client = serverData.getUsersMap().get(socket.id);
                    client.setRoomid(roomId);
                    const player = client.getPlayer();
                    const hostId = player.getId();
                    const map = (0, map_1.GenerateMap)();
                    const reward = new reward_pb_1.Reward();
                    reward.setName("act");
                    reward.setPic("act");
                    reward.setValue(0.24);
                    const room = new room_pb_1.Room();
                    room.setRoomid(roomId);
                    room.getUsersMap().set(socket.id, client);
                    room.setMap(map);
                    room.setStatus(e.getStatus());
                    const roomObject = new server_pb_1.RoomObject();
                    roomObject.setRoomid(roomId);
                    roomObject.setNum(e.getNum());
                    roomObject.setDatetime(dateTime);
                    roomObject.setHost(hostId);
                    roomObject.addPlayers(player);
                    roomObject.setMap(map);
                    roomObject.addRewards(reward);
                    serverData.getUsersMap().set(socket.id, client);
                    serverData.getRoomsMap().set(roomId, room);
                    serverData.getRoomobjectsMap().set(roomId, roomObject);
                    res.setSuccess(true);
                    res.setText("Created room complete.");
                    res.setData(roomObject.serializeBinary());
                    socket.join(roomId);
                }
                catch (e) {
                    res.setText("Invalid data format.");
                }
            }
            else {
                res.setText("Create room failed, has already join room.");
            }
        }
        else {
            res.setText("Not login yet.");
        }
        io.to(socket.id).emit('create-room-response', res.serializeBinary());
    });
    socket.on('join-room', (req) => {
        const res = new contract_pb_1.Standard();
        res.setSuccess(false);
        const client = serverData.getUsersMap().get(socket.id);
        if (!!client) {
            if (client.getRoomid() == "") {
                try {
                    const e = contract_pb_1.JoinRoom.deserializeBinary(req);
                    const roomId = e.getRoomid();
                    const room = serverData.getRoomsMap().get(roomId);
                    if (!!room) {
                        client.setRoomid(roomId);
                        room.getUsersMap().set(socket.id, client);
                        serverData.getRoomsMap().set(roomId, room);
                        const roomObject = serverData.getRoomobjectsMap().get(roomId);
                        roomObject.addPlayers(client.getPlayer());
                        serverData.getUsersMap().set(socket.id, client);
                        serverData.getRoomsMap().set(roomId, room);
                        serverData.getRoomobjectsMap().set(roomId, roomObject);
                        res.setSuccess(true);
                        res.setText("Join room complete.");
                        res.setData(roomObject.serializeBinary());
                        socket.join(e.getRoomid());
                        const join = new server_pb_1.JoinAndLeaveRoom();
                        join.setPlayer(client.getPlayer());
                        io.to(roomId).emit('player-join-room', join.serializeBinary());
                    }
                    else {
                        res.setText("Join room failed, room not found.");
                    }
                }
                catch (e) {
                    res.setText("Invalid data format.");
                }
            }
            else {
                res.setText("Join room failed, has already join room.");
            }
        }
        else {
            res.setText("Not login yet.");
        }
        io.to(socket.id).emit('join-room-response', res.serializeBinary());
    });
    socket.on('matching-room', () => {
        const res = new contract_pb_1.Standard();
        res.setSuccess(false);
        const client = serverData.getUsersMap().get(socket.id);
        if (!!client) {
            if (client.getRoomid() == "") {
                const rooms = [];
                serverData.getRoomsMap().forEach((value, key) => { if (value.getStatus() == "public")
                    rooms.push(key); });
                if (rooms.length > 0) {
                    const roomId = rooms[Math.floor(Math.random() * rooms.length)];
                    const room = serverData.getRoomsMap().get(roomId);
                    client.setRoomid(roomId);
                    room.getUsersMap().set(socket.id, client);
                    serverData.getRoomsMap().set(roomId, room);
                    const roomObject = serverData.getRoomobjectsMap().get(roomId);
                    roomObject.addPlayers(client.getPlayer());
                    serverData.getUsersMap().set(socket.id, client);
                    serverData.getRoomsMap().set(roomId, room);
                    serverData.getRoomobjectsMap().set(roomId, roomObject);
                    res.setSuccess(true);
                    res.setText("matching room complete.");
                    res.setData(roomObject.serializeBinary());
                    socket.join(roomId);
                    const join = new server_pb_1.JoinAndLeaveRoom();
                    join.setPlayer(client.getPlayer());
                    io.to(roomId).emit('player-join-room', join.serializeBinary());
                }
                else {
                    res.setText("matching room failed, not has public room.");
                }
            }
            else {
                res.setText("matching room failed, has already join room.");
            }
        }
        else {
            res.setText("Not login yet.");
        }
        io.to(socket.id).emit('join-room-response', res.serializeBinary());
    });
    socket.on('leave-room', () => {
        const res = new contract_pb_1.Standard();
        res.setSuccess(false);
        if (!!serverData.getUsersMap().get(socket.id)) {
            const client = serverData.getUsersMap().get(socket.id);
            const roomId = client.getRoomid();
            const room = serverData.getRoomsMap().get(roomId);
            const leave = new server_pb_1.JoinAndLeaveRoom();
            leave.setPlayer(client.getPlayer());
            io.to(roomId).emit('player-leave-room', leave.serializeBinary());
            if (!!room) {
                if (!!room.getUsersMap().get(socket.id)) {
                    room.getUsersMap().del(socket.id);
                }
                client.setRoomid("");
                if (room.getUsersMap().getLength() == 0) {
                    serverData.getRoomsMap().del(roomId);
                    serverData.getRoomobjectsMap().del(roomId);
                }
                else {
                    serverData.getRoomsMap().set(roomId, room);
                    const roomObject = serverData.getRoomobjectsMap().get(roomId);
                    const newPlayer = roomObject.getPlayersList();
                    newPlayer.splice(newPlayer.findIndex((value) => { var _a; return value.getId() == ((_a = client.getPlayer()) === null || _a === void 0 ? void 0 : _a.getId()); }), 1);
                    roomObject.setPlayersList(newPlayer);
                    serverData.getRoomobjectsMap().set(roomId, roomObject);
                }
                serverData.getUsersMap().set(socket.id, client);
                res.setSuccess(true);
                res.setText("Leave room complete.");
                socket.leave(roomId);
            }
            else {
                res.setText("Not join room yet.");
            }
        }
        else {
            res.setText("Not login yet.");
        }
        io.to(socket.id).emit('leave-room-response', res.serializeBinary());
    });
    socket.on('send-message', (req) => {
        const res = new contract_pb_1.Standard();
        res.setSuccess(false);
        if (!!serverData.getUsersMap().get(socket.id)) {
            const client = serverData.getUsersMap().get(socket.id);
            const roomId = client.getRoomid();
            if (roomId != "") {
                try {
                    const e = contract_pb_1.SendMessage.deserializeBinary(req);
                    const receiveMsg = new server_pb_1.ReceiveMessage();
                    receiveMsg.setPlayer(client.getPlayer());
                    receiveMsg.setMsg(e.getMsg());
                    res.setSuccess(true);
                    res.setText("Receive message complete.");
                    res.setData(receiveMsg.serializeBinary());
                    io.to(roomId).emit('receive-message', res.serializeBinary());
                }
                catch (e) {
                    res.setText("Invalid data format.");
                }
            }
            else {
                res.setText("Not join room yet.");
            }
        }
        else {
            res.setText("Not login yet.");
        }
        if (!res.getSuccess())
            io.to(socket.id).emit('receive-message', res.serializeBinary());
    });
    socket.on('disconnect', () => {
        if (!!serverData.getUsersMap().get(socket.id)) {
            const client = serverData.getUsersMap().get(socket.id);
            const roomId = client.getRoomid();
            const room = serverData.getRoomsMap().get(roomId);
            const leave = new server_pb_1.JoinAndLeaveRoom();
            leave.setPlayer(client.getPlayer());
            io.to(roomId).emit('player-leave-room', leave.serializeBinary());
            if (!!room) {
                if (!!room.getUsersMap().get(socket.id)) {
                    room.getUsersMap().del(socket.id);
                }
                if (room.getUsersMap().getLength() == 0) {
                    serverData.getRoomsMap().del(roomId);
                    serverData.getRoomobjectsMap().del(roomId);
                }
                else {
                    serverData.getRoomsMap().set(roomId, room);
                    const roomObject = serverData.getRoomobjectsMap().get(roomId);
                    const newPlayer = roomObject.getPlayersList();
                    newPlayer.splice(newPlayer.findIndex((value) => { var _a; return value.getId() == ((_a = client.getPlayer()) === null || _a === void 0 ? void 0 : _a.getId()); }), 1);
                    roomObject.setPlayersList(newPlayer);
                    serverData.getRoomobjectsMap().set(roomId, roomObject);
                }
            }
            serverData.getUsersMap().del(socket.id);
        }
        serverData.setOnline(serverData.getOnline() - 1);
    });
});
