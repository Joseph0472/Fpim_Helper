import React from 'react'
import upArrow from '../assets/up-arrow.png'

const ScrollToTopBtn = () => {
    return (
        <div>
            <input className="goTopBtn" type="image" alt="Go Up" src={upArrow} onClick={()=>window.scrollTo(0,0)}></input>
        </div>
    )
}

export default ScrollToTopBtn
