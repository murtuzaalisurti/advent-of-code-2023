import { readFileByLine } from "../lib/shared.mjs";

const lines = await readFileByLine("day-4/input.txt");

const cardsWithTheirPoints = Array.from({ length: lines.length })
const cardsWithTheirWinningCopies = Array.from({ length: lines.length }).map((_, i) => ({
    card: i + 1,
    copies: {
        count: 1
    }
}))

// Part 1
function PartOne() {
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

    return cardsWithTheirPoints.reduce((acc, curr) => acc + curr.points, 0);
}

// Part 2
function PartTwo() {
    for (const [index, line] of lines.entries()) {
        function calc(index, line) {
            const card = index + 1;
            const cardNumbers = line.split(":")[1].trim()

            const winningNumbers = cardNumbers.split("|")[0].trim().split(" ").map(i => i.trim()).filter(j => parseInt(j)).map(k => parseInt(k))
            const numbersIhave = cardNumbers.split("|")[1].trim().split(" ").map(i => i.trim()).filter(j => parseInt(j)).map(k => parseInt(k))
            const matchingNumbers = []


            for (const win of winningNumbers) {
                if (numbersIhave.includes(win)) {
                    matchingNumbers.push(win)
                }
            }

            if (matchingNumbers.length > 0) {
                const nextcards = Array.from({ length: ((matchingNumbers.length + card) - card) / 1 + 1 }, (_, t) => card + t * 1).slice(1);

                for (const winningCopyNumber of nextcards) {
                    cardsWithTheirWinningCopies[winningCopyNumber - 1].copies.count++;
                }
            }
        }

        for (let copy = 0; copy < cardsWithTheirWinningCopies[index].copies.count; copy++) {
            calc(index, line);
        }
    }

    return cardsWithTheirWinningCopies.reduce((acc, curr) => curr.copies.count + acc, 0);
}



console.time('exec - Part 1')
const totalPointsOfPileOfCards = PartOne();
console.timeEnd('exec - Part 1')

console.time('exec - Part 2')
const totalWonScratchCards = PartTwo();
console.timeEnd('exec - Part 2');

console.log(totalPointsOfPileOfCards)
console.log(totalWonScratchCards)