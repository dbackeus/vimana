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
    const steps = mission.steps.map(
      ({ position, description, completed_at }) =>
        html`<li class="list-group-item list-group-item-${completed_at ? 'success' : 'warning'}">
          ${position + 1}. ${description}
        </li>`
    )

    return html`
      <ol class="list-group">
        ${steps}
      </ol>
    `
  }

  componentWillUnmount() {
    this.channel.unsubscribe()
  }
}

export default Mission
