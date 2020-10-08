import { h, Fragment, Component, render } from 'preact'
import htm from 'htm'
const html = htm.bind(h)

import map from '../map.js'
import { distance } from '../helpers.js'

class Main extends Component {
  render() {
    const { onMissionLookup } = this.props
    return html`<button onClick=${onMissionLookup} class="btn btn-primary">Look for a mission</button>`
  }
}

class FilterDestination extends Component {
  state = {
    distance: '0..50',
  }

  render({ airports, onAirportClick }, state) {
    const [distanceStart, distanceEnd] = state.distance.split('..').map((string) => parseInt(string))

    const filteredAirports = airports
      .filter((airport) => airport.size > 1)
      .map((airport) => ({ ...airport, distance: distance(airport, currentAirport) }))
      .filter((airport) => airport.distance > distanceStart && airport.distance < distanceEnd)
      .sort((a, b) => (a.distance > b.distance ? 1 : -1))

    map.updateAirports(filteredAirports)

    const rows = filteredAirports.map((airport) => {
      return html`
        <tr
          class="game-row"
          onClick=${onAirportClick.bind(this, airport)}
          onMouseOver=${this.onAirportHover.bind(this, airport)}
        >
          <td>${airport.name}</td>
          <td>${Math.round(airport.distance)} NM</td>
        </tr>
      `
    })

    return html`
      <${Fragment}>
        <h3>Select destination airport</h3>
        <label for="distance-filter" class="form-label">Distance</label>
        <select onchange=${this.onSelectDistance.bind(this)} class="form-select" id="distance-filter">
          <option value="0..50">Nearby (0-50 NM)</option>
          <option value="50..100">Medium (50-100 NM)</option>
          <option value="100..1000">Far (100-1000 NM)</option>
        </select>
        <table class="table">
          <thead>
            <th>Name</th>
            <th>Distance</th>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </${Fragment}>
    `
  }

  onSelectDistance(e) {
    this.setState({ distance: e.target.value })
  }

  onAirportHover(airport) {
    map.previewRoute(airport)
  }
}

class SelectMission extends Component {
  render({ airport, onMissionClick }) {
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
}

class CreateMission extends Component {
  state = {
    createdMission: null,
    error: null,
  }

  render({ onViewMissionClick, _selectedMission }) {
    const { createdMission, error } = this.state

    if (createdMission) {
      return html`
        <${Fragment}>
          <div class="alert alert-success" role="alert">Mission created!</div>
          <button onClick=${(e) => onViewMissionClick(createdMission)} class="btn btn-primary">Go to mission view</button>
        </${Fragment}>
      `
    } else if (error) {
      return html` <div class="alert alert-danger" role="alert">Something went wrong when creating the mission :(</div> `
    } else {
      return html`
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status"></div>
        </div>
      `
    }
  }

  componentWillMount() {
    const ident = this.props.mission.airport.ident
    const { description } = this.props.mission

    fetch('/missions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mission: { destination_airport_ident: ident, description } }),
    })
      .then((response) => response.json())
      .then((mission) => this.setState({ createdMission: mission }))
      .catch((error) => this.setState({ error }))
  }
}

class Mission extends Component {
  state = {
    mission: this.props.mission,
  }

  componentWillMount() {
    map.previewRoute(this.props.mission.destination_airport)
    const setState = this.setState
    const setMission = (mission) => this.setState({ mission })

    this.channel = window.actionCableConsumer.subscriptions.create('MissionChannel', { received: setMission })
  }

  render() {
    const { mission } = this.state

    return html`
      <${Fragment}>
        <h3>${mission.description} Mission</h3>
        <p>From ${mission.starting_airport.name} to ${mission.destination_airport.name}.</p>
        ${this.renderMissionState(mission)}
      </${Fragment}>
    `
  }

  renderMissionState(mission) {
    const { started_at, completed_at, starting_airport, destination_airport } = mission

    if (!started_at) {
      return html` <div class="alert alert-info">
        Please connect the flight simulator client and start a flight from '${starting_airport.name}' airport to start the
        mission.
      </div>`
    }
    if (completed_at) {
      return html` <div class="alert alert-success">You successfully completed the mission, hoorray! 🥳</div> `
    }

    return html` <p>Tracking in progress. Please land at ${destination_airport} to complete mission!</p> `
  }

  componentWillUnmount() {
    this.channel.unsubscribe()
  }
}

class Game extends Component {
  state = {
    screen: window.currentMission ? 'mission' : 'main',
    destinationAirport: null,
    selectedMission: null, // { description, reward, airport }
    createdMission: window.currentMission || null, // Mission#to_json
  }

  render({ airports }, state) {
    let { screen } = state

    let screenComponent
    if (screen == 'main') {
      const onMissionLookup = this.setState.bind(this, { screen: 'filterDestination' })
      screenComponent = html`<${Main} onMissionLookup=${onMissionLookup} />`
    } else if (screen == 'filterDestination') {
      const onAirportClick = (airport) => {
        this.setState({ screen: 'selectMission', destinationAirport: airport })
      }
      screenComponent = html`<${FilterDestination} airports=${airports} onAirportClick=${onAirportClick} />`
    } else if (screen == 'selectMission') {
      const { destinationAirport } = state
      const onMissionClick = (selectedMission) => {
        this.setState({ screen: 'createMission', selectedMission })
      }
      screenComponent = html`<${SelectMission} airport=${destinationAirport} onMissionClick=${onMissionClick} />`
    } else if (screen == 'createMission') {
      const { selectedMission } = state
      const onViewMissionClick = (createdMission) => {
        this.setState({ screen: 'mission', createdMission })
      }
      screenComponent = html`<${CreateMission} selectedMission=${selectedMission} onViewMissionClick=${onViewMissionClick} />`
    } else if (screen == 'mission') {
      const { createdMission } = state
      screenComponent = html`<${Mission} mission=${createdMission} />`
    } else {
      throw `Unsupported screen: ${screen}`
    }

    return html`
      <div class="container-fluid">
        <h2>${currentAirport.ident} - ${currentAirport.name}</h2>
        ${screenComponent}
      </div>
    `
  }
}

export default Game
