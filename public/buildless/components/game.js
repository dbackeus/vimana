import { h, Component } from 'preact'
import htm from 'htm'
const html = htm.bind(h)

import Main from 'components/game/Main'
import FilterDestination from 'components/game/FilterDestination'
import Mission from 'components/game/Mission'
import CreateMission from 'components/game/CreateMission'
import SelectMission from 'components/game/SelectMission'

class Game extends Component {
  state = {
    screen: window.currentMission ? 'Mission' : 'Main',
    destinationAirport: null,
    selectedMission: null, // { description, reward, airport }
    createdMission: window.currentMission || null, // Mission#to_json
  }

  render(props, state) {
    const { screen } = state
    const maybeCurrentAirportHeader = screen != "Mission" && html`<h2>${currentAirport.ident} - ${currentAirport.name}</h2>`
    const renderScreenFunction = this[`render__${screen}`].bind(this)

    return html`
      <div class="container-fluid">
        ${maybeCurrentAirportHeader}
        ${renderScreenFunction()}
      </div>
    `
  }

  render__Main() {
    const onMissionLookup = () => this.setState({ screen: 'FilterDestination' })

    return html`<${Main} onMissionLookup=${onMissionLookup} />`
  }

  render__FilterDestination() {
    const { airports } = this.props
    const onAirportClick = (airport) => {
      this.setState({ screen: 'SelectMission', destinationAirport: airport })
    }

    return html`<${FilterDestination} airports=${airports} onAirportClick=${onAirportClick} />`
  }

  render__SelectMission() {
    const { destinationAirport } = this.state
    const onMissionClick = (selectedMission) => {
      this.setState({ screen: 'CreateMission', selectedMission })
    }

    return html`<${SelectMission} airport=${destinationAirport} onMissionClick=${onMissionClick} />`
  }

  render__CreateMission() {
    const { selectedMission } = this.state
    const onViewMissionClick = (createdMission) => {
      this.setState({ screen: 'Mission', createdMission })
    }

    return html`<${CreateMission} selectedMission=${selectedMission} onViewMissionClick=${onViewMissionClick} />`
  }

  render__Mission() {
    const { createdMission } = this.state

    return html`<${Mission} mission=${createdMission} />`
  }
}

export default Game
