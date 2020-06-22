import React,{useState} from 'react';
import {Tooltip} from 'reactstrap';
import './styles.css';


const Emptyfiles =()=>{

    const [tooltipopen,setToolTipOpen]=useState(false)

    const toggle=()=> setToolTipOpen(!tooltipopen)
    
    
    return(
        <div>
            <div style="emptyfolder">ADD SOME FILES </div>
            <Tooltip placement="right" isOpen={tooltipopen} target="tooltipexample" target={toggle}>No folder of files. </Tooltip>
        </div>
    )

}


export default Emptyfiles;