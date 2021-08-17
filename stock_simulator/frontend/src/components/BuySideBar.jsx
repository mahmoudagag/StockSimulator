import React, { Component } from 'react';

export class BuySideBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CashInHand:this.props.user.CashInHand,
            user:this.props.user,
            isUserBuying:true,
            Stock: this.props.TickerSymbol,
            price:"",
            maxStockAmount:"",
            maxMoneyAmount:"",
            currStock:0,
            currMoney:0,
        }
        this.switchSideBar = this.switchSideBar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleUserSubmit = this.handleUserSubmit.bind(this)
        this.handleStockSubmit =this.handleStockSubmit.bind(this)
        this.handleHistorySubmit =this.handleHistorySubmit.bind(this)
        this.getCookie=this.getCookie.bind(this)
        this.resetbar=this.resetbar.bind(this)
    }

    switchSideBar(){
        var maxStockAmount=0
        var maxMoneyAmount =0
        if (this.state.isUserBuying){
            this.props.stocks.map(stock=>{
                if(stock.Stocks==this.state.Stock){
                    maxStockAmount = stock.amountOfStock
                }
            })
            maxMoneyAmount = this.state.price*maxStockAmount
        }
        else{
            maxStockAmount = Math.floor(this.state.CashInHand/this.state.price)
            maxMoneyAmount = maxStockAmount*this.state.price}
        this.setState({
            isUserBuying: !this.state.isUserBuying,
            maxStockAmount,
            maxMoneyAmount,
            currStock:0,
            currMoney:0,
        })
    }
    

    componentDidMount(){
        fetch(`https://financialmodelingprep.com/api/v3/quote-short/${this.state.Stock}?apikey=e8f8af12e3920a96c74be21d7cd2b8e3`)
        .then(response => response.json())
        .then(data =>{
            var price = data[0].price
            var maxStockAmount = Math.floor(this.state.CashInHand/price)
            var maxMoneyAmount = maxStockAmount*price
            this.setState({
                price,
                maxStockAmount,
                maxMoneyAmount,
            })
        }).catch(e=>{
            console.error(e)
        })
    }

    handleChange(e){
        //set user stock in the main menu equal to the data recieved in userstock via prop function

        // make userstocks negative
        // add price not subtract in user
        var name = e.target.name
        var value = e.target.value
        var currStock ,currMoney, stockamt, historyamt,usercash
        if(name=="stock"){
            currStock =value
            currMoney = this.state.price *value 
        }else{
            currMoney = value
            currStock = value/this.state.price
        }
        usercash =parseInt(currMoney)
        stockamt= parseInt(currStock)
        historyamt = parseInt(currStock)
        if (this.state.isUserBuying === false){
            usercash *=-1
            stockamt*=-1
        }
        if(currMoney<=this.state.maxMoneyAmount){
            this.setState({
                currStock:parseInt(currStock),
                currMoney:parseInt(currMoney),
                user:{
                    ...this.state.user,
                    CashInHand: parseInt(this.state.CashInHand -usercash)
                },
                UserStocks:{
                    Stocks:this.state.Stock,
                    amountOfStock:stockamt,
                },
                History:{
                    isBought:this.state.isUserBuying,
                    Stock:this.state.Stock,
                    amountOfStock:historyamt,
                }
            })
        }
        console.log(this.state)
    }

    getCookie(name){
        var cookieValue = null;
        if(document.cookie && document.cookie !== ''){
          var cookies = document.cookie.split(';')
          for(var i =0; i<cookies.length;i++){
            var cookie =cookies[i].trim()
            if(cookie.substring(0,name.length+1)===(name+'=')){
              cookieValue= decodeURIComponent(cookie.substring(name.length+1))
              break
            }
          }
        }
      }

    handleSubmit(e){
        e.preventDefault()
        this.resetbar()
        if(this.state.currStock){
            this.handleUserSubmit()
        }

    }
    //submit user info
    handleUserSubmit(){
        var csrftoken = this.getCookie('csrftoken')
    
        fetch(`http://127.0.0.1:8000/api/cash-update/${this.state.user.username}/`,{
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            'X-CSRFToken':csrftoken,
          },
          body: JSON.stringify(this.state.user)
        }).then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.setState({
            CashInHand:data.CashInHand,
            user:data
            ,})
        }).catch(e=>{
            console.log(e)
        })

        this.handleStockSubmit()
    }
    //submit stock info
    handleStockSubmit(){
        //make negative stocks
        var csrftoken = this.getCookie('csrftoken')

        fetch(`http://127.0.0.1:8000/api/stocks-create/${this.state.user.username}/`,{
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            'X-CSRFToken':csrftoken,
          },
          body: JSON.stringify(this.state.UserStocks)
        }).then(response=>response.json())
        .then(data=>{
            this.props.updateStock(data,this.state.Stock)
            console.log(data)
            this.setState({
            UserStocks:{
                ...data,
                amountOfStock:0
            }})
        }).catch(e=>{
            console.log(e)
        })
        
        this.handleHistorySubmit()
    }

    //submit history info
    handleHistorySubmit(){
        var csrftoken = this.getCookie('csrftoken')

        fetch(`http://127.0.0.1:8000/api/history-create/${this.state.user.username}/`,{
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            'X-CSRFToken':csrftoken,
          },
          body: JSON.stringify(this.state.History)
        }).then(response=>response.json())
        .then(data=>{
            this.setState({
            History:data})
        }).then(()=>{
            this.props.updateUser(this.state.user)
        })
        .catch(e=>{
            console.log(e)
        })
    }

    resetbar(){
        var maxStockAmount, maxMoneyAmount 

        if (this.state.isUserBuying){
            maxStockAmount = Math.floor(this.state.user.CashInHand/this.state.price)
            maxMoneyAmount = maxStockAmount*this.state.price
        }
        else{
            maxStockAmount = (this.state.maxStockAmount + this.state.UserStocks.amountOfStock)
            maxMoneyAmount = this.state.price*maxStockAmount}

        this.setState({
            currMoney:0,
            currStock:0,
            maxStockAmount,
            maxMoneyAmount
        })
    }
    //https://financialmodelingprep.com/api/v3/quote-short/AAPL?apikey=demo
    render() {
        var btn ,btnText,buying,selling
        if (this.state.isUserBuying){
            buying = "active"
            selling=""
            btn="success"
            btnText="BUY"
        }else{
            buying = ""
            selling="active"
            btn="danger"
            btnText="SELL"
        }
        return(
            <div>
                <ul className="nav nav-tabs justify-content-center  nav-pills nav-fill">
                    <li className="nav-item ">
                        <a className={`nav-link ${buying}`}  onClick={this.switchSideBar} href="#">BUY</a> 
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${selling}`} onClick={this.switchSideBar} href="#">SELL</a> 
                    </li>
                </ul>
                <div className="SideBarDiv">
                    <div className="SideBarTitle">{this.state.Stock}</div>
                    <div className="SideBarPrice">{this.state.price}</div>
                    <div className="SideBarTitle">
                        <label htmlFor="amount" className="form-label">Amount Of Stock</label>
                        <div className="SideBarSection">
                            <input type="range" className="form-range SideBarRange" min="0" max={this.state.maxStockAmount} onChange={this.handleChange}  value={this.state.currStock} id="amount" name="stock"/>  
                            <input type="number" className="SideBarInput" min="0" max={this.state.maxStockAmount} onChange={this.handleChange} name="stock" value={this.state.currStock} placeholder="0"/>
                        </div>
                    </div>
                    <div className="SideBarTitle">
                        <label htmlFor="amount" className="form-label">Amount of Money</label>
                        <div className="SideBarSection">
                            <input type="number" id="amount" className="SideBarInputCenter" min="0" max={this.state.maxMoneyAmount} name="money"onChange={this.handleChange} /*step={this.state.price}*/ value={this.state.currMoney} placeholder="0"/>
                        </div>
                    </div>
                    <button type="button" onClick={this.handleSubmit} className={`btn btn-${btn} BuyButton`}>{btnText}</button>
                </div>
            </div>
        )
    }
}