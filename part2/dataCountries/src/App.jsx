/*Fetch:
fetch('https://api.openweathermap.org/data/3.0/onecall?lat=64&lon=26&appid=45da62ea28cacaf70f94cf76c2101503').then(res => {
    if (res.status === 401){console.log('Unauthorized')}else{console.log(res)} }).catch(e => console.log('Could not get data:', e))
*/


import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const DisplayCountries = (props) => {
  const len = props.countriesFiltered.length
  if (len > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (len > 1) {
    return (
      <div>
        {props.countriesFiltered.map((c,i) => {
          // TODO: Implement show button
          return (
            <p>
              <div key={i}>{c.name.common}</div>
              <button>Show</button> 
            </p>
          )
        })}
      </div>
    )
  } else if (len === 1) {
    const countryForView = props.countriesFiltered[0]
    const langs = countryForView.languages

    // TODO: Finish weather info implementation
    const lat = countryForView.latlng[0] 
    const lon = countryForView.latlng[1]

    props.getWeather(lat, lon)
    
    return (
      <div>
        <h1>{countryForView.name.common}</h1>
        <p>Capital {countryForView.capital}</p>
        <p>Area {countryForView.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(langs).map((lang, i) => <li key={i}>{lang}</li>)}
        </ul> 
        <img src={countryForView.flags.png} />
        <h2>Weather in {countryForView.capital}</h2>
        <p>Temperature {} Celsius</p>
        <img />
        <p>Wind {}</p>
      </div>
    )
  } 
}


const App = () => {
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [weatherCapital, setWeatherCapital] = useState(null)

  const hook = () => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(( {data} ) => 
      setCountries((data)))
  }

  useEffect(hook, [])

  const getWeather = (lat, lon) => {
    const weatherHook = () => {
      const appId = 'd9ca3d188456fdd24678511c1f65c9fe'
      axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${appId}`).then(res => {
        console.log(res)
      })
    }
    
    useEffect(weatherHook, [])
  }



  if (!countries) {
    return null
  }

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const filtered = countries.filter(c => c.name.common.toLowerCase().includes(country)) 
  console.log('country is', country)
   
  return (
    <div>
      <p>find countries <input onChange={handleCountryChange} value={country} /></p>
      <DisplayCountries countriesFiltered={filtered} getWeather={getWeather}/>
    </div>
  )
}

export default App
