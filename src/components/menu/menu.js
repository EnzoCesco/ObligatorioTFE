import React from 'react';
import './menu.css';
import { connect } from 'react-redux';

export class Menu extends React.Component {

    constructor(){
        super();
        this.state = {
        }
    }


    render(){
        return( 
                <>
                <h1>MENUUUUUUUUUUU</h1>
                </>
        )
    }
    ;

}



let mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => {
    return{
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
