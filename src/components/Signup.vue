<template>
  <div>
    <h1>signup</h1>


    <div class="container">
      <div class="row">
        <div class="center-form panel">
          <div class="panel-body">
            <h2 class="text-center">Sign up</h2>
            <form name="signupForm">
              <div class="form-group has-feedback"
                   ng-class="{ 'has-error' : signupForm.displayName.$invalid && signupForm.displayName.$dirty }">
                <input class="form-control input-lg" type="text" name="displayName" v-model="user.displayName"
                       placeholder="Name" required autofocus>
                <span class="ion-person form-control-feedback"></span>
                <div class="help-block text-danger" ng-if="signupForm.displayName.$dirty"
                     ng-messages="signupForm.displayName.$error">
                  <div ng-message="required">You must enter your name.</div>
                </div>
              </div>
              <div class="form-group has-feedback"
                   ng-class="{ 'has-error' : signupForm.email.$invalid && signupForm.email.$dirty }">
                <input class="form-control input-lg" type="email" id="email" name="email" v-model="user.email"
                       placeholder="Email" required>
                <span class="ion-at form-control-feedback"></span>
                <div class="help-block text-danger" ng-if="signupForm.email.$dirty"
                     ng-messages="signupForm.email.$error">
                  <div ng-message="required">Your email address is required.</div>
                  <div ng-message="pattern">Your email address is invalid.</div>
                </div>
              </div>
              <div class="form-group has-feedback"
                   ng-class="{ 'has-error' : signupForm.password.$invalid && signupForm.password.$dirty }">
                <input password-strength class="form-control input-lg" type="password" name="password"
                       v-model="user.password" placeholder="Password" required>
                <span class="ion-key form-control-feedback"></span>
                <div class="help-block text-danger" ng-if="signupForm.password.$dirty"
                     ng-messages="signupForm.password.$error">
                  <div ng-message="required">Password is required.</div>
                </div>
              </div>
              <div class="form-group has-feedback"
                   ng-class="{ 'has-error' : signupForm.confirmPassword.$invalid && signupForm.confirmPassword.$dirty }">
                <input password-match="user.password" class="form-control input-lg" type="password"
                       name="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password">
                <span class="ion-key form-control-feedback"></span>
                <div class="help-block text-danger" ng-if="signupForm.confirmPassword.$dirty"
                     ng-messages="signupForm.confirmPassword.$error">
                  <div ng-message="compareTo">Password must match.</div>
                </div>
              </div>
              <div class="form-group has-feedback">
                <input password-match="user.role" class="form-control input-lg" type="text" name="role"
                       v-model="user.role" placeholder="Role">
                <span class="ion-key form-control-feedback"></span>
              </div>
              <p class="text-center text-muted">
                <small>By clicking on Sign up, you agree to <a href="#">terms & conditions</a> and <a href="#">privacy policy</a>
                </small>
              </p>
              <button type="button" @click="signup" class="btn btn-lg btn-block btn-primary">Sign up...</button>
              <br/>
              <p class="text-center text-muted">Already have an account? <a href="/#/login">Log in now</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="w3-container">-->
    <!--<h2>W3.CSS Login Modal</h2>-->

    <!--<button onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-green w3-large">Login</button>-->

    <!--<div id="id01" class="w3-modal w3-hide w3-show">-->
    <!--<div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">-->

    <!--<div class="w3-center"><br>-->
    <!--<span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-transparent w3-display-topright" title="Close Modal">×</span>-->
    <!--<img src="img_avatar4.png" alt="Avatar" style="width:30%" class="w3-circle w3-margin-top">-->
    <!--</div>-->

    <!--<form class="w3-container" action="/action_page.php">-->
    <!--<div class="w3-section">-->
    <!--<label><b>Username</b></label>-->
    <!--<input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username" name="usrname" required>-->
    <!--<label><b>Password</b></label>-->
    <!--<input class="w3-input w3-border" type="text" placeholder="Enter Password" name="psw" required>-->
    <!--<button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Login</button>-->
    <!--<input class="w3-check w3-margin-top" type="checkbox" checked="checked"> Remember me-->
    <!--</div>-->
    <!--</form>-->

    <!--<div class="w3-container w3-border-top w3-padding-16 w3-light-grey">-->
    <!--<button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>-->
    <!--<span class="w3-right w3-padding w3-hide-small">Forgot <a href="#">password?</a></span>-->
    <!--</div>-->

    <!--</div>-->
    <!--</div>-->
    <!--</div>-->


  </div>
</template>

<script>


  import auth from '../auth'

  export default {
    name: 'signup',
    data() {
      return {
        showConfirm: false,
        user : {
          displayName: 'Sangbum Woo',
          email: 'sbwoo87@gmail.com',
          password: 'password',
          role: 'admin'
        },
        confirmPassword : 'password',

      }
    },
    methods: {
      signup : function () {
        //alert('signup')

        auth.register(this, this.user);



//        this.$http.post('http://localhost:3000/auth/signup', this.user)
//          .then(function (response) {
//            //this.get();
//          });



      }
    }
  }

</script>

<style>
  @import '../assets/css/w3.css';

</style>
