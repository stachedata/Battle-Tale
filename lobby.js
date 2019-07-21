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
  componentDidMount() {
    console.log('mount: ', this.props.players)
  }
  componentDidUpdate() {
    console.log('update: ', this.props.players)
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
      a: [''],
      b: [''],
    }
  }

  componentDidMount() {
    const name = prompt('Name:')
    this.props.room.emit('join', name, rsp => {
      this.setState({ players: rsp })
    })
    // TODO fix this up
    // this.updater = setInterval(() => {
    //   this.props.room.emit('users', rspo => this.setState({ players: rspo }))
    // }, 1000)
  }

  componentDidUpdate() {
    if (this.team.counter % 2 == 0) {
      this.team.b.push(this.state.players[this.team.counter])
    } else {
      this.team.a.push(this.state.players[this.team.counter])
    }
    console.log('Lobby update: ', this.state.players)
  }

  render() {
    return (
      <div id="hostScreen">
        <h1 id="roomNumber">Room #{this.props.roomNumber}</h1>
        <Judge player={Object.values(this.state.players[0])} />
        <Team name={'A'} players={Object.values(this.team.a)} />
        <Team name={'B'} players={Object.values(this.team.b)} />
        <button>Ready</button>
      </div>
    )
  }
}

export default Lobby
