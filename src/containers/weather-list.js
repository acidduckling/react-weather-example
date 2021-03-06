import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import { kelvinToCelcius } from "../utlis/maths";
import GoogleMap from '../components/google-map';

class WeatherList extends Component {
  renderWeather(cityData) {
    const { name } = cityData.city;
    const { list } = cityData;
    const temps = list.map(weather => kelvinToCelcius(weather.main.temp));
    const pressures = list.map(weather => weather.main.pressure);
    const humidities = list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lng={lon} lat={lat} /></td>
        <td>
          <Chart data={temps} color="orange" units="°C" />
        </td>
        <td>
          <Chart data={pressures} color="green" units="hPa" />
        </td>
        <td>
          <Chart data={humidities} color="black" units="%" />
        </td>
      </tr>
    );
  }

  render() {
    const { weather } = this.props;
    return (
      <table className="weather-list table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (°C)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>{weather.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ weather }) => ({ weather });

export default connect(mapStateToProps)(WeatherList);
