import React from 'react'
import "../../src/App.css";
import Iframe from 'react-iframe';


const Forum = () => {
    return (
        <div>
            <Iframe url="http://www.yontembilim.com/forum/"
                width='100%'
                height='1300px'
                scrolling='yes'
                frameborder="0"></Iframe>
        </div>
    )
}

export default Forum