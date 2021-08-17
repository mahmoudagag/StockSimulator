import logo from './logo.svg';
import './App.css';
import React from 'react'
import {Login} from './components/Login'
import {Register} from './components/Register'
import {MainMenu} from './components/MainMenu'

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:{
        firstname: '',
        lastname:'',
        username: '',
        email:'',
        password:'',
      },
      isLogginActive:true,
      isSignedIn:false,
      error:{
        error:false,
        type:""
      }
    }
    this.switch = this.switch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.updateNetworth=this.updateNetworth.bind(this)
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

  switch(){
    this.setState({
      user:{
        firstname: '',
        lastname:'',
        username: '',
        email:'',
        password:'',
        
      },
      isLogginActive:!this.state.isLogginActive,
      error:{
        error:false,
        type:"",
      }
    })
    console.log(this.state.isLogginActive)
  }

  handleChange(e){
    var name = e.target.name
    var value = e.target.value
    console.log(name)
    console.log(value)
    this.setState({
      user:{
      ...this.state.user,
        [name]:value
      }
    })
    console.log(this.state)
  }

  handleSubmit(e){
    e.preventDefault()
    console.log(this.state.user)

    var csrftoken = this.getCookie('csrftoken')

    var url = 'http://127.0.0.1:8000/api/user-create/'
    console.log(this.state.isLogginActive)
    if(this.state.isLogginActive === true){
      url = `http://127.0.0.1:8000/api/user-verify/${this.state.user.username}/`
    }
    fetch(url,{
      method:'POST',
      headers:{
        'Content-type': 'application/json',
        'X-CSRFToken':csrftoken,
      },
      body: JSON.stringify(this.state.user)
    }).then(response=>response.json())
    .then(data=>{
      if (typeof data=="string"){
        this.setState({
          error:{
            error:true,
            type:data,
          },
        })
      }
      else{
        this.setState({
        user:data,
        isSignedIn:true
      })
    }
    }).then((response)=>{
      console.log(this.state)
    }).then((data)=>{
     if(!this.state.error.error){
       this.updateNetworth()
      }
    })
    .catch(error =>{
      console.log(error)
      this.setState({
        error:{
          error:true,
          type:"",
        },
      })
      })
  }

  updateNetworth(){
    var csrftoken = this.getCookie('csrftoken')

    var networth =this.state.user.CashInHand
    console.log(networth)
    fetch(`http://127.0.0.1:8000/api/user-stocks/${this.state.user.username}/`)
    .then(response=> response.json())
    .then(data=>{
        return Promise.all(data.map(stock=>{
          return fetch(`https://financialmodelingprep.com/api/v3/quote-short/${stock.Stocks}?apikey=e8f8af12e3920a96c74be21d7cd2b8e3`)
          .then(response => response.json())
          .then(data =>{
            networth += (data[0].price*stock.amountOfStock)
          }).catch(e=>{
              console.error(e)
          })
        })
      )}).then( (data)=>{
        var net = {UserNetWorth:Math.round(networth)} 
        console.log(net)
        fetch(`http://127.0.0.1:8000/api/networth-create/${this.state.user.username}/`,{
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            'X-CSRFToken':csrftoken,
          },
          body: JSON.stringify(net)
        }).then(response => response.json())
        .then(data=>{
          console.log(data)
        }).catch(e=>{
          console.error(e)
        })
      }).catch(e=>{
        console.error(e)
    })

  }

  render() {
    var isLogginActive = this.state.isLogginActive
    var isSignedIn = this.state.isSignedIn
    return(
      <div>
        {isLogginActive && !isSignedIn && <Login error={this.state.error.error} onSwitch={this.switch} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />}
        {!isLogginActive && !isSignedIn && <Register error={this.state.error} onSwitch={this.switch} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
        {isSignedIn && <MainMenu user={this.state.user}/>}
      </div>
    )
  }
}

export default App;
