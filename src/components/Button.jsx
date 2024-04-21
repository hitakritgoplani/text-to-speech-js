import React from 'react'
import '../styles/Button.css'

export default function Button(props) {
  return (
    <div onClick={props.onClickPress} className='button-div'>{props.name}</div>
  )
}
