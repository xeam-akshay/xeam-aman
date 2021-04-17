import React, {Component} from 'react';
import {connect} from 'react-redux';

class LibraryList extends Component{
    render(){
        console.log("***PROPS***: ", this.props);
        return;
    }
}

const mapStatetoProps = (state) => {
    console.log("REDUCER: ", state);
    return { libraries: state.libraries}
}

export default connect(mapStatetoProps)(LibraryList);