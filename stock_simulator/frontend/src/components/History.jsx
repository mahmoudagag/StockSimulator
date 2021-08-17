import React, { Component } from 'react';
import './History.css'

export class History extends React.Component {
    constructor(props){
        super(props);
        this.state={
            history:[]
        }
    }

    componentDidMount(){
        fetch(`http://127.0.0.1:8000/api/user-history/${this.props.user.username}/`)  
        .then(response=>response.json()) 
        .then(data=>{
            console.log(data)
            this.setState({
                history:data
            })
        }).catch(e=>{
          console.error(e)
      })
    }

    parseTime(time){
        time = time.slice(0,16)
        var t =time.slice(10,12)
        var newtime = time.replace(t," ")
        return newtime
    }

    render(){
        return(
            <div className="History">
                <div className="HistoryName">{this.props.user.username} History</div>
                {this.state.history.map(stock=>{
                    return(
                        <div className="indhistory">
                            <div className="HistoryStockName">{stock.Stock}</div>
                            {stock.isBought && <div className="HistoryAmount"> Bought {stock.amountOfStock}</div>}
                            {!stock.isBought && <div className="HistoryAmount"> Sold {stock.amountOfStock}</div>}
                            
                            <div className="HistoryTime">Time: {this.parseTime(stock.Time)}</div> 
                        </div>
                    )   
                })}
            </div>
        )
    }
}