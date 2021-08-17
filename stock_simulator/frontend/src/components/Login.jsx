import React, { Component } from 'react';

export class Login extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='container'>
                <div className="header">Sign In</div>
                {this.props.error && <div className="LoginError">Invalid username or password</div>}
                <div className='loginDiv'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input name="username" onChange={this.props.handleChange} type="text" className="form-control input" id="username" aria-describedby="emailHelp" placeholder="Enter Username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input name="password" onChange={this.props.handleChange} type="password" className="form-control input" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary button" onClick={this.props.handleSubmit}>Continue</button>
                    </form>
                </div>
                <button type="submit" className="btn" onClick={()=>this.props.onSwitch()}>Register</button>
            </div>
        )
    }
}


