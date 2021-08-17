import React, { Component } from 'react';

export class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            TickerSymbol:""
        }
        this.searchTicker = this.searchTicker.bind(this);
        this.handleTickerChange =this.handleTickerChange.bind(this)
    }
    searchTicker(e){
        e.preventDefault()
        fetch(`https://financialmodelingprep.com/api/v3/quote-short/${this.state.TickerSymbol}?apikey=e8f8af12e3920a96c74be21d7cd2b8e3`)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            if(data.length !== 0){
                console.log(data)
                this.props.foundTicker(this.state.TickerSymbol)
            }
        })
    }

    handleTickerChange(e){
        var value = e.target.value.toUpperCase()
        console.log(value)
        this.setState({
            TickerSymbol:value
        })
        console.log(this.state.TickerSymbol)
    }
    

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Stock Simulator</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a onClick={this.props.returnHome} className="nav-link " aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link">{this.props.user.CashInHand}</div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={this.props.viewHistory}>History</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">{this.props.user.username}</a>
                                </li>
                            </ul>
                        </div>
                    <form className="form-inline">
                        <input onChange={this.handleTickerChange} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.searchTicker}>Search</button>
                    </form>
                    </div>  
                </nav>
            </div>
        )
    }
}