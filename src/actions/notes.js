export const ADD_NOTE = 'ADD_NOTE'
export const MOVE_NOTE = 'MOVE_NOTE'

export const addNote = (note) => ({
    type: ADD_NOTE,
    payload: note,
  }
)

export const moveNote = (payload) => ({
    type: MOVE_NOTE,
    payload,
  }
)
