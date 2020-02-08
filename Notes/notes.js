const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse('Note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken'));
    }

    saveNotes(notes)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const noteToRemove = notes.find((note) => note.title === title)

    if (noteToRemove.length > 0) {
        console.log(chalk.inverse.green('Removing note "' + noteToRemove[0].title + '"'));
        saveNotes(notes.filter((note) => note.title !== title))
    } else{
        console.log(chalk.inverse.red('Note not found'))
    }
    
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.blue("Your Notes:"))
    notes.forEach((note) => console.log(chalk.green('- ' + note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title == title)
    if (note) {
        console.log(chalk.blue.bold(note.title))
        console.log(chalk.green(note.body))
    } else {
        console.log(chalk.red.bold("Note not found"))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}