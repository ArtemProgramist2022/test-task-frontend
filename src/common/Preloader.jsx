import React from 'react';
import preloader from './../assets/imgs/Preloader.gif'

const Preloader = (props) => {
    return (
        <div style={{display: 'inline-block'}}>
            <img className='preloader' src={preloader} alt='loading'/>
        </div>
    )
}

export default Preloader;