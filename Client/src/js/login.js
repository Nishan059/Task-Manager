const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginBtn = document.querySelector(".form-button");
const form = document.querySelector(".login-form");
const username_warning_action = document.querySelector(".login-username-warning");
const password_warning_action = document.querySelector(".login-password-warning");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
})





const server_url = "http://localhost:8000/api/v1/authenticate-user"
const loginUser = async(url,userData) => {
    let response = await fetch(url, {
        method: "POST",
        mode: "cors", 
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify(userData)
    })
    return response.json();
}

loginBtn.addEventListener("click", async () => {
    const data = {
        userName: username.value,
        password: password.value
    };
    username_warning_action.innerHTML = ""
    password_warning_action.innerHTML = ""
    loginUser(server_url,data)
    .then(Userdata => {
        console.log(Userdata)
        if(Userdata.message === "Success" && Userdata.redirect === true){
            window.location = "/"
        }
       if(Userdata.error && Userdata.type === "username"){
        username_warning_action.innerHTML = Userdata.error
       }
       else if(Userdata.error && Userdata.type === "password"){
        password_warning_action.innerHTML = Userdata.error
       }
       console.log(Userdata)
    })


})