import React from 'react';
import { Redirect } from 'react-router-dom';


class Logout extends React.Component{
    constructor(props){
        super(props)
        this.state={
            emptyLocalStorage:false
        }
    }

    componentDidMount=()=>{
        localStorage.clear()
        sessionStorage.clear()

        this.setState({
            emptyLocalStorage:true
        })
    }

    render(){
        return(
            <>

            {this.state.emptyLocalStorage && <Redirect to="/" /> }

            </>
                    
   
        )
    }
}


export default Logout;