<template>
  <v-container fluid fill-height>
    <v-layout align-start justify-center>
      <v-flex xs12 sm12 md8>
          <v-card flat>
            <v-toolbar dark flat>
              <v-toolbar-title>Sign Up</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert
                v-model="alert"
                dismissible
                type="error"
              >
                {{ error }}
              </v-alert>
              <v-form ref="form" v-model="valid">
                <v-text-field prepend-icon="email" v-model="email" :rules="emailRules" name="email" label="Email" type="text"></v-text-field>
                <v-text-field prepend-icon="lock" v-model="password" :rules="passwordRules" name="password" label="Password" type="password"></v-text-field>
                <v-text-field prepend-icon="lock" v-model="confirm_password" :rules="confirm_passwordRules" name="confirm_password" label="Confirm Password" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider class="mt-1"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="userSignUp" :disabled="!valid">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alert: false,
      valid: true,
      email: '',
      password: '',
      confirm_password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 6) || 'Password must be more than 6 characters'
      ],
      confirm_passwordRules: [
        v => !!v || 'Confirm Password is required',
        v => (v === this.password) || 'Confirm Password does not match the Password'
      ]
    }
  },
  computed: {
    error(){
      return this.$store.state.error
    },
    loading(){
      return this.$store.state.loading
    }
  },
  watch: {
    error(value){
      if(value){
        this.alert = true
      }
    },
    alert(value){
      if(!value){
        this.$store.commit('SET_ERROR', null)
      }
    }
  },
  methods: {
    userSignUp(){
      if(this.$refs.form.validate()){
        this.$store.dispatch('signUp', {email: this.email, password: this.password})
      }
    }
  }
}
</script>
