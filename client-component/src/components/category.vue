<template>
  <!--Kanban Page-->
    <div class="col-md-3 p-2">
        <div :class="background +' p-2'">
            {{categoryTask}}
        </div>
        <div class="d-flex flex-column-reverse">
            <Task v-for="task in currentTask" :key="task.id" :task="task" @editTask="editTask" @deleteTask="deleteTask"></Task>
        </div>
    </div>
          <!--Kanban Page-->
</template>

<script>
import Task from './task'
export default {
    name: 'category',
    props: ['categoryTask', 'tasks'],
    components: {
        Task
    },
    data(){
        return {
            background: ''
        }
    },
    methods: {
        editDisplay(id){
            this.$emit('editDisplay', id)
        },
        editTask(obj){
            // console.log(`masuk dari category`, obj);
            this.$emit('editTask', obj)
        },
        deleteTask(id){
            this.$emit('deleteTask', id)
        }
    },
    created(){
        if (this.categoryTask == 'backlog') {
            this.background = 'bg-danger'
        }else if(this.categoryTask == 'todo'){
            this.background = 'bg-warning'
        }else if(this.categoryTask == 'doing'){
            this.background = 'bg-primary'
        }else if(this.categoryTask == 'done'){
            this.background = 'bg-success'
        }
    },
    computed: {
        currentTask(){
            return this.tasks.filter(e => e.category == this.categoryTask)
        }
    }
}
</script>

<style>

</style>