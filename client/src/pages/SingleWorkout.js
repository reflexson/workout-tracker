import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useSettingsContext } from "../utils/GlobalState";
import { convertMetricToImperial, calcMaxRep, average } from "../utils/unitConversion";

const SingleWorkout = () => {
    // gets global context
    let [ settingsState, setSettingsState] = useSettingsContext();
    //console.log(settingsState);
    const [weightLabel, setweightLabel]= useState('lbs');
    if(settingsState.units === 'metric' && weightLabel === 'lbs'){
        setweightLabel('kg');
    }

    // get id in url
    // const location = window.location.toString();
    // const splitLocation = location.split('/');
    // console.log(splitLocation[splitLocation.length-1]);

    //temp query
    const query = [
        {
            name: 'bloop',
            
        },
        {
            name: 'bleep'
        },
        {
            name: 'bop'
        },        
    ];

    const exercises = query.map((ex) => (
        {
            name: ex.name,
            setInputs: [{reps: 0, weight: 0}]
        }
    ));
    // set set state
    let [formState, setFormState] = useState({ 
        exercises    
    });

    // form functions---------------------------------------------------------
    const addNewSet = (indE) => {
        const exercises = [...formState.exercises];
        exercises[indE].setInputs.push({reps: 0, weight: 0});
        setFormState({exercises});
    };

    const addNewExercise = () =>{
        const exercises = [...formState.exercises];
        exercises.push({
            setInputs: [{reps: 0, weight: 0}]
        });
        setFormState({exercises});
    }

    const deleteSet = (indE, indS) =>{
        const exercises = [...formState.exercises];
        exercises[indE].setInputs.splice(indS,1);
        setFormState({exercises});
    }

    const onChange = (e) =>{
        const {name, value} = e.target;
        const indE = e.target.getAttribute('indexexercise');
        const indS = e.target.getAttribute('indexset');

        const exercises = [...formState.exercises];
        exercises[indE].setInputs[indS] = {
            //keep info to specific set
            ...formState.exercises[indE].setInputs[indS],
            // set new info
            [name]: parseFloat(value)
        };
        setFormState({exercises});
    }

    // form handler
    const handleFormSubmit = async (event) => {
        //prevents form sumbitting to itself
        event.preventDefault();
        // loop through exercises
        const exercises = [...formState.exercises];
        let maxReps = [];
        for(let i = 0; i < exercises.length; i++){
            for(let j = 0; j < exercises[i].setInputs.length; j++)
            {
                let reps = exercises[i].setInputs[j].reps;
                let weight = exercises[i].setInputs[j].weight;
                maxReps[i] = calcMaxRep(reps, weight);
            }
        }
        console.log(`maxReps: ${maxReps}`);
    };
    //end of form functions------------------------------------------

    //html
    return (
      <div className=" flex-row">
        <aside className=" w3-sidebar w3-light-grey w3-bar-block" >
            <h3 className="w3-bar-item">Menu</h3>
                <Link  className="w3-bar-item w3-button"  to='/progress'>Progress</Link>
                <Link  className="w3-bar-item w3-button"  to='/workouts'>Workouts</Link>
                <Link  className="w3-bar-item  alink"  to='/settings'>Settings</Link>
                <Link  className="w3-bar-item  alink"  to='/test'>Test</Link>
                <Link  className="w3-bar-item  alink"  to='/workout/1'>SingleWorkout</Link>
        </aside>
        <br/>
        <main className="dashcont">
          <h2>Excercises</h2>
          <form onSubmit={handleFormSubmit}>
          {
            formState.exercises.map((ex, ind) => (
                <div className="exercise " key={ind}>
                    {ex.name} {ind}
                    <button onClick={(event) => {event.preventDefault(); addNewSet(ind)}}> 
                        add set
                    </button>
                    {ex.setInputs.map((set, indS) => (
                        <div className="set" key={indS}>
                            Set {indS}
                            <input type='number'
                                className="reps"
                                name='reps'
                                indexset={indS}
                                indexexercise={ind}
                                onChange={onChange}
                            /> 
                            <label>&nbsp; reps</label>
                            &nbsp; x &nbsp;
                            <input type='number'
                                    className="weight"
                                    name='weight'
                                    indexset={indS}
                                    indexexercise={ind}
                                    onChange={onChange}/> 
                            <label>&nbsp; {weightLabel}</label>
                            &nbsp;
                            <button onClick={(event) => {event.preventDefault(); deleteSet(ind, indS)}}>Delete Set</button>
                        </div>
                    ))}
                    
                </div>
          ))}
            <button type='submit'> 
                Submit
            </button>
          </form>

          form end
        </main>
      
      </div>
    );
};

export default SingleWorkout;