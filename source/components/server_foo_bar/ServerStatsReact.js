import * as React from 'react'
import MemoryComponent from './MemoryComponent'

const RootComponent = (props) => {
  return (
    <div className="stats-container">
      <small>server_stats_react</small>
      <MemoryComponent />
    </div>
  )
}

export default RootComponent