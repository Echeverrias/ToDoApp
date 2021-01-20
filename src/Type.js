import React, {useState} from 'react';
import './Type.css';
import {useStateValue} from './StateProvider';
import SelectInputForm from './SelectInputForm';

function Type ({show_input, defaultValue, extra_types, handleTypeChange}){

    const {types} = useStateValue();
    const id = 'type';
    const label = 'Type';

    return (
        <div className='type'>
            <SelectInputForm
                id={id}
                label={label}
                show_input={true}
                defaultValue={defaultValue}
                options={[...extra_types, ...types]}
                handleValueChange={handleTypeChange}
            />
        </div>
    )
}

export default Type