import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

export class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            changeChart:true,
            ChartData:{
                labels:[],
                datasets:[{
                    label:`${this.props.TickerSymbol}`,
                    data:[],
                }]
            },
            activeArray :["","active","","","","","",""],
            apiFunction:"INTRADAY",
            apiInterval:"interval=5min&"
        }
        this.fetchapi = this.fetchapi.bind(this)
        this.changeAPI = this.changeAPI.bind(this)
        this.parseData =this.parseData.bind(this)
        //this.parseNetworth=this.parseNetworth.bind(this)
    }
    componentDidMount(){
        console.log("DSDASSDA")
        this.fetchapi()
    }
    fetchapi(){
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${this.state.apiFunction}&symbol=${this.props.TickerSymbol}&${this.state.apiInterval}apikey=M54DB67Q15U3K3OE`)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            this.parseData(data)
        }).catch(e=>{
            console.error(e)
        })
    }

    parseData(data){
        console.log(data)
        var key = Object.keys(data)[1]
        console.log(key)
        var labelsValue =  Object.keys(data[key])
        var dataValue = []
        labelsValue.forEach(function(time){
            dataValue.push(data[key][`${time}`]["4. close"])
        })
        labelsValue.reverse()
        dataValue.reverse()
        this.setState({
            changeChart:true,
            ChartData:{
                labels:labelsValue,
                datasets:[{
                    label:`${this.props.TickerSymbol}`,
                    data:dataValue
                }]
            }
        })
    }

    changeAPI(e){
        console.log(this.props.TickerSymbol)
        var time = parseInt(e.target.name)
        var IntervalOptions =["1min","5min","15min","30min","60min"]
        var FuntionOptions = ["INTRADAY","Daily","WEEKLY","MONTHLY"]

        var FunctionIndex = time-4
        if (FunctionIndex<0) FunctionIndex=0 

        var intervalIndex =""
        if (time<5){
            intervalIndex = `interval=${IntervalOptions[time]}&`
        }

        var activeArray =["","","","","","","",""]
        activeArray[time]="active"

        this.setState({
            activeArray:activeArray,
            apiFunction:`${FuntionOptions[FunctionIndex]}`,
            apiInterval:intervalIndex,
            changeChart:false
        },()=>{ this.fetchapi()})
        console.log(this.state)
    }

    render(){
        var activeArray = this.state.activeArray
        var options =["1 Min","5 Min","15 Min","30 Min","60 Min","1 Day","1 Week","1 Mon"]
        if(this.state.changeChart) {var chartdata=this.state.ChartData}
        return(
            <div>
                <div className="Chart">
                    <ul className="nav nav-tabs">
                        {options.map((option,index)=>{
                            return(
                                <li className="nav-item">
                                    <a className={`nav-link ${activeArray[index]}`} name={`${index}`} onClick={this.changeAPI} href="#">{option}</a> 
                                </li>
                            )}
                            )}
                    </ul>
                    <Line data={chartdata}/>
                </div>

            </div>
        )
    }
}