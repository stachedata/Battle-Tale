import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'
import io from 'socket.io-client'
import Lobby from './lobby.js'

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
    const room = io.connect('http://localhost:8000/' + this.state.value)
    ReactDOM.render(
      <Lobby room={room} roomNumber={this.state.value} />,
      document.getElementById('root')
    )
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
    this.state = {
      roomNumber: '',
      users: [],
    }
  }

  componentDidMount() {
    this.props.socket.emit('createRoom', rsp => {
      this.setState({ roomNumber: rsp })
      //TODO error handling for room that doesnt exist
    })
  }

  componentDidUpdate() {
    const room = io.connect('http://localhost:8000/' + this.state.roomNumber)
    ReactDOM.render(
      <Lobby room={room} roomNumber={this.state.roomNumber} />,
      document.getElementById('root')
    )
  }

  render() {
    return <h1>Loading...</h1>
  }
}

class App extends React.Component {
  clickJoin() {
    const socket = io.connect('http://localhost:8000')
    ReactDOM.render(<Join socket={socket} />, document.getElementById('root'))
  }

  clickHost() {
    const socket = io.connect('http://localhost:8000')
    ReactDOM.render(<Host socket={socket} />, document.getElementById('root'))
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
