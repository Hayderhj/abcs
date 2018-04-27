import { connect } from 'react-redux'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import React, { Component } from 'react'

import { addNote, moveNote } from '../actions/notes'
import ItemTypes from './DND/ItemTypes'
import Note from './Note'
import './Notes.css'


class Notes extends Component {
  constructor(props) {
    super(props)

    this.addNote = this.addNote.bind(this)
    this.moveNote = this.moveNote.bind(this)
  }

  addNote() {
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }
    this.props.addNote({ title: 'Note', content: 'Added Note', id: guid(), top: 0, left: 0 })
  }

  moveNote(id, left, top) {
    this.props.moveNote({ id, left, top })
  }

  render() {
    const { connectDropTarget } = this.props
    return (
      !this.props.notes
        ? <span>Loading</span>
        :
        <div>
          <button onClick={this.addNote}>ADD NOTE</button>
          {connectDropTarget(
            <div className="grid">
              {this.props.notes.map(({ content, id, left, title, top }, key) => (
                <Note
                  content={content}
                  id={id}
                  key={key}
                  left={left}
                  title={title}
                  top={top}
                />
              ))}
            </div>)}
        </div>
    )
  }
}

function mapStateToProps(state) {
  return { notes: state.notes }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: note => {
      dispatch(addNote(note))
    },
    moveNote: payload => {
      dispatch(moveNote(payload))
    }
  }
}

const collectTarget = connect => ({
  connectDropTarget: connect.dropTarget(),
})

const noteTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset()
    const item = monitor.getItem()
    const left = Math.round(item.left + delta.x)
    const top = Math.round(item.top + delta.y)
    component.moveNote(item.id, left, top)
  },
}

const NoteContext = DragDropContext(HTML5Backend)(DropTarget(ItemTypes.NOTE, noteTarget, collectTarget)(Notes))

export default connect(mapStateToProps, mapDispatchToProps)(NoteContext)
