import React, {useState, useEffect} from 'react';
import './SelectInputForm.css';

function SelectInputForm ({id, label, show_input, placeholder, defaultValue, options, handleValueChange}){

    const [input, setInput] = useState(defaultValue);
    const [option, setOption] = useState(defaultValue);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        let exist_type = options.some(option => option === e.target.value);
        if (exist_type){
            setOption(e.target.value);
        }
        else{
            setOption('');
        }
        handleValueChange(e);
    }

    const handleSelectChange = (e) => {
        setInput(e.target.value);
        setOption(e.target.value);
        handleValueChange(e);
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