/**
 * Created by ChitSwe on 2/25/17.
 */
import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import SiteSnackbar from './components/SiteSnackbar';
import NavDrawer from './NavDrawer';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
class Layout extends React.Component{
    constructor(){
        super(...arguments);
        this.state={
            loading:true
        };
    }
    componentDidMount(){
        this.setState({loading:false});
    }
    render(){
        return (
            <div>
                <div className={`fullheight layout-root ${this.state.loading? 'hide': ''}`}>
                    {this.props.children}
                    <SiteSnackbar/>
                </div>

                <img className={`loader-ripple ${this.state.loading? '': 'hide'}`} src="/img/ripple.gif"/>
            </div>
        );
    }
}

Layout.PropTypes = {
    children:PropTypes.element
};
export default Layout;
