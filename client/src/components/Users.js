import React from 'react';
//import {Route} from 'react-router-dom';
import axios from 'axios';

class Users extends React.Component {
   constructor() {
       super();
       this.state = {
           user:[]
       }
   }

   componentDidMount() {
   
        axios.get('http://localhost:4000/api/users')
          .then(res => {
            //  console.log(`hellooo ${res.data.user}`)
            this.setState({user: res.data.user})
          })
          .catch(err => console.log(err))
      
   }
    render() {
        return (
            <div>{this.state.user.map(user => <div>
                    <h1>{user.name}</h1>
                </div>)}</div>
        )
    }
    
}

export default Users;