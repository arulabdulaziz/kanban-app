<template>
  <div>
      <div v-if="pageName == 'Login Page'">
      <Login @registerPage="changePage" @login="login"></Login>
      </div>
      <div v-else-if="pageName == 'Register Page'">
          <Register @loginPage="changePage" @register="register"></Register>
      </div>
     <div v-else-if="pageName == 'Main Page'">
         <MainPage @logout="logout"
         @addTask="addTask"></MainPage>
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
      pageName: 'Login Page'
    };
  },
  methods: {
      changePage(page){
          this.pageName = page
      },
      register(obj){
          console.log(`masuk register`);
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
          localStorage.removeItem('access_token')
          this.pageName = 'Login Page'
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
                  
          })
          .catch(error => {
              swal("Error", `${error}`);
          })
      },
      editTask(id, obj){
          axios({
              url: `http://localhost:3000/tasks/${id}`,
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
                  
          })
          .catch(error => {
              swal("Error", `${error}`);
          })
      },
      removeTask(id){
          axios({
              url: `http://localhost:3000/${id}`,
              method: 'delete',
              headers: {
                  access_token: localStorage.getItem('access_token')
              }
          })
          .then(value => {
              swal({
                    text: "Your Task Has been updated",
                    title: "Success!!",
                    icon: "success",
                  });
          })
          .catch(error => {
              swal("Error", `${error}`);
          })
      }
  },
  created: function(){
        if(localStorage.getItem('access_token')){
          this.pageName = 'Main Page'
        }else {
            this.pageName = 'Login Page'
        }
      },
};
</script>

<style scoped>
</style>
