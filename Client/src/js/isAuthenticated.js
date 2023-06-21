const isAuth = async() => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/user");
        const request = await response.json()


        if(request.status === "Not Authenticated" && request.redirect === true && window.location.pathname !== "/login.html"){
            window.location = "/login.html"
        }
        if(request.status === "Authenticated" && window.location.pathname === "/login.html" || window.location.pathname === "/register.html"){
            window.location = "/"
        }
        
    } catch (error) {
        console.log(error)
    }
}

isAuth()