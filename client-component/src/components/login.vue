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
                 <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
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
import GoogleLogin from 'vue-google-login';
export default {
    name: 'login',
    props: ['onFailure','logoutButton', 'onCurrentUser'],
    data(){
        return {
            email: '',
            password: '',
            params: {
              client_id: "413611539602-j0iauu3m1dm05kg57kk6sh5l6kq5o8rb.apps.googleusercontent.com"
            },
            renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
            }
        }
    },
    components: {
      GoogleLogin
    },
    methods: {
      onSuccess(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token, '<<<<<<<<<< id token');
        // console.log(googleUser, '<<<<<<<<<<<<<<<<<<<<<');

        // This only gets the user information: id, name, imageUrl and email
        // console.log(googleUser.getBasicProfile());
        this.$emit('onSignIn', id_token)
        },
        registerPage(){
            this.$emit('registerPage', 'Register Page')
        },
        login(){
            const obj = {
                email: this.email,
                password: this.password
            }
            this.$emit('login', obj)
        },
    }
}
</script>

<style>

</style>