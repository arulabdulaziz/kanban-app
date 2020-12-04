<template>
  <div>
      <div v-if="pageName == 'Login Page'">
      <Login @registerPage="changePage" @login="login"
      @onSignIn="onSignIn"></Login>
      </div>
      <div v-else-if="pageName == 'Register Page'">
          <Register @loginPage="changePage" @register="register"></Register>
      </div>
     <div v-else-if="pageName == 'Main Page'">
         <MainPage @logout="logout"
         @addTask="addTask"
         :tasks="tasks"
         @getAllTask="getAllTask" @editTask="editTask"
         @deleteTask="removeTask"></MainPage>
     </div>
  </div>
</template>

<script>
import Login from './components/login'
import Register from './components/register'
import MainPage from './components/mainPage'
export default {
    name: 'App',
    components: {
        Login,
        Register,
        MainPage
    },
  data() {
    return {
      message: 'Hello world',
      pageName: 'Login Page',
      tasks: []
    };
  },
  methods: {
    onSignIn(id_token){
      axios({
        url: 'http://localhost:3000/user/googleLogin',
        method: 'post',
        data: {
          googleToken: id_token
        }
      })
      .then(value => {
        swal({
                text: "Login Success",
                title: "Welcome",
                icon: "success",
              });
        localStorage.setItem('access_token', value.data)
        this.pageName = 'Main Page'
        this.getAllTask()
      })
      .catch(error => {
        swal("Error", `${error}`);
      })
    },
    changePage(page){
        this.pageName = page
    },
    register(obj){
      axios({
            url : "http://localhost:3000/user/register",
            method : "post",
            data : obj
        })
        .then(value => {
            swal({
                text: "Register Success",
                title: "Please Login Now",
                icon: "success",
              });
              this.pageName = 'Login Page'
        })
        .catch(error => {
            swal("Error", `${error}`);
            this.pageName = 'Register Page'
        })
        // .finally(() => {
        //     this.userRegister.name = ''
        //     this.userRegister.email = ''
        //     this.userRegister.password = ''
        // })
    },
    login(obj){
      axios({
            url : "http://localhost:3000/user/login",
            method : "post",
            data : obj
        })
        .then(value => {
            swal({
                text: "Login Success",
                title: "Welcome",
                icon: "success",
              });
              localStorage.setItem('access_token', value.data)
              this.pageName = 'Main Page'
              this.getAllTask()
        })
        .catch(error => {
            swal("Error", `${error}`);
        })
        // .finally(() => {
        //     this.userLogin.email = ''
        //     this.userLogin.password = ''
        // })
    },
    logout(){
      console.log(`logout from app`);
      this.pageName = 'Login Page'
      localStorage.removeItem('access_token')
      // var auth2 = gapi.auth2.getAuthInstance();
      //   auth2.signOut().then(function () {
      //   console.log('User signed out.');
      //   });
    },
    addTask(obj){
      axios({
          url: "http://localhost:3000/tasks",
          method: 'POST',
          data: obj,
          headers: {
            access_token : localStorage.getItem('access_token')
          }
      })
      .then(value => {
          swal({
                text: "Your Task Has been added",
                title: "Success!!",
                icon: "success",
              });
              this.getAllTask()
              this.pageName = 'Main Page'
      })
      .catch(error => {
          swal("Error", `${error}`);
      })
    },
    editTask(obj){
      axios({
          url: `http://localhost:3000/tasks/${obj.id}`,
          method: 'PUT',
          data: obj,
          headers: {
            access_token : localStorage.getItem('access_token')
          }
      })
      .then(value => {
        swal({
            text: "Your Task Has been updated",
            title: "Success!!",
            icon: "success",
            });
          this.getAllTask()
      })
      .catch(error => {
          swal("Error", `${error}`);
      })
    // console.log(`edit from app`);
    },
    removeTask(id){
      console.log(`dari app vue`, id);
      axios({
          url: `http://localhost:3000/tasks/${id}`,
          method: 'delete',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
      })
      .then(value => {
          swal({
                text: "Your Task Has been deleted",
                title: "Success!!",
                icon: "success",
              });
              this.getAllTask()
      })
      .catch(error => {
          swal("Error", `${error.message}`);
      })
    },
    getAllTask(){
      axios({
          url: 'http://localhost:3000/tasks',
          method: 'GET',
          headers: {
              access_token: localStorage.getItem('access_token')
          }
      })
      .then(value => {
        //   console.log(value.data, '<<<<<<<');
          this.tasks = value.data
        //   console.log(this.task, '<<<<< task');
      })
      .catch(error => {
          console.log(error);
      })
  }
  },
  created(){
    if(localStorage.getItem('access_token')){
      this.getAllTask()
      this.pageName = 'Main Page'
    }else {
        this.pageName = 'Login Page'
    }
  },
};
</script>

<style scoped>
</style>
