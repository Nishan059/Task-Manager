const Tasks = require("../Models/tasks");
const Users = require("../Models/users");

const jwt = require("jsonwebtoken");

const get_tasks = (req,res) => {
    const token = req.cookies.user_auth;
    let user = null;
    try {
        if(token) {
            jwt.verify(token, process.env.JWT_SECRECT_KEY, async (err, decoded) => {
                if(err){
                    res.status(401).json({status: "Not Authenticated", redirect: true})
                }
                else{
					user = await Users.findOne({_id: decoded.user_id});
                    const Task = await Tasks.find({user: user._id})
					res.status(200).json({task:Task})
                }
            })

        }
        else{
			res.status(401).json({status: "Not Authenticated", redirect: true})
		}
    } catch (error) {
        console.log()
        res.json({error})
        
    }
}

const create_task = async(req,res) => {
    try {
        const task = await Tasks.create(req.body);
        console.log(task)
        res.send(task)
    } catch (error) {
        console.log(error)
    }
}

const update_task = (req,res) => {
    
}

const delete_task = (req,res) => {
    
}


module.exports = {
    get_tasks,
    create_task,
    update_task,
    delete_task
}