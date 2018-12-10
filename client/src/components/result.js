import React from 'react'
import { Line, HorizontalBar } from 'react-chartjs-2'

const Result = ({app}) => {
    const dataDefined = app.state.data.length === 0 ? 'hide data' : 'data'

    // Data for line chart
    const lineTestData = ()  => {
        if (app.state.data.length === 0) return []
        else {
            const dataSet = {
                labels: app.state.data.filter(x => x.emissions !== null && x.year >= app.state.yearValue.min && x.year <= app.state.yearValue.max).map(x => x.year),
                datasets: [
                {
                    label: `Emissions ${app.state.capita ? "(t) per capita" : "(kt)"} of ${app.state.data[0].country}`,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: app.state.data.filter(x => x.emissions !== null).map(x => app.state.capita ? (1000*x.emissions/x.population).toFixed(2) : x.emissions)
                }
                ]
            }
            return dataSet
        }
    }

    // Data for horizontal bar chart
    const barData = () => {
        if (app.state.data.length === 0) return []
        else {
            const country = app.state.cumulativeCountry
            let cumulativeCountries = app.state.cumulative
            // TODO check that country doesnt exist in cumu
            cumulativeCountries = cumulativeCountries.concat(country)
            const dataSet = {
                labels: Array.from(cumulativeCountries.map(x => x.Country)),
                datasets: [
                {
                    label: `Comparison of cumulative emissions ${app.state.capita ? "(t) per capita " : "(gt) "}from ${country[0].Min} to ${country[0].Max}`,
                    fill: false,
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: Array.from(app.state.capita ? cumulativeCountries.map(x => x.Capita) : cumulativeCountries.map(x => x.Emission))
                }
                ]
            }
            return dataSet
        }
    }

    let i = 0

    // Returns all visualizations, line and bar charts and the data table
    return (
        <div className={dataDefined}>
          <Line className='line' data={lineTestData} width={5} height={2} options={{maintainAspectRatio: true}} />
          <HorizontalBar data={barData} />
          <table className="dataTable">
            <thead>
            <tr>
              <th>Year</th>
              <th>Emissions (kt)</th>
              <th>Per capita (t)</th>
              <th>% of world</th>
            </tr>
            </thead>
            <tbody>
            {app.state.data.filter(x => x.emissions !== null).map(x => 
              <tr key={i++}>
                <th>{x.year}</th>
                <th>{x.emissions.toLocaleString()}</th>
                <th>{(1000*x.emissions/x.population).toFixed(2)}</th>
                <th>{(100*x.emissions/app.state.world.find((val) => val.year === x.year).emissions).toFixed(2)}%</th>
              </tr>
            )}
            </tbody>
          </table>
        </div>
    )
}

export default Result

