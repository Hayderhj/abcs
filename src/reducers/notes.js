import { ADD_NOTE, MOVE_NOTE } from '../actions/notes'

const defaultState = [
  { title: 'Note #1', content: 'A test Note', id: '1', top: 20, left: 20, },
  { title: 'Note #2', content: 'A test Note', id: '2', top: 20, left: 290, },
  { title: 'Note #3', content: 'A test Note', id: '3', top: 290, left: 20, },
  { title: 'Note #4', content: 'A test Note', id: '4', top: 290, left: 290, },
]

const notes = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ADD_NOTE:
      return [...state, payload]
    case MOVE_NOTE:
      return moveNote(state, payload)
    default:
      return state
  }
}

const moveNote = (state, { id, left, top }) => {
  const note = { ...state.find((note) => note.id === id), top, left }
  const noteIndex = state.findIndex((note) => note.id === id)
  const stateCopy = [...state]

  stateCopy.splice(noteIndex, 1)

  return [...stateCopy, note]
}

export default notes
