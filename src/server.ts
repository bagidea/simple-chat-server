import { Client, ClientMap } from '../dist/protos/client_pb'
import { Global } from '../dist/protos/global_pb'
import { JoinAndLeaveRoom, ReceiveMessage, RoomObject } from '../dist/protos/server_pb'
import { Server, Socket } from 'socket.io'
import { Standard, Login, CreateRoom, JoinRoom, SendMessage } from '../dist/protos/contract_pb'
import { CreatePlayer } from './player'
import { Player } from '../dist/protos/player_pb'
import { Room, RoomMap } from '../dist/protos/room_pb'
import { Map } from '../dist/protos/map_pb'
import { GenerateMap } from './map'
import { Reward } from '../dist/protos/reward_pb'

//// Test Data //////
const headRooms: string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

interface TestUserPlayer {
    id: number,
    name: string,
    lv: string,
    language: string,
    diceId: number,
    characterId: number,
    heartValue: number,
    avatar: string,
    shield: number,
    jailBreak: number,
    stamina: number
}

interface TestUserData {
    password: string,
    player: TestUserPlayer
}

interface TestUser {
    [id: string]: TestUserData
}

const testUser: TestUser = {
    "user1": { password: "1234", player: { id: 123, name: "Tee", lv: "10", language: "th", diceId: 1, characterId: 1, heartValue: 1, avatar: "1", shield: 3, jailBreak: 1, stamina: 100 } },
    "user2": { password: "1234", player: { id: 325, name: "Tae", lv: "4", language: "th", diceId: 1, characterId: 2, heartValue: 1, avatar: "8", shield: 3, jailBreak: 1, stamina: 100 } },
    "user3": { password: "1234", player: { id: 191, name: "Jerry", lv: "7", language: "th", diceId: 1, characterId: 4, heartValue: 1, avatar: "2", shield: 5, jailBreak: 0, stamina: 150 } },
    "user4": { password: "1234", player: { id: 456, name: "BagIdea", lv: "99", language: "th", diceId: 1, characterId: 1, heartValue: 3, avatar: "10", shield: 5, jailBreak: 5, stamina: 250 } },
}
////////////////////

const serverData: Global = new Global()
serverData.setOnline(0)

const io: Server = new Server(6336, { cors: { origin: "*" } })

io.on('connection', (socket: Socket) => {
    serverData.setOnline(serverData.getOnline()+1)
    //console.log(serverData.getOnline())

    socket.on('login', (req: Uint8Array) => {
        const res: Standard = new Standard()
        res.setSuccess(false)

        try {
            const e: Login = Login.deserializeBinary(req)

            const username: string = e.getUsername()
            const password: string = e.getPassword()

            if(!!testUser[username]) {
                if(testUser[username].password == password) {
                    if(!serverData.getUsersMap().get(socket.id)) {
                        const client: Client = new Client()
                        const db: any = testUser[username].player
                        const player: Player = CreatePlayer(db.id, db.name, db.lv, db.language, db.diceId, db.characterId, db.heartValue, db.avatar, db.shield, db.jailBreak, db.stamina)

                        client.setPlayer(player)
                        client.setRoomid("")

                        serverData.getUsersMap().set(socket.id, client)

                        res.setSuccess(true)
                        res.setText("Login complete.")
                        res.setData(player.serializeBinary())

                    } else { res.setText("Already login.") }
                } else { res.setText("Invalid password.") }
            } else { res.setText("Username not found.") }
        } catch(e) { res.setText("Invalid data format.") }

        io.to(socket.id).emit('login-response', res.serializeBinary())
    })

    socket.on('get-all', () => {
        const res: Standard = new Standard()

        res.setSuccess(true)
        res.setText("Get all complete.")
        res.setData(serverData.serializeBinary())

        io.to(socket.id).emit('get-all-response', res.serializeBinary())
    })

    socket.on('get-users', () => {
        const res: Standard = new Standard()

        const users: ClientMap = new ClientMap()
        serverData.getUsersMap().forEach((value: Client, key: string) => { users.getUsersMap().set(key, value) })

        res.setSuccess(true)
        res.setText("Get users complete.")
        res.setData(users.serializeBinary())

        io.to(socket.id).emit('get-users-response', res.serializeBinary())
    })

    socket.on('get-rooms', () => {
        const res: Standard = new Standard()

        const rooms: RoomMap = new RoomMap()
        serverData.getRoomsMap().forEach((value: Room, key: string) => { if(value.getStatus() == "public") rooms.getRoomsMap().set(key, value) })

        res.setSuccess(true)
        res.setText("Get rooms complete.")
        res.setData(rooms.serializeBinary())

        io.to(socket.id).emit('get-rooms-response', res.serializeBinary())
    })

    socket.on('create-room', (req: Uint8Array) => {
        const res: Standard = new Standard()
        res.setSuccess(false)

        const client: Client = serverData.getUsersMap().get(socket.id)

        if(!!client) {
            if(client.getRoomid() == "") {
                try {
                    const e: CreateRoom = CreateRoom.deserializeBinary(req)
                    const roomId: string = headRooms[Math.floor(Math.random()*headRooms.length)]+"-"+Math.floor(Math.random()*100000)
                    const dateTime: string = (new Date()).toLocaleDateString("th-TH")

                    const client: Client = serverData.getUsersMap().get(socket.id)
                    client.setRoomid(roomId)
                    const player: Player = client.getPlayer() as Player
                    const hostId: number = player.getId()

                    const map: Map = GenerateMap()

                    const reward: Reward = new Reward()
                    reward.setName("act")
                    reward.setPic("act")
                    reward.setValue(0.24)

                    const room: Room = new Room()
                    room.setRoomid(roomId)
                    room.getUsersMap().set(socket.id, client)
                    room.setMap(map)
                    room.setStatus(e.getStatus())

                    const roomObject: RoomObject = new RoomObject()

                    roomObject.setRoomid(roomId)
                    roomObject.setNum(e.getNum())
                    roomObject.setDatetime(dateTime)
                    roomObject.setHost(hostId)
                    roomObject.addPlayers(player)
                    roomObject.setMap(map)
                    roomObject.addRewards(reward)

                    serverData.getUsersMap().set(socket.id, client)
                    serverData.getRoomsMap().set(roomId, room)
                    serverData.getRoomobjectsMap().set(roomId, roomObject)

                    res.setSuccess(true)
                    res.setText("Created room complete.")
                    res.setData(roomObject.serializeBinary())

                    socket.join(roomId)

                } catch (e) { res.setText("Invalid data format.") }
            } else { res.setText("Create room failed, has already join room.") }
        } else { res.setText("Not login yet.") }

        io.to(socket.id).emit('create-room-response', res.serializeBinary())
    })

    socket.on('join-room', (req: Uint8Array) => {
        const res: Standard = new Standard()
        res.setSuccess(false)

        const client: Client = serverData.getUsersMap().get(socket.id)

        if(!!client) {
            if(client.getRoomid() == "") {
                try {
                    const e: JoinRoom = JoinRoom.deserializeBinary(req)
                    const roomId: string = e.getRoomid()
                    const room: Room = serverData.getRoomsMap().get(roomId)

                    if(!!room) {
                        client.setRoomid(roomId)
                        room.getUsersMap().set(socket.id, client)
                        serverData.getRoomsMap().set(roomId, room)

                        const roomObject: RoomObject = serverData.getRoomobjectsMap().get(roomId)

                        roomObject.addPlayers(client.getPlayer())

                        serverData.getUsersMap().set(socket.id, client)
                        serverData.getRoomsMap().set(roomId, room)
                        serverData.getRoomobjectsMap().set(roomId, roomObject)

                        res.setSuccess(true)
                        res.setText("Join room complete.")
                        res.setData(roomObject.serializeBinary())

                        socket.join(e.getRoomid())

                        const join: JoinAndLeaveRoom = new JoinAndLeaveRoom()
                        join.setPlayer(client.getPlayer())
                        io.to(roomId).emit('player-join-room', join.serializeBinary())

                    } else { res.setText("Join room failed, room not found.") }
                } catch (e) { res.setText("Invalid data format.") }
            } else { res.setText("Join room failed, has already join room.") }
        } else { res.setText("Not login yet.") }

        io.to(socket.id).emit('join-room-response', res.serializeBinary())
    })

    socket.on('matching-room', () => {
        const res: Standard = new Standard()
        res.setSuccess(false)

        const client: Client = serverData.getUsersMap().get(socket.id)

        if(!!client) {
            if(client.getRoomid() == "") {
                const rooms: string[] = []
                serverData.getRoomsMap().forEach((value: Room, key: string) => { if(value.getStatus() == "public") rooms.push(key) })
                if(rooms.length > 0) {
                    const roomId: string = rooms[Math.floor(Math.random()*rooms.length)]
                    const room: Room = serverData.getRoomsMap().get(roomId)

                    client.setRoomid(roomId)
                    room.getUsersMap().set(socket.id, client)
                    serverData.getRoomsMap().set(roomId, room)

                    const roomObject: RoomObject = serverData.getRoomobjectsMap().get(roomId)

                    roomObject.addPlayers(client.getPlayer())

                    serverData.getUsersMap().set(socket.id, client)
                    serverData.getRoomsMap().set(roomId, room)
                    serverData.getRoomobjectsMap().set(roomId, roomObject)

                    res.setSuccess(true)
                    res.setText("matching room complete.")
                    res.setData(roomObject.serializeBinary())

                    socket.join(roomId)

                    const join: JoinAndLeaveRoom = new JoinAndLeaveRoom()
                    join.setPlayer(client.getPlayer())
                    io.to(roomId).emit('player-join-room', join.serializeBinary())

                } else { res.setText("matching room failed, not has public room.") }
            } else { res.setText("matching room failed, has already join room.") }
        } else { res.setText("Not login yet.") }

        io.to(socket.id).emit('join-room-response', res.serializeBinary())
    })

    socket.on('leave-room', () => {
        const res: Standard = new Standard()
        res.setSuccess(false)

        if(!!serverData.getUsersMap().get(socket.id)) {
            const client: Client = serverData.getUsersMap().get(socket.id)
            const roomId: string = client.getRoomid()
            const room: Room = serverData.getRoomsMap().get(roomId)

            const leave: JoinAndLeaveRoom = new JoinAndLeaveRoom()
            leave.setPlayer(client.getPlayer())
            io.to(roomId).emit('player-leave-room', leave.serializeBinary())

            if(!!room) {
                if(!!room.getUsersMap().get(socket.id)) {
                    room.getUsersMap().del(socket.id)
                }

                client.setRoomid("")
                if(room.getUsersMap().getLength() == 0) {
                    serverData.getRoomsMap().del(roomId)
                    serverData.getRoomobjectsMap().del(roomId)
                } else {
                    serverData.getRoomsMap().set(roomId, room)

                    const roomObject: RoomObject = serverData.getRoomobjectsMap().get(roomId)

                    const newPlayer: Player[] = roomObject.getPlayersList()
                    newPlayer.splice(newPlayer.findIndex((value: Player) => value.getId() == client.getPlayer()?.getId()), 1)
                    roomObject.setPlayersList(newPlayer)

                    serverData.getRoomobjectsMap().set(roomId, roomObject)
                }

                serverData.getUsersMap().set(socket.id, client)

                res.setSuccess(true)
                res.setText("Leave room complete.")

                socket.leave(roomId)

            } else { res.setText("Not join room yet.") }
        } else { res.setText("Not login yet.") }

        io.to(socket.id).emit('leave-room-response', res.serializeBinary())
    })

    socket.on('send-message', (req: Uint8Array) => {
        const res: Standard = new Standard()
        res.setSuccess(false)

        if(!!serverData.getUsersMap().get(socket.id)) {
            const client: Client = serverData.getUsersMap().get(socket.id)
            const roomId: string = client.getRoomid()

            if(roomId != "") {
                try {
                    const e: SendMessage = SendMessage.deserializeBinary(req)
                    const receiveMsg: ReceiveMessage = new ReceiveMessage()

                    receiveMsg.setPlayer(client.getPlayer())
                    receiveMsg.setMsg(e.getMsg())

                    res.setSuccess(true)
                    res.setText("Receive message complete.")
                    res.setData(receiveMsg.serializeBinary())

                    io.to(roomId).emit('receive-message', res.serializeBinary())

                } catch(e) { res.setText("Invalid data format.") }
            } else { res.setText("Not join room yet.") }
        } else { res.setText("Not login yet.") }

        if(!res.getSuccess()) io.to(socket.id).emit('receive-message', res.serializeBinary())
    })

    socket.on('disconnect', () => {
        if(!!serverData.getUsersMap().get(socket.id)) {
            const client: Client = serverData.getUsersMap().get(socket.id)
            const roomId: string = client.getRoomid()
            const room: Room = serverData.getRoomsMap().get(roomId)

            const leave: JoinAndLeaveRoom = new JoinAndLeaveRoom()
            leave.setPlayer(client.getPlayer())
            io.to(roomId).emit('player-leave-room', leave.serializeBinary())

            if(!!room) {
                if(!!room.getUsersMap().get(socket.id)) {
                    room.getUsersMap().del(socket.id)
                }

                if(room.getUsersMap().getLength() == 0) {
                    serverData.getRoomsMap().del(roomId)
                    serverData.getRoomobjectsMap().del(roomId)
                } else {
                    serverData.getRoomsMap().set(roomId, room)

                    const roomObject: RoomObject = serverData.getRoomobjectsMap().get(roomId)

                    const newPlayer: Player[] = roomObject.getPlayersList()
                    newPlayer.splice(newPlayer.findIndex((value: Player) => value.getId() == client.getPlayer()?.getId()), 1)
                    roomObject.setPlayersList(newPlayer)

                    serverData.getRoomobjectsMap().set(roomId, roomObject)
                }
            }

            serverData.getUsersMap().del(socket.id)
        }

        serverData.setOnline(serverData.getOnline()-1)
    })
})