import React, {useState, useEffect} from 'react';
import db from './firebase';
import './SelectInputForm.css';

function SelectInputForm ({id, label, show_input, options, value, setValue}){

    const [input, setInput] = useState(value);
    const [option, setOption] = useState(value);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        let exist_type = options.some(option => option === e.target.value);
        if (exist_type){
            setOption(e.target.value);
        }
        else{
            setOption('');
        }
        setValue(e.target.value);
    }

    const handleSelectChange = (e) => {
        setInput(e.target.value)
        setOption(e.target.value)
        setValue(e.target.value)
    }

    return (
        <div className='selectInputForm'>
            { label && (<label htmlFor={id}>{label}</label>)}
            <input
                id={id}
                name='type'
                type={show_input?'text':'hidden'}
                placeholder={input}
                value={input}
                onChange={handleInputChange}
            />
            <select
                id={id + 's'}
                onChange={handleSelectChange}
                value={option}
            >
                {options.map((option, i) =>  <option key={i} value={option}>{option}</option>)}
            </select>
        </div>
    )
}

export default SelectInputForm