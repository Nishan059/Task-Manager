const sign_out_btn = document.querySelector(".sign_out_btn");


const endpoint = "http://localhost:8000/api/v1/logout-user";
const logout = async() => {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            mode: "cors", 
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                
            }
        })
    } catch (error) {
        console.log(error)
    }
}

sign_out_btn.addEventListener("click", () => {
    logout()
    window.location = "/login.html"
})