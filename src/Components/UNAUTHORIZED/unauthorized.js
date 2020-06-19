import React, { useState } from 'react'
import './unauthorized.css'
import { Tooltip } from 'reactstrap'
import { Link } from 'react-router-dom';


const Unauthorized = () => {
  const [tooltipopen, setToolTipOpen] = useState(false)

  const toggle = () => setToolTipOpen(!tooltipopen)

  return (
    <>
      <Link to="/"><div className="backgroundimg" id="tooltip"></div></Link>

          <Tooltip placement="left" isOpen={tooltipopen} target="tooltip" toggle={toggle}>CLICK ON THE IMAGE TO GO TO LOGIN PAGE</Tooltip>
    </>
  )
}


export default Unauthorized