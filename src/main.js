import Vue from 'vue'
import App from './App'
import firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'

Vue.use(Vuetify)

firebase.initializeApp({
  apiKey: "AIzaSyCc_cmgmYYulbgxm1PsdGMR7kfc7wT6Nkk",
  authDomain: "qidamshop.firebaseapp.com",
  databaseURL: "https://qidamshop.firebaseio.com",
  projectId: "qidamshop",
  storageBucket: "qidamshop.appspot.com",
  messagingSenderId: "216068039854"
});

Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
      created(){  
        if(firebaseUser){
          store.dispatch('autoSignIn', firebaseUser)
        }
      }
    })
  unsubscribe()
})