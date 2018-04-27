import { DragSource } from 'react-dnd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import './Note.css'
import ItemTypes from './DND/ItemTypes'

class Note extends Component {
  constructor(props){
    super(props)
    this.state = {
      toDetails: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState(()=>({toDetails:true}))
  }

  render() {
    const {
      title,
      content,
      isDragging,
      connectDragSource,
      left,
      top,
      id,
    } = this.props

    if (isDragging) {
      return null
    }

    if(this.state.toDetails === true){
      return (
      <Redirect
        to={{
          pathname:`/details/${id}`,
        }}
      />)
    }

    return (
        connectDragSource(
          <div
            className="sticky-note"
            style={{ left, top }}
            onClick={this.handleClick}
          >
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
        )
    )
  }
}

Note.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  left: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
}

const cardSource = {
  beginDrag(props) {
    const { id, left, top } = props
    return { id, left, top }
  },
}

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

export default DragSource(ItemTypes.NOTE, cardSource, collectSource)(Note)
