import React from "react";
import "./../../../Css/styleLogin.scss";

function Login() {
    document.body.style.backgroundImage = 'none';
    return(
        
    
        <div class="container login" style={{marginTop: '150px'}}>
       
        <div class="row">
            <div class="col-sm">

                
                <div class="loginbox">
                    <form>
                        <h1>Log in</h1>
                        <div class="form-group " >
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required></input>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required></input>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>

                        <div className="ButtonForget">
                        <button type="button" className="btn btn-link"> Forget password?</button>
                        </div>                        
                    </form>
            
              
                </div>

           

            </div>

        </div> 

        </div>
   


        
    );
}
export default Login;