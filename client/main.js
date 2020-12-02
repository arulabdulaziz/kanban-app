var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      pageName: 'Login Page',
      userLogin: {
          email: '',
          password: ''
      },
      userRegister: {
        name: '',
        email: '',
        password: ''
      }
    },
    methods:{
        changePage(pageName){
            this.pageName = pageName
        },
        login(){
            axios({
                url : "http://localhost:3000/user/login",
                method : "post",
                data : this.userLogin
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
            .finally(() => {
                this.userLogin.email = ''
                this.userLogin.password = ''
            })
        },
        register(){
            axios({
                url : "http://localhost:3000/user/register",
                method : "post",
                data : this.userRegister
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
            .finally(() => {
                this.userRegister.name = ''
                this.userRegister.email = ''
                this.userRegister.password = ''
            })
        },
        logout(){
            console.log(`logout ok`);
            localStorage.removeItem('access_token')
            this.pageName = 'Login Page'
        }
    }, 
    created: function(){
        if(localStorage.getItem('access_token')){
          this.pageName = 'Main Page'
        }else {
            this.pageName = 'Login Page'
        }
      },
  })
  