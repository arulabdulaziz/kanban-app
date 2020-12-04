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
      <div class="container">
        <div class="row mt-4 d-flex justify-content-around">
            <Category v-for="(category, index) in categories" :key="index" :categoryTask="category" :tasks="tasks"
            @editDisplay="editDisplay" @editTask="editTask" @deleteTask="deleteTask"></Category>
          </div>
      </div>
    
  </div>
</template>

<script>
import Category from './category'
import Navbar from './navbar'
export default {
    name: 'Main',
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
              swal("Error", `${error.message}`);
          })
        },
        editTask(obj){
            // console.log(`masuk dari main page`, obj);
            this.$emit('editTask', obj)
        },
        deleteTask(id){
          // console.log(id, 'dai main page');
          this.$emit('deleteTask', id)
        }
    },
    created: function(){
        this.$emit('getAllTask')
    }
}
</script>

<style>

</style>