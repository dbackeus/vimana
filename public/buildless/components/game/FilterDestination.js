import { h, Fragment, Component } from 'preact'
import htm from 'htm'
const html = htm.bind(h)

import { distance, bearing } from 'helpers'

class FilterDestination extends Component {
  state = {
    distance: '0..50',
  }

  render({ airports, onAirportClick }, state) {
    const [distanceStart, distanceEnd] = state.distance.split('..').map((string) => parseInt(string))
    const minimumAirportSize = distanceEnd >= 500 ? 3 : 2

    const filteredAirports = airports
      .filter((airport) => airport.size >= minimumAirportSize)
      .map((airport) => ({
        ...airport,
        distance: distance(currentAirport, airport),
        heading: bearing(currentAirport, airport),
      }))
      .filter((airport) => airport.distance > distanceStart && airport.distance < distanceEnd)
      .sort((a, b) => (a.distance > b.distance ? 1 : -1))

    map.updateAirports(filteredAirports)
    map.zoomIncludingDistance(distanceEnd)

    const rows = filteredAirports.map((airport) => {
      return html`
        <tr
          class="game-row"
          onClick=${onAirportClick.bind(this, airport)}
          onMouseOver=${this.onAirportHover.bind(this, airport)}
        >
          <td>${airport.name}</td>
          <td>${['Tiny', 'Small', 'Large'][airport.size - 1]}</td>
          <td>${Math.round(airport.distance)} NM</td>
          <td>${Math.round(airport.heading)}°</td>
        </tr>
      `
    })

    return html`
      <${Fragment}>
        <h3>Select destination airport</h3>
        <label for="distance-filter" class="form-label">Distance</label>
        <select onchange=${this.onSelectDistance.bind(this)} class="form-select" id="distance-filter">
          <option value="0..50">Close (0-50 NM)</option>
          <option value="50..100">Nearby (50-100 NM)</option>
          <option value="100..250">National (100-250 NM)</option>
          <option value="250..500">International (250-500 NM)</option>
          <option value="500..1000" disabled>Long (500-1000 NM)</option>
        </select>
        <table class="table">
          <thead>
            <th>Name</th>
            <th>Size</th>
            <th>Distance</th>
            <th>Heading</th>
          </thead>
          <tbody onMouseOut=${() => map.updateAirports(filteredAirports)}>
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

export default FilterDestination
