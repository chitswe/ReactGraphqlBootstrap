/**
 * Created by ChitSwe on 2/25/17.
 */
import React from 'react';
class Home extends React.Component{
    render(){
        return (<h1>Hello</h1>);
    }
    componentDidMount(){
    	document.title="Site Home";
    }
}

export default Home;