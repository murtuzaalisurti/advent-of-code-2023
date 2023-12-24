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

        numbersAroundSpecialCharsForCurrLineUnique.forEach(j => {
            numHavingAdjSpecialChars.push({
                line: i,
                number: j.number,
                index: j.index
            })
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

        numbersAroundSpecialCharsForCurrLineUnique.forEach(j => {
            numHavingAdjSpecialChars.push({
                line: i,
                number: j.number,
                index: j.index
            })
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

        numbersAroundSpecialCharsForCurrLineUnique.forEach(j => {
            numHavingAdjSpecialChars.push({
                line: i,
                number: j.number,
                index: j.index
            })
        })
    }
}

const starsWithAdjDigitsPerLine = []

for (const [i, line] of lines.entries()) {
    if (i !== 0 && i !== lines.length - 1) {
        const starCharRegex = /\*/g;
        const starMatchOfCurrLine = Array.from(line.matchAll(starCharRegex))
        // console.log(`\n\n`, starMatchOfCurrLine)

        const starsWithAdjDigits = []

        starMatchOfCurrLine.forEach(star => {
            const adjDigits = {
                starIndex: null,
                count: 0
            }

            if (line[star.index - 1].match(numbers)) {
                adjDigits.count++;
                adjDigits.starIndex = star.index

            }

            if (line[star.index + 1].match(numbers)) {
                adjDigits.count++;
                adjDigits.starIndex = star.index

            }

            if (lines[i - 1][star.index - 1].match(numbers)) {
                adjDigits.count++;
                adjDigits.starIndex = star.index

            }

            if (lines[i - 1][star.index].match(numbers)) {
                adjDigits.count++;
                adjDigits.starIndex = star.index

            }

            if (lines[i - 1][star.index + 1].match(numbers)) {
                adjDigits.count++;
                adjDigits.starIndex = star.index

            }

            if (lines[i + 1][star.index - 1].match(numbers)) {
                adjDigits.count++;
                adjDigits.starIndex = star.index
            }

            if (lines[i + 1][star.index].match(numbers)) {
                adjDigits.count++;
                adjDigits.starIndex = star.index
            }

            if (lines[i + 1][star.index + 1].match(numbers)) {
                adjDigits.count++;
                adjDigits.starIndex = star.index
            }

            if (lines[i + 1][star.index + 1].match(numbers)) {
                adjDigits.starIndex = star.index
            }

            starsWithAdjDigits.push({
                ...adjDigits
            })

        })
        starsWithAdjDigitsPerLine.push({
            line: i,
            adjDigits: [
                ...starsWithAdjDigits
            ]
        })

    }
}

const starsWithExactlyTwoAdjDigitsPerLine = starsWithAdjDigitsPerLine.map(({ line, adjDigits }) => {
    return {
        line,
        adjDigits: adjDigits.filter(i => i.count === 2)
    }
})
console.log(JSON.stringify(starsWithExactlyTwoAdjDigitsPerLine[0], null, 2))

console.log(numHavingAdjSpecialChars[2])
const sum = numHavingAdjSpecialChars.reduce((acc, curr) => acc + parseInt(curr.number), 0)
console.timeEnd('exec')
