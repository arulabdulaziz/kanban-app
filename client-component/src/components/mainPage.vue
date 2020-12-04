<template>
  <div>
      <Navbar @logout="logout"></Navbar>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#form">
                Add Task
            </button>
        <div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <form @submit.prevent="addTask">
                <div class="modal-body">
                    <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" aria-describedby="emailHelp" v-model="title">
                    </div>
                    <div class="form-group">
                    <label>Description</label>
                    <input type="textarea" class="form-control" v-model="description">
                    </div>
                    <div class="form-group">
                    <label>Category</label>
                    <select name="category" id="" class="form-control" v-model="category">
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
        addTask(){
            const obj = {
                title: this.title,
                description: this.description,
                category: this.category
            }
            this.title = '',
            this.description = '',
            this.category = ''
            this.$emit('addTask', obj)
            $('#form').modal('hide')
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