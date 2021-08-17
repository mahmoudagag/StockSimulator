import React, { Component } from 'react';
import './Stocks.css'

export class Stocks extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    print(data){
        //set ticker
        console.log(data)
    }

    render(){
        //{this.props.stocks.length ==0 && <div>No Stocks Owned Yet</div>}
        return(
            <div>
                {this.props.stocks.map(stock=>{
                    return(
                   <div onClick={()=>this.props.foundTicker(stock.Stocks)}>     
                        <div className="stockdiv">                      
                            <div className="stockName">{stock.Stocks}</div>
                            <div className="stockPrice"># of Stock Owned:  {stock.amountOfStock}</div>
                        </div>
                        <hr/>
                    </div>    
                    )
                })}
            </div>
        )
    }
}