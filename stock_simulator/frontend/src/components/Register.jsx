import React, { Component } from 'react';

export class Register extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='container'>
                <div className="header">Register</div>
                {this.props.error.error && <div className="LoginError">{this.props.error.type}</div>}
                <div className='loginDiv'>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="firstname">First name</label>
                                <input onChange={this.props.handleChange} name="firstname" type="text" className="form-control input" id="Name" placeholder="first name"/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastname">Last Name</label>
                                <input onChange={this.props.handleChange} name="lastname" type="text" className="form-control input" id="lastname" placeholder="last name"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input onChange={this.props.handleChange} name="username" type="text" className="form-control input" id="username"  placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input onChange={this.props.handleChange} name="email" type="email" className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input onChange={this.props.handleChange} name="password" type="password" className="form-control input" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary button" onClick={this.props.handleSubmit}>Sign Up</button>
                    </form>
                </div>
                <button type="submit" className="btn" onClick={()=>this.props.onSwitch()}>Sign In</button>
            </div>
        )
    }
}
