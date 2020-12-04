<template>
    <section>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{task.title}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{task.User.name}}</h6>
                <p class="card-text">{{task.description}}</p>
                <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#form-'+task.id">
                Edit
                </button>
                <button class="btn-danger" @click="deleteTask">Delete</button>
            </div>
        </div>
        <div class="modal fade" :id="'form-'+ task.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <input type="text" class="form-control" aria-describedby="emailHelp" v-model="taskEdit.title">
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
    </section>
</template>


<script>
export default {
    name: 'task',
    props: ['task'],
    data(){
        return {
            taskEdit: {
                title: this.task.title,
                description: this.task.description,
                category: this.task.category
            }
        }
    },
    methods: {
        editTask(){
            const obj = {
                id: this.task.id,
                title: this.taskEdit.title,
                description: this.taskEdit.description,
                category: this.taskEdit.category
            }
            // console.log(obj);
            this.$emit('editTask', obj)
            $('#form-'+this.task.id).modal('hide')
        },
        deleteTask(){
            console.log(this.task.id, '<<');
            this.$emit('')
        }
    }

}
</script>

<style>

</style>