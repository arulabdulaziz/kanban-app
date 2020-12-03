<template>
  <div>
      <Navbar @logout="logout"></Navbar>
      <form class="form-inline" id="todos-form" method="POST" @submit.prevent="addtask">
        <label class="sr-only" for="title">Title</label>
        <input type="text" class="form-control mb-2 mr-sm-2" id="title" name="title" placeholder="Title" v-model="title">
      
        <label class="sr-only" for="description">Description</label>
        <div class="input-group mb-2 mr-sm-2">
          <div class="input-group-prepend">
          </div>
          <input type="textarea" class="form-control" id="description" name="description" placeholder="Description" v-model="description">
        </div>

        <label class="sr-only" for="category">Category</label>
        <div class="input-group mb-2 mr-sm-2">
          <div class="input-group-prepend">
          </div>
          <select name="category" id="" class="form-control" v-model="category">
            <option value="disabled" disabled>--SELECT CATEGORY--</option>
            <option value="backlog">Backlog</option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mb-2" id="btn-submit-todo">Add Kanban</button>
      </form>
      <!-- <ul>
          <li v-for="(task, index) in tasks" :key="index">{{task}}</li>
      </ul> -->
    <Category v-for="(category, index) in categories" :key="index" :categoryTask="category" :tasks="tasks"
    @editDisplay="editDisplay"></Category>
    <div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header border-bottom-0">
              <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.prevent="editTask">
              <div class="modal-body">
                <div class="form-group">
                  <label>Title</label>
                  <input type="email" class="form-control" aria-describedby="emailHelp" v-model="taskEdit.title">
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <input type="textarea" class="form-control" v-model="taskEdit.description">
                </div>
                <div class="form-group">
                  <label>Category</label>
                  <select name="category" id="" class="form-control" v-model="taskEdit.category">
                    <option value="disabled" disabled>--SELECT CATEGORY--</option>
                    <option value="backlog">Backlog</option>
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer border-top-0 d-flex justify-content-center">
                <button type="submit" class="btn btn-success">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Category from './category'
import Navbar from './navbar'
export default {
    name: 'Main Page',
    components: {
        Navbar,
        Category
    },
    props: ['tasks'],
    data(){
        return {
            title: '',
            description: '',
            category: '',
            categories: ['backlog', 'todo', 'doing', 'done'],
            taskEdit: {
                title: '',
                description: '',
                category: '',
                id: 0
            }
        }
    },
    methods: {
        logout(){
            // console.log(`logout from main page`);
            this.$emit('logout')
        },
        addtask(){
            const obj = {
                title: this.title,
                description: this.description,
                category: this.category
            }
            this.title = '',
            this.description = '',
            this.category = ''
            this.$emit('addTask', obj)
        },
        editDisplay(id){
            axios({
              url: `http://localhost:3000/${id}`,
              method: 'get',
              headers: {
                access_token: localStorage.getItem('access_token')
              }
          })
          .then(value => {
              this.taskEdit.title = value.data.title,
              this.taskEdit.description = value.data.description,
              this.taskEdit.category = value.data.category
              this.taskEdit.id = value.data.id
          })
          .catch(error => {
              swal("Error", `${error}`);
          })
        },
        editTask(){
            const id = this.editTask.id
            const obj = {
                title: this.editTask.title,
                description: this.editTask.description,
                category: this.editTask.category
            }
            this.$emit('editTask', id, obj)
        }
    },
    created: function(){
        this.$emit('getAllTask')
    }
}
</script>

<style>

</style>