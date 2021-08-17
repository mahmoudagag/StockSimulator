import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

export class NetworthChart extends React.Component{
    constructor(props){
        super(props);
        this.state={
        ChartData:{
            labels:[],
            datasets:[{
                label:"",
                data:[],
            }]
            },
        }
        this.parseNetworth = this.parseNetworth.bind(this)
    }

    componentDidMount(){
        fetch(`http://127.0.0.1:8000/api/user-networth/${this.props.user.username}/`)
        .then(response => response.json())
        .then(data =>
            this.parseNetworth(data)
        ).then(data=>
            console.log(data)
        ).catch(e=>{
            console.error(e)
        })
    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return
        }
    }

    parseTime(time){
        time = time.slice(0,16)
        var t =time.slice(10,12)
        var newtime = time.replace(t," ")
        return newtime
    }

    parseNetworth(data){
        console.log(data)
        var value = []
        var time = []
        data.map((data)=>{
            console.log(data)
            value.push(data.UserNetWorth)
            time.push(this.parseTime(data.Time))
        })
        this.setState({
            ChartData:{
                labels: time,
                datasets:[{
                    label:"Networth",
                    data:value,
                }]
            }
        })
        console.log(this.state.ChartData)
    }
    render(){
        return(
            <div className="Chart Chart2">
                <Line data={this.state.ChartData}/>
            </div>
            )
    }
}