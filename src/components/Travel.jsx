import React, { useEffect, useState } from 'react';
import "./Travel.css";

function Travel(props){
	const [duration, setDuration] = useState(0);

	const handleChange = (event) => {
		setDuration(event.target.value);
	}

	// get default time value from props
	useEffect(() => {
		if(props.defaultValue){
			setDuration(props.defaultValue);
		}
	}, [props.defaultValue])

	const calculateDuration = async (event) => {
		
		event.preventDefault();
		
		/* try {
			const response = await axios.get(url); 
			const result = response.data;
			console.log(response.status);
			const duration = result.rows[0].elements[0].duration.text;
			setDuration(duration);
		} catch (error) {
			console.error('Error fetching data: ', error);
		}*/

		const origins = document.getElementById('addy1').value +" "+ document.getElementById('city1').value +" Canada"; //addy1 + city1 + "Canada"
		
		const destinations = document.getElementById('addy2').value +" "+ document.getElementById('city2').value + " Canada"; //addy2 + city2 + "Canada"
		
		try{
			const response = await fetch(`http://localhost:5000/api/distance?origins=${origins}&destinations=${destinations}`);

			const data = await response.json()
			setDuration(((data.rows[0].elements[0].duration.value)/60).toFixed(0) * 1);
		}
		catch(error){
			console.log(error);
		}

	};

  	return (
		<div className='container'>
			<h5>Travel Time (minutes)</h5>
			<div className='tbox2'>
				<input type="number" id = "ttime" value = {duration} onChange={handleChange}  />
				<button onClick={calculateDuration}>Calculate</button>
			</div>
		</div>
  	);
};

export default Travel;