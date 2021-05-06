import React from 'react'
import '../../styles/Loader.css'

const Loader = () => (
    <div className="Loader">
        <p className="Loader-content">
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </p>
    </div>
)

export default Loader