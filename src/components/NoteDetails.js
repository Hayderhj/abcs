import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './NoteDetails.css'

class NoteDetails extends Component {
  render() {
    if (this.props.note === null) {
      return <p>This note does not exist</p>
    }
    const { title, content } = this.props.note
    return (
      <div>
        <Link to='/'>Close Note</Link>
        <div className="flex">
          <div className="row">
            <div className="flex-item big-note">
              <h2>{title}</h2>
              <p>{content}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NoteDetails.propsTypes = {
  note: PropTypes.object,
}

const mapStateToProps = ({ notes }, { match }) => {
  const { id } = match.params
  const note = notes.find((note) => note.id === id)
  if (!note) {
    return {
      note: null
    }
  }
  return { note }
}

export default connect(mapStateToProps)(NoteDetails)
