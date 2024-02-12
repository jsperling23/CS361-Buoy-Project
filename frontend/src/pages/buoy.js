import React from 'react';
import { useLocation } from 'react-router-dom';
import { react, useState, useEffect } from 'react';

//Function to fetch the buoy data
async function getBuoyData (stationId) {
    const response = await fetch(`http://localhost:5000/request?stationId=${stationId}`)
    const data = (await response).json()
    return data
} 

//Main component of this page
function Buoy () {
    const location = useLocation()
    const [buoyData, setData] = useState(null)
    const [units, setUnits] = useState("imperial")
    const [prevUnits, setPrevUnits] = useState(units)
    const [height, setHeight] = useState(null)
    const [heightUnit, setHeightUnit] = useState("Feet")
    const [windUnit, setWindUnit] = useState("MPH")
    const [waterUnit, setWaterUnit] = useState("°F")
    const [water, setWater] = useState(null)
    const [wind, setWind] = useState(null)
    const buoyId = location.state?.buoy

    //Call the getBuoyData function and set the state of buoyData
    useEffect(() => {
        async function fetchData() {
            try{
                const response = await getBuoyData(buoyId);
                setData(response);

                if (!isNaN(response.WVHT)) {
                  setHeight(response.WVHT * 3.28084)
                } else{setHeight(response.WVHT)};

                if (!isNaN(response.WTMP)) {
                  setWater(response.WTMP * 1.8 + 32)
                } else{setWater(response.WTMP)};

                if (!isNaN(response.WSPD)) {
                  setWind(response.WSPD * 2.23694)
                }else {setWind(response.WSPD)};
            
            }
            catch(error){
                console.error("The following error has occurred: ", error)
            }
        }
        fetchData();
    }, [buoyId, units, prevUnits])

    //Handle swapping units
    const handleUnitChange = (event) => {
      setPrevUnits((prevUnits) => {
        const newUnits = event.target.value;
        setUnits(newUnits);

        if (newUnits === "imperial") {
          setHeightUnit("Feet");
          setWaterUnit("°F");
          setWindUnit("MPH");
        } else {
          setHeightUnit("Meters");
          setWaterUnit("°C");
          setWindUnit("M/S");
        }

        return prevUnits;
      });
    };

    //handle change from swapping 
    useEffect(() => {
      if (prevUnits !== units) {
        if (units === "imperial") {

          if (!isNaN(height)) {
            setHeight(height * 3.28084)
          };

          if (!isNaN(water)) {
            setWater(water * 1.8 + 32)
          };
          
          
          if (!isNaN(wind)) {
            setWind(wind * 2.23694)
          };


        } else {

          if (!isNaN(height)) {
            setHeight(height * 0.3048)
          };

          if (!isNaN(water)) {
            setWater((water - 32) * 5/9)
          };
          
          if (!isNaN(wind)) {
            setWind(wind * 0.44704)
          };

         
        }
      }
    }, [buoyData, units]);
    
    //HTML to be returned by function, depends on if the fetch promise returned 
    
    return (
        <div>
          <header>Current Data For Station {buoyId}</header>
          {buoyData ? (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Data</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Wave Height</td>
                    <td>{ height.toFixed(2) }</td>
                    <td>{ heightUnit }</td>
                  </tr>
                  <tr>
                    <td>Period</td>
                    <td>{ buoyData.DPD }</td>
                    <td>Seconds</td>
                  </tr>
                  <tr>
                    <td>Swell Direction</td>
                    <td>{ buoyData.MWD }</td>
                    <td>Degrees</td>
                  </tr>
                  <tr>
                    <td>Wind Speed</td>
                    <td>{ wind }</td>
                    <td>{ windUnit }</td>
                  </tr>
                  <tr>
                    <td>Wind Direction</td>
                    <td>{ buoyData.WDIR }</td>
                    <td>Degrees</td>
                  </tr>
                  <tr>
                    <td>Water Temperature</td>
                    <td>{ water.toFixed(2) }</td>
                    <td>{ waterUnit }</td>
                  </tr>
                </tbody>
              </table>
              <input type="radio" id="imperial" checked={units === "imperial"} onChange={handleUnitChange} name="units" value="imperial"/>
              <label htmlFor="html">Imperial</label><br/>
              <input type="radio" id="metric" checked={units === "metric"} onChange={handleUnitChange} name="units" value="metric"/>
              <label htmlFor="html">Metric</label>
              <p>MM indicates that the buoy does not collect that information<br/>Click the naviation link below to try again</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );   
}

export default Buoy