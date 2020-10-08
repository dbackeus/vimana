import { h, Fragment, Component } from 'preact'
import htm from 'htm'
const html = htm.bind(h)

import map from '../../map.js'

class Mission extends Component {
  state = {
    mission: this.props.mission,
  }

  componentWillMount() {
    map.previewRoute(this.props.mission.destination_airport)
    const setMission = (mission) => this.setState({ mission })

    this.channel = window.actionCableConsumer.subscriptions.create('MissionChannel', { received: setMission })
  }

  render() {
    const { mission } = this.state

    return html`
      <${Fragment}>
        <h2>${mission.description} Mission</h2>
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

export default Mission
