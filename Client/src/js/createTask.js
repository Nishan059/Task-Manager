const title = document.querySelector("#title")
const description = document.querySelector("#description")
const comment = document.querySelector("#comment")
const create_btn = document.querySelector(".create-btn");


const server_url = "http://localhost:8000/api/v1/create-task";
const getUser = async() => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/user");
        const request = await response.json()
        // console.log(request)
        return request
    } catch (error) {
        console.log(error)
    }
}

let userid = null
getUser().then(data => {
    userid = data.user._id
})
create_btn.addEventListener("click", async(e) => {
    e.preventDefault()
    
    let taskData = {
        user: userid,
        name: title.value,
        content: description.value,
        comment: comment.value
    }
    try {
        const response = await fetch(server_url, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify(taskData)
        })
        let request = await response.json();

        window.location.href = "index.html"

    } catch (error) {
        console.log(error)
    }
})

