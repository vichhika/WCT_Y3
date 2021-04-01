import React from "react";
import "./../../../Css/styleLogin.scss";

function Login() {
    return(
        
    
        <div class="container">
       
        <div class="row">
            <div class="col-sm">

                
                <div class="card" style={{width:"20rem"}}>
                    <form>
                        <h1>Log in</h1>
                        <div class="form-group" >
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required></input>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required></input>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                        
                        <p>Forget password?</p>
                    </form>
                </div>
            </div>

           

        </div>

    </div>


        
    );
}
export default Login;