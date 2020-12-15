import { h, Fragment, Component } from 'preact'
import htm from 'htm'
const html = htm.bind(h)

import { distance } from 'helpers'

const SelectMission = ({ airport, onMissionClick }) => {
  const reward = Math.round(distance(airport, currentAirport) * 5)

  const rows = ['Passenger', 'Cargo'].map((description) => {
    return html`
      <tr class="game-row" onClick=${(e) => onMissionClick({ description, reward, airport })}>
        <td>${description}</td>
        <td>$${reward}</td>
      </tr>
    `
  })

  return html`
    <${Fragment}>
      <h3>Select a mission</h3>
      <table class="table">
        <thead>
          <th>Description</th>
          <th>Reward</th>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </${Fragment}>
  `
}

export default SelectMission
