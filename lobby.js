import React from 'react'

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      players: '',
    }
  }

  componentDidMount() {
    const name = prompt('Name:')
    this.props.room.emit('join', name, rsp => {
      this.setState({ players: rsp })
    })
  }

  componentDidUpdate() {
    console.log('players: ', Object.values(this.state.players))
  }

  render() {
    return (
      <div id="hostScreen">
        <h1 id="roomNumber">Room #{this.props.roomNumber}</h1>
        <div id="judge" className="teams">
          <p className="teamTitle">Judge</p>
        </div>
        <div id="team1" className="teams">
          <p className="teamTitle">Team 1</p>
        </div>
        <div id="team2" className="teams">
          <p className="teamTitle">Team 2</p>
        </div>
        <button>Ready</button>
      </div>
    )
  }
}

export default Lobby
