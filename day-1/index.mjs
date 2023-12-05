import { z } from 'zod'
import { readFileByLine } from '../lib/shared.mjs';

const regex = new RegExp('(?=(one|two|three|four|five|six|seven|eight|nine))', 'gm')
const stringToIntMap = new Map([["one", 1], ["two", 2], ["three", 3], ["four", 4], ["five", 5], ["six", 6], ["seven", 7], ["eight", 8], ["nine", 9]]);

(async () => {
    console.time('executed')
    const lines = await readFileByLine('day-1/input.txt')
    const calibrationByLine = lines.map((line, i) => {
        const allDigitsInLine = []

        for (const match of line.matchAll(regex)) {
            allDigitsInLine.push({
                digit: stringToIntMap.get(match[1]),
                index: match.index
            })
        }

        const lineArr = line.split('')
        const firstAndLastNumber = {
            first: {
                digit: null,
                index: null
            },
            last: {
                digit: null,
                index: null
            }
        }

        for (const [index, char] of lineArr.entries()) {
            if (!z.nan().safeParse(parseInt(char, 10)).success) {
                allDigitsInLine.push({
                    digit: char,
                    index
                })
            }
        };

        const sortedDigitsAccordingToIndex = allDigitsInLine.sort((a, b) => a.index - b.index)

        firstAndLastNumber.first = {
            ...sortedDigitsAccordingToIndex[0]
        }
        firstAndLastNumber.last = {
            ...sortedDigitsAccordingToIndex[sortedDigitsAccordingToIndex.length - 1]
        }

        firstAndLastNumber.last.digit === null && (firstAndLastNumber.last.digit = firstAndLastNumber.first.digit);
        return parseInt(`${firstAndLastNumber.first.digit}${firstAndLastNumber.last.digit}`, 10)
    })

    const result = calibrationByLine.reduce((acc, curr) => acc + curr, 0)
    console.log(result)
    console.timeEnd('executed')
})()