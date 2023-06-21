const username = document.querySelector("#username");
const password = document.querySelector("#password");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");

const registerBtn = document.querySelector(".form-button");
const form = document.querySelector(".register-form");

const username_warning_action = document.querySelector(".register-username-warning");
const password_warning_action = document.querySelector(".register-password-warning");
const firstname_warning_action = document.querySelector(".register-firstname-warning");
const lastname_warning_action = document.querySelector(".register-lastname-warning");



registerBtn.addEventListener("click", (e) => {
    e.preventDefault()
})





const server_url = "http://localhost:8000/api/v1/create-user"
const registerUser = async(url,userData) => {
    let response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData)
    })
    let data = await response.json();
    return data
}

registerBtn.addEventListener("click", async () => {
    const data = {
        firstName: firstname.value,
        lastName: lastname.value,
        userName: username.value,
        password: password.value
    };
    username_warning_action.innerHTML = ""
    firstname_warning_action.innerHTML = ""
    lastname_warning_action.innerHTML = ""

    registerUser(server_url,data)
    .then(Userdata => {
        // console.log(Userdata)
        if(Userdata.User){
            window.location = "/"
        }
        if(Userdata.err){
            if(Userdata.err.username){
                username_warning_action.innerHTML = Userdata.err.username
               }
               else if(Userdata.err.firstname ){
                firstname_warning_action.innerHTML = Userdata.err.firstname
               }
               else if(Userdata.err.lastname){
                lastname_warning_action.innerHTML = Userdata.err.lastname
               }
        }

    })


})
