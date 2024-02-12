import { react, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Homepage() {
    const [formsubmitted, setFormSubmitted] = useState(false);
    const [buoy, setBuoy] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true)
        navigate('/buoyDisplay', {state: {buoy}})
    }

    return (
        <article> 
            <p>Choose your buoy from a list of buoys here: <a href = "https://www.ndbc.noaa.gov/to_station.shtml">List of NOAA Buoys (requires knowledge of buoy locations)</a> or <a href='https://www.ndbc.noaa.gov/'>Map of NOAA Buoys (requires knowledge of using maps)</a></p>
            <p>Get buoy data by filling out the form below after finding the station ID of your buoy of choice </p>
            <form onSubmit={ handleSubmit }>
                <fieldset>
                    <legend>Enter Buoy Station and Press Submit</legend>
                    <label htmlFor='buoyID'>Enter your Buoy ID here:</label>
                    <input
                    type='text'
                    id='buoyID'
                    maxLength='6'
                    required
                    placeholder='ex. 46327'
                    onChange={ e => setBuoy(e.target.value)}
                    autoFocus
                    ></input>

                    <button type='submit'>Submit</button>
                </fieldset>
               
            </form>
        </article>
    )
};

export default Homepage