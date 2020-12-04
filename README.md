# kanban-app

## URL
server: https://tuyetuye-kanban-app.herokuapp.com

client: https://kanban-app-4684b.web.app

postman: 

## ROUTE

### POST /user/register
    Request body:
        name
        email
        password

#### Success
    response(200)
    {
    "name": "user",
    "email": "user@mail.com",
    }
#### Validation Error
    response(400)
    "<message validation error>"
#### Error From Server
    response(500)
    "oops sorry, it seems any problem from server"


### POST /user/login
    Request body:
        email
        password

#### Success
    response(200)
    "<send token>"
#### Email or password invalid
    response(400)
    "email or password invalid"
#### Error From Server
    response(500)
    "oops sorry, it seems any problem from server"

### POST /user/googleLogin
    Request body:
        googleToken
#### Success
    response(200)
    "<send token>"
#### Error From Server
    response(500)
    "oops sorry, it seems any problem from server"

### POST /tasks
    Request body:
        title
        description
        category
    Request headers:
        access_token
#### Success
    response(200)
    {
    "id": 15,
    "title": "magang",
    "description": "masih menjalani kehidupan yang berat",
    "category": "todo",
    "UserId": 3,
    "updatedAt": "2020-12-04T01:18:45.199Z",
    "createdAt": "2020-12-04T01:18:45.199Z"
    }
#### Validation Error
    response(400)
    "<message validation error>"
#### Error From Server
    response(500)
    "oops sorry, it seems any problem from server"


### GET /task
    Request headers:
        access_token
#### Success
    response(200)
    [
        {
        "id": 15,
        "title": "magang",
        "description": "masih menjalani kehidupan yang berat",
        "category": "todo",
        "UserId": 3,
        "updatedAt": "2020-12-04T01:18:45.199Z",
        "createdAt": "2020-12-04T01:18:45.199Z"
        },
     ...
    ]
#### Error From Server
    response(500)
    "oops sorry, it seems any problem from server"


### GET /task/:id
    Request params:
        id
    Request headers:
        access_token
#### Success
    response(200)
    {
    "id": 15,
    "title": "magang",
    "description": "masih menjalani kehidupan yang berat",
    "category": "todo",
    "UserId": 3,
    "updatedAt": "2020-12-04T01:18:45.199Z",
    "createdAt": "2020-12-04T01:18:45.199Z"
    }
#### Error Unauthorize
    response(400)
    "You not authorization"
#### Error From Server
    response(500)
    "oops sorry, it seems any problem from server"

### PUT /task/:id
    Request params:
        id
    Request headers:
        access_token
    Request body:
        title
        description
        category
#### Success
    response(200)
    {
    "id": 15,
    "title": "magang",
    "description": "masih menjalani kehidupan yang berat tapi masih berusaha",
    "category": "todo",
    "UserId": 3,
    "updatedAt": "2020-12-04T01:18:45.199Z",
    "createdAt": "2020-12-04T01:18:45.199Z"
    }
#### Error Unauthorize
    response(400)
    "You not authorization"
#### Error From Server
    response(500)
    "oops sorry, it seems any problem from server"


### PATCH /task/:id
    Request params:
        id
    Request headers:
        access_token
    Request body:
        category
#### Success
    response(200)
    {
    "id": 15,
    "title": "magang",
    "description": "masih menjalani kehidupan yang berat tapi masih berusaha",
    "category": "done",
    "UserId": 3,
    "updatedAt": "2020-12-04T01:18:45.199Z",
    "createdAt": "2020-12-04T01:18:45.199Z"
    }
#### Error Unauthorize
    response(400)
    "You not authorization"
#### Error From Server
    response(500)
    "oops sorry, it seems any problem from server"


### DELETE /task/:id
    Request params:
        id
    Request headers:
        access_token
#### Success
    response(200)
    "todo succes to delete"
#### Error Unauthorize
    response(400)
    "You not authorization"
#### Error From Server
    response(500)
    "oops sorry, it seems any problem from server"
