import readline from 'readline'
import fs from 'fs'
import path from 'path'
import {z} from 'zod'

async function readFileByLine() {
    const lines = []

    const readInterface = readline.createInterface({
        input: fs.createReadStream(path.resolve('day-1/input.txt')),
        output: process.stdout,
        terminal: false
    });

    for await (const line of readInterface) {
        lines.push(line)
    }

    return lines
}
(async () => {
    const lines = await readFileByLine()
    const calibrationByLine = lines.map((line, i) => {
        const lineArr = line.split('')

        const firstAndLastNumber = {
            first: null,
            last: null
        }

        for (const [index, char] of lineArr.entries()) {

            if (!z.nan().safeParse(parseInt(char, 10)).success) {
                if (firstAndLastNumber.first === null) {
                    firstAndLastNumber.first = char
                } else {
                    firstAndLastNumber.last = char
                }
            }
        };

        firstAndLastNumber.last === null && (firstAndLastNumber.last = firstAndLastNumber.first);
        
        return parseInt(`${firstAndLastNumber.first}${firstAndLastNumber.last}`, 10)
    })

    const result = calibrationByLine.reduce((acc, curr) => acc + curr, 0)
    console.log(result)
})()