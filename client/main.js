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
                  localStorage.setItem('access_token', value)
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
            
        }
    }
  })
  