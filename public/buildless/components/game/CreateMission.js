import { h, Fragment, Component } from 'preact'
import htm from 'htm'
const html = htm.bind(h)

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
    const ident = this.props.selectedMission.airport.ident
    const { description } = this.props.selectedMission

    fetch('/missions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mission: { destination_airport_ident: ident, description } }),
    })
      .then((response) => response.json())
      .then((mission) => { this.setState({ createdMission: mission }) })
      .catch((error) => this.setState({ error }))
  }
}

export default CreateMission
