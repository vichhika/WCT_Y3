import React,{useState} from "react";
import  "./../../../Css/stylesignup.scss";

function SignUp() {
    document.body.style.backgroundImage = 'none';

   

    return(
    <div class="container signup">
       
        <div class="row">
            <div class="col-sm">               
                
                
                <div class="signinbox">
                   
                    <form>
                        <h1>Sign Up</h1>
                        <div class="form-group" >
                            <label for="InputFullname">Fullname</label>
                            <input type="text" class="form-control" id="InputFullname" placeholder="Enter Fullname" required></input>
                        </div>

                        <div class="form-group" >
                            <label for="InputUsername">Username</label>
                            <input type="text" class="form-control" id="InputUsername" placeholder="Enter Username" required></input>
                        </div>
                        
                        <div class="form-group" >
                            <label for="InputEmail">Email</label>
                            <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" required></input>
                            
                        </div>
                       
                        <div class="form-group">
                            <label for="InputPassword">Password</label>
                            <input type="password" class="form-control" id="InputPassword" placeholder="Enter Password" required></input>
                        </div>
                        <div class="form-group">
                            <label for="ConfirmPassword">Confirm Password</label>
                            <input type="password" class="form-control" id="ConfirmPassword" placeholder="Confirm Password" required></input>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="Check1"></input>
                            <label class="form-check-label" for="Check1">Check me out</label>
                        </div>

                        <div class="d-flex justify-content-center">
                            <button type="submit"  class="btn btn-primary" >Sign Up</button>
                        </div>                        
                    </form>
                    
                </div>
      
            </div>
        </div>

    </div>

    
    );
}
export default SignUp;