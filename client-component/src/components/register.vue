<template>
    <!--Register Page-->
          <div class="container" style="margin-top: 10%;" id="register-page"> 
            <center><h1>Register</h1></center> 
            <form @submit.prevent="register">
                <div class="form-group"> 
                    <label for="register-name">Full Name</label> 
                    <input type="text" v-model="name" class="form-control" id="register-name" aria-describedby="emailHelp" placeholder="Enter Full Name" name="name"> 
              </div> 
                <div class="form-group"> 
                      <label for="register-email">Email address</label> 
                      <input type="email" v-model="email" class="form-control" id="register-email" aria-describedby="emailHelp" placeholder="Enter email" name="email"> 
                      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> 
                </div> 
                <div class="form-group"> 
                      <label for="btn-submit-register">Password</label> 
                      <input type="password" v-model="password" class="form-control" id="register-password" placeholder="Password" name="password"> 
                </div> 
                <button type="submit" class="btn btn-primary" id="btn-submit-register">Submit</button> 
            </form> 
            <button id="btn-login" class="btn btn-link" @click="loginPage('Login Page')">Have Account? Let's Login</button>
      </div>
        <!--Register Page-->
</template>

<script>
export default {
    name: 'register',
    data(){
        return{
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        loginPage(page){
            this.$emit('loginPage', page)
        },
        register(){
            const obj = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            this.$emit('register', obj)
        }
    }
}
</script>

<style>

</style>