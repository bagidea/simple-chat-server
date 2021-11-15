import { Map, Move } from "../dist/protos/map_pb";

export const GenerateMap = (): Map => {
    const map: Map = new Map()

    map.setId(Math.floor(Math.random()*4))
    map.setJailsList([10, 30, 60])
    map.addBoss(79)
    map.addTreasure(50)
    map.setTrapsList([20, 49])

    const move1: Move = new Move()
    move1.setFrom(20)
    move1.setTo(50)

    const move2: Move = new Move()
    move2.setFrom(30)
    move2.setTo(80)

    map.addMoveup(move1)
    map.addMoveup(move2)

    return map
}