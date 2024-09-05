/*
	File: 		ViewJob.jsx
	Date: 		2024/08/29
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		React component that displays the plaintext
                from a job. The three buttons at the bottom of
                the page allow for deleting, editing, and
                copying of the jobs' details.
*/

import './App.css';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// component function
function ViewJob(props){

    // state variables
    const [job, setJob] = useState([]);

    // for getting parameters from url
    let [searchParams] = useSearchParams();

    // get job id from url
    const id = searchParams.get('jobId');

    // api request to retrieve job details using id
    useEffect(() => {
        fetch('http://localhost:5000/jobs/' + id, {
            method: 'GET'
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setJob(data);   // save job details to state
        })
    });

    // delete button handler
    // deletes the job
    function deleteJob(){
        // confirm deleting this job (could be accidentally clicked)
        if (window.confirm("Are you sure you want to delete this job? \nThis cannot be undone.")) {
            // user confirmed, delete the job
            try{
                fetch("http://localhost:5000/jobs/delete/" + id, {
                    method: 'DELETE',
                })
                .then(() => {
                    window.location.href = '/jobs'; // ViewJob for the job no longer exists, return to jobs list
                });
            }
            catch(e){
                console.log(e); // catch errors
            }
          } 
    }

    // copy button handler
    // copies job plaintext to the clipboard
    function copyJob(text){
        // get notification element
        let notification = document.getElementById('copied');

        navigator.clipboard.writeText(text);

        notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
    }

    return(
        <>
            {
            // if job exists
            job ?
            // render the view job page
            <div className='main jobInfoContainer'>
                <div className='notification'>
                    <div className='success' id='copied'><p>Copied to clipboard.</p></div>
                </div>

                
                {/*}
                <div>
                    <label>Customer</label>
                    <p>{job.clientName}</p>
                </div>
                
                <div>
                    <label>Email</label>
                    <p>{job.email}</p>
                </div>

                <div>
                    <label>Phone</label>
                    <p>{job.phone1}</p>
                </div>

                <div>
                    <label>Alt. Phone</label>
                    <p>{job.phone2}</p>
                </div>
                
                <div>
                    <label>Date</label>
                    <p>{job.jobDate} PST</p>
                </div>

                <div>
                    <label>Time</label>
                    <p>{job.jobTime}</p>
                </div>

                <div>
                    <label>Move From Address</label>
                    <p>{"" + job.street1 + ", " + job.city1}</p>
                </div>

                <div>
                    <label>Move To Address</label>
                    <p>{"" + job.street2 + ", " + job.city2}</p>
                </div>

                <div>
                    <label>Other</label>
                    <p>{job.notes}</p>
                </div>
                */}
                
                {/* render the plain text */}
                <div>
                    <h5>Viewing job #{job._id}</h5>
                </div>
                <div class='plainContainer'>   
                    <p id='plain'> {job.plaintext} </p>
                </div> 

                {/* buttons */}
                <div className='jobButtons'>
                    <button className='jobButton' id='delete' onClick={deleteJob}>Delete this job</button>
                    <Link className='jobButton' id='update' to={'/jobs/update?jobId=' + job._id} target="">Edit this job</Link>
                    <button className='jobButton' id='copy' onClick={() => {copyJob(job.plaintext)}}>Copy job details</button>
                </div>
            </div>
            : // if job is null
            <div className="main">
                <p>Job does not exist.</p>
            </div>
            }
        </>
        
    );
}

export default ViewJob;