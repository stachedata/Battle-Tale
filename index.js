import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'
import io from 'socket.io-client'

class Join extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 'Code' }

    this.handleChange = this.handleChange.bind(this)
    this.joinGame = this.joinGame.bind(this)
  }

  handleChange(event) {
    if (event.target.value.length < 6)
      this.setState({ value: event.target.value })
  }

  joinGame(event) {
    // alert('Code: ' + this.state.value)
    io.connect('http://localhost:8000/' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.joinGame}>
        <input
          type="number"
          placeholder="Code"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input type="submit" value="Join" />
      </form>
    )
  }
}

class Host extends React.Component {
  constructor(props) {
    super(props)
    this.state = { socket: null }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        socket: io.connect('http://localhost:8000/' + this.props.roomNumber)
      })
    }),
      1000
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

class App extends React.Component {
  clickJoin() {
    ReactDOM.render(<Join />, document.getElementById('root'))
  }

  clickHost() {
    const num = Math.floor(10000 + Math.random() * 90000)
    const socket = io.connect('http://localhost:8000')
    socket.emit('hostRoom', num)
    ReactDOM.render(<Host roomNumber={num} />, document.getElementById('root'))
  }

  render() {
    return (
      <div id="buttonsContainer">
        <button onClick={this.clickJoin}>Join</button>
        <button onClick={this.clickHost}>Host</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
