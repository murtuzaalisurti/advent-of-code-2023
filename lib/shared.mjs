import readline from 'readline'
import fs from 'fs'
import path from 'path'

export const readFileByLine = async (file) => {
    const lines = []

    const readInterface = readline.createInterface({
        input: fs.createReadStream(path.resolve(file)),
        output: process.stdout,
        terminal: false
    });

    for await (const line of readInterface) {
        lines.push(line)
    }

    return lines
}