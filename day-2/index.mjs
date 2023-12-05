import { readFileByLine } from "../lib/shared.mjs";

const totalCubesAtOnce = {
    red: 12,
    green: 13,
    blue: 14
};

const regex = new RegExp('(green|blue|red)', 'gm');

(async () => {
    const games = await readFileByLine('day-2/input.txt')
    // console.log(games)
    const cubeCountMappedToTheGameAndType = []
    for (const game of games) {
        const splitGameNumberAndPlays = game.split(':').map(i => i.trim())

        const cubesFromAPlay = {
            green: [],
            red: [],
            blue: []
        }

        const plays = splitGameNumberAndPlays[1].split(';').map(i => i.trim())

        for (const play of plays) {
            play.split(',').map(i => i.trim()).forEach((cubeType) => {
                const cubeColor = cubeType.split(" ")[1];
                const cubeCount = cubeType.split(" ")[0];
                cubesFromAPlay[`${cubeColor}`].push(cubeCount)
            })
        }

        // for (const match of splitGameNumberAndPlays[1].matchAll(regex)) {
        //     console.log(match, match.index)
        // }
        cubeCountMappedToTheGameAndType.push({
            number: splitGameNumberAndPlays[0].split(" ")[1],
            cubes: cubesFromAPlay
        })        
    }

    const filteredGames = cubeCountMappedToTheGameAndType.filter(game => {
        for (const [type, value] of Object.entries(game.cubes)) {
            // console.log(type)
            value.forEach(count => {
                console.log(parseInt(count), totalCubesAtOnce[`${type}`])
                return parseInt(count) <= totalCubesAtOnce[`${type}`]
            })
        }
    })
    console.log(JSON.stringify(filteredGames, null, 2))
})()