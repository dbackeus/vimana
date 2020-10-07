import { h, Component, render } from 'preact'
import htm from 'htm'
const html = htm.bind(h)

import Game from './components/game.js'

class App extends Component {
  constructor() {
    super()

    if(localStorage.getItem("airports")) {
      let airportsJSON = localStorage.getItem("airports")
      this.state = { airports: JSON.parse(airportsJSON).entries }
    }
    else {
      fetch("/airports")
        .then(response => response.json())
        .then((airports) => {
          let airportsJSON = JSON.stringify({ updatedAt: new Date(), entries: airports })
          localStorage.setItem("airports", airportsJSON)
          this.setState({ airports: airports })
        })
    }
  }

  render() {
    const airports = this.state.airports

    return html`
      <${Game} airports=${airports} />
    `
  }
}

render(html`<${App} />`, document.getElementById("game-info"))
