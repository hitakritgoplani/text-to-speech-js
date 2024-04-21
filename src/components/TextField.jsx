import React, {useState} from 'react'
import '../styles/TextField.css'

export default function TextField(props) {

    const [text, setText] = useState('');

    const handleChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        props.onTextChange(newText); // Call the callback function passed from the parent
    };

    return (
        <div className='text-root'>
            <textarea className="text-field" placeholder="Type something here..." value={text} onChange={handleChange} />
        </div>
    );
};

