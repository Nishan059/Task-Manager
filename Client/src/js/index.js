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

const userNameDisplay = document.querySelector(".h2-title .username");



getUser().then(data => {
    console.log(data.user.firstName)
    userNameDisplay.innerHTML = data.user.firstName

})


const getTasks = async() => {
    try{
        const response = await fetch("http://localhost:8000/api/v1/tasks");
        const request = await response.json();

        return request
    } catch(error) {
        console.log(error)
    }
}

function createElement(element, className) {
    let el = document.createElement(element);
    if(className !== null) el.className = className;
    return el;
}
const tasks_board = document.querySelector(".status-dashboard .tasks_board")
getTasks().then(data => {
    console.log(data.task)
    for(let i = 0; i < Object.keys(data.task).length; i++){
        let parentDiv = createElement("div","status_task");
        let title = createElement("h2", null);
        let content =  createElement("p", null);
        let comment =  createElement("p", null);
        title.innerHTML = data.task[i].name
        content.innerHTML = data.task[i].content
        comment.innerHTML = data.task[i].comment
        parentDiv.appendChild(title)
        parentDiv.appendChild(content)
        parentDiv.appendChild(comment)
        tasks_board.appendChild(parentDiv)
        console.log(parentDiv)

    }
})

const sign_out_btn = document.querySelector(".sign_out_btn");
// console.log(sign_out_btn)
const logout = async() => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/logout-user", {
            method: "POST",
            credentials: "include",
            mode: "cors",  // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        const request = await response.json()
        console.log(request)
    } catch (error) {
        console.log(error)
    }
}

sign_out_btn.addEventListener("click", () => {
    logout()
})

