import React, { Component } from 'react';
import {NavBar} from './NavBar'
import {Chart} from './Chart'
import {SideBar} from './SideBar'
import {NetworthChart} from './NetworthChart'
import {Stocks} from './Stocks'
import {BuySideBar} from './BuySideBar'
import {History} from './History'
import './SideBar.css'
import './Stocks.css'


export class MainMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            TickerSymbol:"",
            isHome:true,
            user:this.props.user,
            viewHisory:false,
            stocks:[],
        }
        this.foundTicker = this.foundTicker.bind(this)
        this.updateUser =this.updateUser.bind(this)
        this.updateStock=this.updateStock.bind(this)
        this.returnHome=this.returnHome.bind(this)
        this.viewHistory=this.viewHistory.bind(this)
    }

    updateUser(user){
        this.setState({user:user})
    }
    updateStock(data,stock){
        var arr = this.state.stocks.filter(s=>s.Stocks!=stock)
        if(data== 'Item succsesfully delete!'){
            this.setState({
                stocks:arr
            })
        }else{
            arr.push(data)
            this.setState({
                stocks: arr
            })
        }
    }

    viewHistory(){
        this.setState({
            viewHisory:true,
            isHome:false
        })
    }

    foundTicker(ticker){
        console.log(ticker)
        this.setState({
            isHome:true,
            TickerSymbol:ticker
        })
        this.setState({
            isHome:false,
            TickerSymbol:ticker
        })
    }
    
    returnHome(){
        this.setState({
            isHome:true,
            viewHisory:false
        })
    }
    
    componentDidMount(){
        fetch(`http://127.0.0.1:8000/api/user-stocks/${this.state.user.username}/`)
        .then(response=>response.json())
        .then(data=>{
            this.setState({
            stocks:data,})
            console.log(data)
        })
    }


    render() {
        var chart, sidebar, scrollable
        if(this.state.isHome){
            chart=<NetworthChart user={this.state.user} TickerSymbol={this.state.TickerSymbol}/>
            sidebar=<Stocks foundTicker={this.foundTicker} stocks={this.state.stocks} />
            scrollable="sidebarscroll"
        }else{
            chart =<Chart TickerSymbol={this.state.TickerSymbol}/>
            sidebar=<BuySideBar updateStock={this.updateStock} stocks={this.state.stocks} updateUser={this.updateUser} user={this.props.user} TickerSymbol={this.state.TickerSymbol}/>
            scrollable=""
        }
        return(  
            <div>
                <NavBar viewHistory={this.viewHistory} returnHome={this.returnHome} user={this.state.user} TickerSymbol={this.state.TickerSymbol} foundTicker={this.foundTicker}/> 
                {!this.state.viewHisory &&
                <div className="main ">
                    {chart} 
                    <div className={`SideBar ${scrollable}`}>
                       {sidebar}                        
                    </div>
                </div>}
                {this.state.viewHisory &&<History user={this.state.user}/>}
            </div>
        )
    }
}