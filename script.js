//SignUp Function when click create account button in nav Bar
function signUp(){

    //clearing old elements.
    clearOldElements(); 
        
    //dynamically change the visibility of elements
    changeVisibility();
    
    //creating signup form  dynamically by using create element
    let container=document.getElementById("signUpContainer");
    let divEle=document.createElement("div");
    divEle.setAttribute("id","signUpForm");
    divEle.innerHTML=`<h1>Newsletter SignUp </h1>
        <div class="title">
            <label for="userName">Name </label><br>
            <input id="userName" type="text" placeholder="Enter your Name"/>
            <p id="errorUserName"></p>
        </div>
        <div class="title">
            <label for="emailId">E-Mail </label><br>
            <input id="emailId" type="email" placeholder="Email Address"/>
            <p id="errorEmail"></p>
        </div>
        <div class="title">
            <label for="password">Password </label><br>
            <input id="password" type="password" placeholder="Enter Password"/>
            <p id="errorPassword"></p>
        </div>
        <div class="title">
            <label for="passConf">Confirm Password </label><br>
            <input id="passConf" type="text" placeholder="Re-Enter the Password"/>
            <p id="errorConfPass"></p>
        </div>
        <div class="btnSubmit">
            <input value="SignUp" id="submitBtn" type="submit" onclick="submitFunc(this.value)" />
            <input value="Cancel" id="cancelBtn" type="button" onclick="clearFunc()" />
        </div>`;
        container.appendChild(divEle);
}

//SignIn Function when click signin button in nav Bar
function signIn(){

    //clearing old elements.
    clearOldElements(); 
        
    //dynamically change the visibility of elements
    changeVisibility();

    //creating signin form  dynamically by using create element
    let container=document.getElementById("signUpContainer");
    let divEle=document.createElement("div");
    divEle.setAttribute("id","signInForm");
    divEle.innerHTML=`<h1>Newsletter SignIn</h1>
            <div class="title">
                <label for="emailId">E-Mail </label><br>
                <input id="emailId" type="email" placeholder="Email Address"/>
                <p id="errorEmail"></p>
            </div>
            <div class="title">
                <label for="password">Password </label><br>
                <input id="password" type="password" placeholder="Enter Password"/>
                <p id="errorPassword"></p>
            </div>
            <div class="btnSubmit">
                <input value="Sign In" id="submitBtn" type="button" onclick="submitFunc(this.value)" />
                <input value="Cancel" id="cancelBtn" type="button" onclick="clearFunc()" />
            </div>`;
container.appendChild(divEle);    
}

// signin or signup form submit function based upon value
function submitFunc(value){
    //assigning variables for html input elements
    let email=document.getElementById("emailId").value;
    let password=document.getElementById("password").value;
    let errorEmail=document.getElementById("errorEmail");
    let errorPass=document.getElementById("errorPassword");
    errorPass.innerHTML="";
    errorEmail.innerHTML="";

    //for signin Form validation
    if(value=="Sign In")
    {
        //validating the input values
        if(email=="") {
        errorEmail.innerHTML="* Enter Email Address";
        }
        else if(!validEmail(email)){
        errorEmail.innerHTML="Enter Valid Email Address";
        }
        if(password=="") {
        errorPass.innerHTML="* Enter The Password";
        }
        else if(!validPassword(password)){
        errorPass.innerHTML="* Enter Password in Correct Format. eg..Abcd@123";
        } 
        else{       // submit the form and alert registered message
            sessionStorage.setItem("username",email);
            alert("Sign In Successfully");
            clearFunc();       
        }
    }

    //for signUp Form validation
    else{
        //assigning variables for html input elements
        let userName=document.getElementById("userName").value;
        let confPass=document.getElementById("passConf").value;
        let errorName=document.getElementById("errorUserName");
        let errorConfPass=document.getElementById("errorConfPass");
        errorName.innerHTML="";
        errorConfPass.innerHTML="";

        //validating the input values
        if(userName=="") {
        errorName.innerHTML="* Enter The Name";
        }
        else if(userName.length<3 || userName.length>15){
        errorName.innerHTML="* Name must be more than 3 character and minimum 15 characters";
        }
        if(email=="") {
        errorEmail.innerHTML="* Enter Email Address";
        }
        else if(!validEmail(email)){
        errorEmail.innerHTML="Enter Valid Email Address";
        }
        if(password=="") {
        errorPass.innerHTML="* Enter The Password";
        }
        else if(!validPassword(password)){
        errorPass.innerHTML="* Enter Password in 3 to 15 character with Correct Format. eg..Abcd@123";
        }
        else if(password!==confPass){
            errorConfPass.innerHTML="Re-enter correct password";
        }
        else{
            // creating user object and stored in localstorage for testing purpose
            const data={
                name:userName,
                email:email,
                password:password
            };
            addUser(data);

            alert("Newsletter registration Successfully");
            clearFunc();
        }
    }
}
// function for clearing old elements
function clearOldElements(){
    let div=document.getElementById("subs")
    div.parentNode.removeChild(div);
}

//dynamically change the visibility of elements
function changeVisibility(){
    document.getElementById("mainContent").style.display="none";
    document.getElementById("membershipPage").style.display="none";
    document.getElementById("signUpContainer").style.display="block";
}

// function for valid email by regular expression
function validEmail(email){
    const pattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/
    return pattern.test(email);
}

// function for valid password by regular expression  eg..Abcd@123
function validPassword(password){
    const pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    return pattern.test(password);
}

// function for clear and back to homepage
let clearFunc=()=>{location.href="/index.html"}; 

// For getting username in frontpage after sign in
let user1=sessionStorage.getItem("username");
if (user1) {
    let trimName=user1.split('@')[0].toLocaleUpperCase(); 
    document.getElementById("a-user").innerHTML= trimName;
    document.getElementById("a-create").innerHTML= "";

    let container=document.getElementById("username");
    let h1Ele=document.createElement("h1");
    h1Ele.setAttribute("id","custName");
    h1Ele.innerHTML=`Hi! ${trimName}`;           
    container.appendChild(h1Ele);
    sessionStorage.removeItem("username");
}

//for adding user details in localstorage for testing purpose
let myList = JSON.parse(localStorage.getItem("myList"));
if (!myList) {
  myList = [];
}
//function for adding user details in localstorage
function addUser(user){
    console.log(user);      
    myList.push(user);
    localStorage.setItem("myList",JSON.stringify(myList));  

}