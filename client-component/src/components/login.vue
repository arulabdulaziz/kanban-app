<template>
  <div>
         <!--Form Login-->
       <div class="container" style="margin-top: 10%;" id="login-page">
        <div class="row justify-content-center mt-5">
          <div class="col-md-4">
            <div class="card">
              <div class="card-header bg-transparent mb-0"><h5 class="text-center">Please <span class="font-weight-bold text-primary">LOGIN</span></h5></div>
              <div class="card-body">
                  <!-- form!!-->
                <form @submit.prevent="login">
                  <div class="form-group">
                    <input type="text" name="email" class="form-control" placeholder="Email"  id="login-email" v-model="email">
                  </div>
                  <div class="form-group">
                    <input type="password" name="password" class="form-control" placeholder="Password" id="login-password" v-model="password">
                  </div>
                  <div class="form-group">
                    <input type="submit" name="" value="Login" class="btn btn-primary btn-block" id="btn-submit-login">
                  </div>
                </form>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
                <button id="btn-register" class="btn btn-link" @click="registerPage">Don't Have Account? Let's Register</button>
                <!-- form!!!-->
              </div>
            </div>
          </div>
        </div>
      </div>
    <!--Form Login-->
      </div>
</template>

<script>
export default {
    name: 'login',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        registerPage(){
            this.$emit('registerPage', 'Register Page')
        },
        login(){
            const obj = {
                email: this.email,
                password: this.password
            }
            this.$emit('login', obj)
        }
    }
}
</script>

<style>

</style>