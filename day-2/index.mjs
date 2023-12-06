import { readFileByLine } from "../lib/shared.mjs";

const totalCubesAtOnce = {
    red: 12,
    green: 13,
    blue: 14
};

const getCubeCountMappedToTheGameAndType = async () => {
    const games = await readFileByLine('day-2/input.txt')
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
    
        cubeCountMappedToTheGameAndType.push({
            number: splitGameNumberAndPlays[0].split(" ")[1],
            cubes: cubesFromAPlay
        })        
    }
    return cubeCountMappedToTheGameAndType
}

const partOne = async () => {
    const validGames = []
    const cubeCountMappedToTheGameAndType = await getCubeCountMappedToTheGameAndType()

    for (const game of cubeCountMappedToTheGameAndType) {
        let isValid = true
        loop2: for (const [type, value] of Object.entries(game.cubes)) {
            loop3: for (const count of value) {
                if (parseInt(count) > totalCubesAtOnce[`${type}`]) {
                    isValid = false
                    break loop2;
                }
            }
        };

        isValid && validGames.push(game);
    }
    const sumOfValidGameNumbers = validGames.reduce((acc, curr) => acc + parseInt(curr.number), 0);
    console.log(`\nsum of valid game numbers: `, sumOfValidGameNumbers);
}

const partTwo = async () => {
    const cubeCountMappedToTheGameAndType = await getCubeCountMappedToTheGameAndType()
    const powersOfCubes = []
    
    for (const game of cubeCountMappedToTheGameAndType) {
        const powersOfCubeInAGame = [];
        loop2: for (const [type, value] of Object.entries(game.cubes)) {
            powersOfCubeInAGame.push(value.sort((a, b) => parseInt(a) - parseInt(b))[value.length - 1])
        };
        powersOfCubes.push(powersOfCubeInAGame.reduce((acc, curr) => acc * curr, 1))
    }

    console.log(`sum of powers of min cubes`, powersOfCubes.reduce((acc, curr) => acc + curr, 0))
}


(async () => {
    console.time('exec');
    await partOne()
    await partTwo()
    console.timeEnd('exec');
})()