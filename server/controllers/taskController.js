const {User, Task} = require('../models/index')
class TaskController{
    static createTask(req, res, next){
        console.log(req.loginUser);
        const obj = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            UserId: req.loginUser.id
        }
        Task.create(obj)
         .then(value => {
            res.status(200).json(value)
         })
         .catch(error => {
            next(error)
        })
    }
    static getTask(req, res, next){
        //include task & user
        Task.findAll({include: [User]})
        .then(value => {
            res.status(200).json(value)
        })
        .catch(error => {
            next(error)
        })
    }
    static put(req, res, next){
        const id = +req.params.id
        const obj = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            UserId: req.loginUser.id
            // UserId: req.body.UserId
        }
        Task.findByPk(id)
         .then(value => {
             if (!value) {
                throw {
                    status: 404,
                    message: `data not ound`
                }
             }else{
                return Task.update(obj, {
                    where: {id : id},
                    returning: true
                  })
             }
         })
        .then(value => {
            console.log(value);
            res.status(200).json(value)
        })
        .catch(error => {
            next(error)
        })
    }
    static patch(req, res, next){
        const id = +req.params.id
        const obj = {category: req.body.category}
        Task.findByPk(id)
         .then(value => {
            if (!value) {
                throw {
                    status: 404,
                    message: `data not ound`
                }
             }else{
                return Task.update(obj, {
                    where: {id : id},
                    returning: true
                  })
             }
         })
         .then(value => {
            console.log(value);
            res.status(200).json(value)
        })
        .catch(error => {
           next(error)
        })
    }
    static remove(req, res, next){
        const id = +req.params.id
        Task.findByPk(id)
         .then(value => {
            if (!value) {
                throw {
                    status: 404,
                    message: `data not ound`
                }
             }else{
                return Task.destroy({
                    where: {id : id},
                  })
             }
         })
         .then(value => {
            res.status(200).json(`todo succes to delete`)
        })
        .catch(error => {
            next(error)
        })
    }
    static getById(req, res, next){
        const id = +req.params.id
        console.log(id, '<<<<<<<<<<<<');
        Task.findByPk(id,{
            include: [User]
        })
        .then(value => {
            if (!value) {
                throw {
                    status: 404,
                    message: `data not ound`
                }
            }else{
                res.status(200).json(value)
            }
        })
        .catch(error => {
            next(error)
        })
    }
}
module.exports = TaskController