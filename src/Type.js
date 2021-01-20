import React, {useState} from 'react';
import db from './firebase';

function Type ({show_input, type, label, setType, types, extra_types}){

    const [type_, setType_] = useState(type)
    const handleInputChange = (e) => {
        setType(e.target.value);
        console.log(types)
        console.log(e.target.value);
        console.log(types.includes(e.target.value))
        console.log(types.includes('ocio'))
        console.log('ocio' === e.target.value)
        let exist_type = types.some(type => type.name === e.target.value)
        if (exist_type){
            setType_(e.target.value)
        }
        else{
            setType_('');
        }
    }
    const handleSelectChange = (e) => {
        setType(e.target.value)
        setType_(e.target.value)
    }

    return (
        <div className='type'>
            <label for='type'>{label || 'Type'}:</label>
            <input id='type' name='type' type={show_input?'text':'hidden'} placeholder={type} value={type} onChange={handleInputChange}/>
            <select id='types' onChange={handleSelectChange} value={type_}>
                {extra_types.map((type, i) =>  <option key={i} value={type.name}>{type.name}</option>)}
                {types.map((type, i) =>  <option key={i} value={type.name}>{type.name}</option>)}
            </select>
        </div>
    )
}

export default Type