import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'

class Join extends React.Component {
  render() {
    return <h1>Hello Join</h1>
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
