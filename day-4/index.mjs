import { readFileByLine } from "../lib/shared.mjs";

const numbers = new RegExp('\\d+', 'g')
const lines = await readFileByLine("day-4/input.txt");

const cardsWithTheirPoints = Array.from({ length: lines.length })

for (const [i, line] of lines.entries()) {
    const cardNumbers = line.split(":")[1].trim()

    const winningNumbers = cardNumbers.split("|")[0].trim().split(" ").map(i => i.trim()).filter(j => parseInt(j)).map(k => parseInt(k))
    const numbersIhave = cardNumbers.split("|")[1].trim().split(" ").map(i => i.trim()).filter(j => parseInt(j)).map(k => parseInt(k))

    let points = 0;
    let firstMatch = true;
    const matchingNumbers = []

    for (const win of winningNumbers) {
        if (numbersIhave.includes(win)) {
            matchingNumbers.push(win)

            if (!firstMatch) {
                points = points * 2
            } else {
                points++;
            }

            firstMatch = false;
        }

    }

    cardsWithTheirPoints[i] = {
        matchingNumbers,
        points,
        card: i + 1
    }
}

for (const [i, line] of lines.entries()) {
    const card = i + 1;
    const cardNumbers = line.split(":")[1].trim()

    const winningNumbers = cardNumbers.split("|")[0].trim().split(" ").map(i => i.trim()).filter(j => parseInt(j)).map(k => parseInt(k))
    const numbersIhave = cardNumbers.split("|")[1].trim().split(" ").map(i => i.trim()).filter(j => parseInt(j)).map(k => parseInt(k))

    const matchingNumbers = []
    const copiesOfCards = []

    // part 2

    for (const win of winningNumbers) {
        if (numbersIhave.includes(win)) {
            matchingNumbers.push(win)
        }
    }

    if (matchingNumbers.length > 0) {
        console.log(`\nlength: `, matchingNumbers.length)
        console.log(`card: `, card)

        copiesOfCards.push({
            [card]: 1
        })

        for (const numbers of Array.from({length: ((matchingNumbers.length + card) - card)/1 + 1}, (_, i) => card + i * 1)) {
            console.log(numbers)
        }
    }
}

console.time('exec')
const totalPointsOfPileOfCards = cardsWithTheirPoints.reduce((acc, curr) => acc + curr.points, 0);
console.timeEnd('exec')

// console.log(totalPointsOfPileOfCards)