import React from 'react'

class Player extends React.Component {
  render() {
    return (
      <div id="player">
        <p>{this.props.name}</p>
      </div>
    )
  }
}

class Judge extends React.Component {
  render() {
    return (
      <div id="judge" className="teams">
        <p className="teamTitle">Judge</p>
        <Player name={this.props.player} />
      </div>
    )
  }
}

class Team extends React.Component {
  render() {
    console.log('team:', this.props.new)
    if (this.props.new === true) {
      return (
        <div id="team" className="teams">
          <p className="teamTitle">Team {this.props.name}</p>
          <Player name={this.props.players} />
        </div>
      )
    } else {
      return (
        <div id="team" className="teams">
          <p className="teamTitle">Team {this.props.name}</p>
        </div>
      )
    }
  }
}

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [''],
    }

    this.team = {
      playersCopy: [],
      a: [],
      b: [],
      newA: false,
      newB: false,
    }
  }

  componentDidMount() {
    const name = prompt('Name:')
    this.props.room.emit('join', name, rsp => {
      this.setState({ players: rsp })
    })
    this.interval = setInterval(() => {
      this.props.room.emit('users', rspo => this.setState({ players: rspo }))
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate() {
    if (
      this.state.players.length > this.team.playersCopy.length &&
      this.state.players.length != 1
    ) {
      for (let i = 1; i < this.state.players.length; i++) {
        if (
          JSON.stringify(this.state.players[i]) !==
          JSON.stringify(this.team.playersCopy[i])
        ) {
          if (i % 2 == 0) {
            this.team.newB = true
            this.team.b.push(Object.values(this.state.players[i]))
          } else {
            this.team.newA = true
            this.team.a.push(Object.values(this.state.players[i]))
          }
        }
      }
      this.team.playersCopy = [...this.state.players]
    }

    console.log(this.team.newA)
  }

  render() {
    return (
      <div id="hostScreen">
        <h1 id="roomNumber">Room #{this.props.roomNumber}</h1>
        <Judge player={Object.values(this.state.players[0])} />
        <Team name={'A'} players={this.team.a} new={this.team.newA} />
        <Team name={'B'} players={this.team.b} new={this.team.newB} />
        <button>Ready</button>
      </div>
    )
  }
}

export default Lobby
