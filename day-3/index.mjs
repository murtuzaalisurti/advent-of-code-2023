import { readFileByLine } from "../lib/shared.mjs";

console.time('exec')
const lines = await readFileByLine('day-3/input.txt')
const numbers = new RegExp('\\d+', 'g')
const charsRegEx = /[`!@#$%^&\*()_\+\-=\[\]{};\':"\\|,<>\/?~]/g;

const numHavingAdjSpecialChars = [];

for (const [i, line] of lines.entries()) {
    if (i === 0) {

        const matchesOfCurrLine = Array.from(line.matchAll(numbers))
        const charMatchesOfNextLine = Array.from(lines[i + 1].matchAll(charsRegEx))

        const numbersAroundSpecialCharsForCurrLine = []

        matchesOfCurrLine.forEach(matchOfCurrLine => {
            if (line[matchOfCurrLine.index + matchOfCurrLine[0].length]?.match(charsRegEx) || line[matchOfCurrLine.index - 1]?.match(charsRegEx)) {
                numbersAroundSpecialCharsForCurrLine.push({ 
                    number: matchOfCurrLine[0],
                    index: matchOfCurrLine.index
                })
            }
            charMatchesOfNextLine.forEach(charMatchOfNextLine => {
                if (charMatchOfNextLine.index >= matchOfCurrLine.index - 1 && charMatchOfNextLine.index <= matchOfCurrLine.index + matchOfCurrLine[0].length) {
                    numbersAroundSpecialCharsForCurrLine.push({
                        number: matchOfCurrLine[0],
                        index: matchOfCurrLine.index
                    })
                }
            })
        })

        // technique to remove duplicate objects from array of objects
        const numbersAroundSpecialCharsForCurrLineUnique = numbersAroundSpecialCharsForCurrLine.filter(({ number, index }, i) => {
            return !(numbersAroundSpecialCharsForCurrLine.map(({ number, index }) => {
                return `${number} ${index}`
            })).includes(`${number} ${index}`, i + 1)
        })

        numbersAroundSpecialCharsForCurrLineUnique.forEach(i => {
            numHavingAdjSpecialChars.push(i.number)
        })

    } else if (i === lines.length - 1) {

        const matchesOfCurrLine = Array.from(line.matchAll(numbers))
        const charMatchesOfPrevLine = Array.from(lines[i - 1].matchAll(charsRegEx))

        const numbersAroundSpecialCharsForCurrLine = []

        matchesOfCurrLine.forEach(matchOfCurrLine => {
            if (line[matchOfCurrLine.index + matchOfCurrLine[0].length].match?.(charsRegEx) || line[matchOfCurrLine.index - 1].match?.(charsRegEx)) {
                numbersAroundSpecialCharsForCurrLine.push({ 
                    number: matchOfCurrLine[0],
                    index: matchOfCurrLine.index
                })
            }

            charMatchesOfPrevLine.forEach(charMatchOfPrevLine => {
                if (charMatchOfPrevLine.index >= matchOfCurrLine.index - 1 && charMatchOfPrevLine.index <= matchOfCurrLine.index + matchOfCurrLine[0].length) {
                    numbersAroundSpecialCharsForCurrLine.push({
                        number: matchOfCurrLine[0],
                        index: matchOfCurrLine.index
                    })
                }
            })
        })

        // technique to remove duplicate objects from array of objects
        const numbersAroundSpecialCharsForCurrLineUnique = numbersAroundSpecialCharsForCurrLine.filter(({ number, index }, i) => {
            return !(numbersAroundSpecialCharsForCurrLine.map(({ number, index }) => {
                return `${number} ${index}`
            })).includes(`${number} ${index}`, i + 1)
        })

        numbersAroundSpecialCharsForCurrLineUnique.forEach(i => {
            numHavingAdjSpecialChars.push(i.number)
        })

    } else {
        const matchesOfCurrLine = Array.from(line.matchAll(numbers))
        const charMatchesOfNextLine = Array.from(lines[i + 1].matchAll(charsRegEx))
        const charMatchesOfPrevLine = Array.from(lines[i - 1].matchAll(charsRegEx))

        const numbersAroundSpecialCharsForCurrLine = []

        matchesOfCurrLine.forEach(matchOfCurrLine => {
            if (line[matchOfCurrLine.index + matchOfCurrLine[0].length]?.match(charsRegEx) || line[matchOfCurrLine.index - 1]?.match(charsRegEx)) {
                numbersAroundSpecialCharsForCurrLine.push({ 
                    number: matchOfCurrLine[0],
                    index: matchOfCurrLine.index
                })
            }
            charMatchesOfNextLine.forEach(charMatchOfNextLine => {
                if (charMatchOfNextLine.index >= matchOfCurrLine.index - 1 && charMatchOfNextLine.index <= matchOfCurrLine.index + matchOfCurrLine[0].length) {
                    numbersAroundSpecialCharsForCurrLine.push({
                        number: matchOfCurrLine[0],
                        index: matchOfCurrLine.index
                    })
                }
            })

            charMatchesOfPrevLine.forEach(charMatchOfPrevLine => {
                if (charMatchOfPrevLine.index >= matchOfCurrLine.index - 1 && charMatchOfPrevLine.index <= matchOfCurrLine.index + matchOfCurrLine[0].length) {
                    numbersAroundSpecialCharsForCurrLine.push({
                        number: matchOfCurrLine[0],
                        index: matchOfCurrLine.index
                    })
                }
            })
        })

        // technique to remove duplicate objects from array of objects
        const numbersAroundSpecialCharsForCurrLineUnique = numbersAroundSpecialCharsForCurrLine.filter(({ number, index }, i) => {
            return !(numbersAroundSpecialCharsForCurrLine.map(({ number, index }) => {
                return `${number} ${index}`
            })).includes(`${number} ${index}`, i + 1)
        })

        numbersAroundSpecialCharsForCurrLineUnique.forEach(i => {
            numHavingAdjSpecialChars.push(i.number)
        })
    }
}

const sum = numHavingAdjSpecialChars.reduce((acc, curr) => acc + parseInt(curr), 0)
console.timeEnd('exec')
