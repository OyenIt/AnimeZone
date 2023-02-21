// import { useContext } from "react";
// import  AuthContext  from "./context/AuthContext";
// // import  from "./context/AuthContext";

// const LoginPage = () => {
//   const { loginUser } = useContext(AuthContext);
//   // const handleSubmit = e => {
//   //   e.preventDefault();
//   //   const username = e.target.username.value;
//   //   const password = e.target.password.value;
//   //   username.length > 0 && loginUser(username, password);
//   // };

//   return (
//     <section>
//       {/* <form onSubmit={handleSubmit}> */}
//         <h1>Login </h1>
//         <hr />
//         <label htmlFor="username">Username</label>
//         <input type="text" id="username" placeholder="Enter Username" />
//         <label htmlFor="password">Password</label>
//         <input type="password" id="password" placeholder="Enter Password" />
//         <button type="submit">Login</button>
//       {/* </form> */}
//     </section>
//   );
// };

// export default LoginPage;
// Import the react JS packages 
import axios from "axios";
import {useState} from "react";


import bg from '../../assets/footer-bg.jpg';
// Define the Login function.
const LoginPage = () => {

     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     // Create the submit method.
     const submit = async e => {
          e.preventDefault();
          const user = {
                username: username,
                password: password
               };
          // Create the POST requuest
          // const {res} = await axios.post('http://127.0.0.1:8000/token/',user ,{headers:{'Content-Type': 'application/json'}},{withCredentials: true});
          axios.post('http://127.0.0.1:8000/token/',user ,{headers:{'Content-Type': 'application/json'}},
          {withCredentials: true}).then(data => {
            console.log(data.data.access)
            localStorage.clear();
            localStorage.setItem('access_token', data.data.access);
            localStorage.setItem('refresh_token', data.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.data['access']}`;
            window.location.href = '/basecamp/menu'
          });

         // Initialize the access & refresh token in localstorage.      
        //  localStorage.clear();
        //  localStorage.setItem('access_token', res.access);
        //  localStorage.setItem('refresh_token', res.refresh);
        //  axios.defaults.headers.common['Authorization'] = 
        //                                  `Bearer ${res['access']}`;
        
        //  window.location.href = '/basecamp/menu'
    }
    return(
      <>
      <div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
      <div className="Auth-form-container" style={{textAlign:"center"}}>
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3" style={{margin:"10px"}}>
              <label style={{margin:"10px"}}>Username</label>
              <input className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="form-group mt-3" style={{margin:"10px"}}>
              <label style={{margin:"10px"}}>Password</label>
              <input name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3"style={{margin:"10px"}}>
              <button type="submit" 
                 className="btn btn-primary"style={{marginLeft:"30px"}}>Submit</button>
            </div>
            <br/>
          </div>
       </form>
     </div>
      </>
     )
}

export default LoginPage