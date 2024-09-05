/*
	File: 		Jobs.jsx
	Date: 		2024/08/29
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		React component that renders a list of all the jobs
                stored in the database. Each job can be clicked to open
                the ViewJob component for that job. Job details can be 
                copied directly from the list by clicking the clipboard
                icon.
*/
import './App.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuClipboardCopy } from "react-icons/lu";

// component function
function Jobs(){
    // state variable
    const [jobs, setJobs] = useState([]);

    // fetch all jobs from the database
    useEffect(() => {
        fetch('http://localhost:5000/jobs', {
            method: 'GET'
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setJobs(data);
        })
    });

    // component structure
    return(
        <div className='main'>
            {/* notification when copied to clipboard */}
            <div className='notification'>
                <div className='success' id='copied'><p>Copied to clipboard.</p></div>
            </div>
            
            <h3>All Jobs</h3>
            <div className='jobsList'>

                <div className='jobTitles'>
                    <p className='name'>Client</p>
                    <p className='date'>Job Date</p>
                    <p className='number'>Phone</p>
                </div>

                {/* map each job to an element to form the list */

                jobs.map((job) => (
                <div className='container' key={job._id}>

                    <Link className='jobLink' to={'/jobs/view?jobId=' + job._id} target="" >
                        <div className='name'>
                            <p>{job.clientName}</p>
                            <p className='email'>{job.email}</p>
                        </div>
                        <div className='date'>
                            <p>{("" + job.jobDate).substring(0, 10)}</p>
                        </div>
                        <div className='number'>
                            <p>{job.phone1}</p>
                        </div>
                    </Link>

                    <div className='icon' onClick={() => {copyDetails(job.plaintext)}}>
                        <LuClipboardCopy size={22}/>
                    </div>

                </div>
                ))}
                
            </div>
        </div>
    )
}

// copy the job details to the clipboard
function copyDetails(text){
    // get notification element
    let notification = document.getElementById('copied');

    // copy details
    navigator.clipboard.writeText(text);

    // display copied notification for 3s
    notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);

}

export default Jobs;