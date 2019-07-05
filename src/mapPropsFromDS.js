import React from 'react'

export const mapPropsFromDS = (Component, mapProps) => {
  return (props) => {
    const finalProps = mapProps(props)
    return <Component {...finalProps} />
  }
}