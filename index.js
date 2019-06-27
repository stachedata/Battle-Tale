import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'

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
    alert('Code: ' + this.state.value)
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
  render() {
    return <h1>Hello Host</h1>
  }
}

class App extends React.Component {
  clickJoin() {
    ReactDOM.render(<Join />, document.getElementById('root'))
  }

  clickHost() {
    ReactDOM.render(<Host />, document.getElementById('root'))
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
