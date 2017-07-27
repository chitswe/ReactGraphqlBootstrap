import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default (props)=>(<CircularProgress {...props} style={{position:'absolute',top:'50%',left:'50%',transform:"translate(-50%,-50%)"}}/>)