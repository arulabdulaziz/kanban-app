<template>
  <!--Kanban Page-->
          <div class="container"> 
              <div class="row mt-4 d-flex justify-content-around">
                  <div class="col-md-3 p-2" v-if="categoryTask == 'backlog'">
                      <div class="bg-danger p-2">
                          Backlog
                      </div>
                      <div class="d-flex flex-column-reverse">
                          <div class="card" v-for="(task, index) in tasks" :key="index">
                            <div class="card-body">
                              <h5 class="card-title">{{task.title}}</h5>
                              <p class="card-text">{{task.description}}</p>
                              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#form" @click="editDisplay(task.id)">
                                Edit
                                </button>
                              <button class="btn-danger">Delete</button>
                            </div>
                          </div>
                        </div>
                  </div>

                  <div class="col-md-3 p-2" v-else-if="categoryTask == 'todo'">
                <div class="bg-warning p-2">
                    Todo
                </div>
                <div class="d-flex flex-column-reverse">
                    <div class="card" v-for="(task, index) in tasks" :key="index">
                    <div class="card-body">
                        <h5 class="card-title">{{task.title}}</h5>
                        <p class="card-text">{{task.description}}</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#form" @click="editDisplay(task.id)">
                                Edit
                        </button>
                        <button class="btn-danger">Delete</button>
                    </div>
                    </div>
                </div>
                
                </div>
                <div class="col-md-3 p-2" v-else-if="categoryTask == 'doing'">
                <div class="bg-primary p-2">
                    Doing
                </div>
                <div class="d-flex flex-column-reverse">
                    <div class="card" v-for="(task, index) in tasks" :key="index">
                    <div class="card-body">
                        <h5 class="card-title">{{task.title}}</h5>
                        <p class="card-text">{{task.description}}</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#form" @click="editDisplay(task.id)">
                                Edit
                        </button>
                        <button class="btn-danger">Delete</button>
                    </div>
                    </div>
                </div>
                
                </div>
                <div class="col-md-3 p-2" v-else-if="categoryTask == 'done'">
                <div class="bg-success p-2">
                    Done
                </div>
                <div class="d-flex flex-column-reverse">
                    <div class="card" v-for="(task, index) in tasks" :key="index">
                    <div class="card-danger">
                        <h5 class="card-title">{{task.title}}</h5>
                        <p class="card-text">{{task.description}}</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#form" @click="editDisplay(task.id)">
                                Edit
                        </button>
                        <button class="btn-danger">Delete</button>
                    </div>
                    </div>
                </div>
                
                </div>
              </div>
        </div>
          <!--Kanban Page-->
</template>

<script>
export default {
    name: 'category',
    props: ['categoryTask', 'tasks'],
    methods: {
        editDisplay(id){
            this.$emit('editDisplay', id)
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