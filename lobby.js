import React from 'react'

class Judge extends React.Component {
  render() {
    return (
      <div id="judge" className="teams">
        <p className="teamTitle">Judge</p>
        <p>{this.props.player}</p>
      </div>
    )
  }
}

class Team extends React.Component {
  // componentDidMount() {
  //   console.log('Team mount: ', this.props.players)
  // }
  // componentDidUpdate() {
  //   console.log('Team update: ', this.props.players)
  // }

  render() {
    return (
      <div id="team" className="teams">
        <p className="teamTitle">Team {this.props.name}</p>
        <p>{this.props.players}</p>
      </div>
    )
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
            this.team.b.push(Object.values(this.state.players[i]))
          } else {
            this.team.a.push(Object.values(this.state.players[i]))
          }
        }
      }
      this.team.playersCopy = [...this.state.players]
    }
  }

  render() {
    return (
      <div id="hostScreen">
        <h1 id="roomNumber">Room #{this.props.roomNumber}</h1>
        <Judge player={Object.values(this.state.players[0])} />
        <Team name={'A'} players={this.team.a} />
        <Team name={'B'} players={this.team.b} />
        <button>Ready</button>
      </div>
    )
  }
}

export default Lobby
