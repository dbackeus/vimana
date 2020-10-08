import { h, Component } from 'preact'
import htm from 'htm'
const html = htm.bind(h)

const Main = ({ onMissionLookup }) =>
  html`<button onClick=${onMissionLookup} class="btn btn-primary">Look for a mission</button>`

export default Main
