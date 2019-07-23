import React from 'react'

class Judge extends React.Component {
  componentDidUpdate() {
    console.log('Judge:', this.props.player)
  }

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
  componentDidMount() {
    console.log('Team mount: ', this.props.players)
  }
  componentDidUpdate() {
    console.log('Team update: ', this.props.players)
  }

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
      counter: 1,
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
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate() {
    //  FIXME condition stays true
    let pl = this.state.players.length
    if (pl > 1) {
      if (pl % 2 == 0) {
        this.team.a.push(Object.values(this.state.players[pl - 1]))
      } else {
        this.team.b.push(Object.values(this.state.players[pl - 1]))
      }
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
