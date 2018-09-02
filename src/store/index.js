import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    layout: 'app-layout',
    products: [],
    orders: [],
    productschart: [],
    user: null,
    error: null,
    loading: false,
    snackbar: {
      snack: false,
      color: 'success',
      text: 'Hello World'
    }
  },
  mutations: {
    SET_LAYOUT(state, payload){
      state.layout = payload
    },
    SET_USER(state, payload){
      state.user = payload
    },
    SET_ERROR(state, payload){
      state.error = payload
    },
    SET_LOADING(state, payload){
      state.loading = payload
    },
    SET_PRODUCTS(state, payload){
      state.products = payload
    },
    SET_ORDERS(state, payload){
      state.orders = payload
    },
    SET_PRODUCTSCHART(state, payload){
      state.productschart = payload
    },
    SET_SNACKBAR(state, payload){
      state.snackbar = payload
    }
  },
  getters: {
    layout(state){
      return state.layout
    },
    products(state){
      return state.products
    },
    orders(state){
      return state.orders
    },
    user(state){
      return state.user
    },
    isAuthenticated(state){
      return state.user !== null && state.user !== undefined
    },
    snackbar(state){
      return state.snackbar
    },
    productschart(state){
      return state.productschart
    }
  },
  actions: {
    setLayout({commit}, payload){
      commit('SET_LAYOUT', payload)
    },
    signUp({commit}, payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('SET_USER', {email: firebaseUser.user.email})
        commit('SET_LOADING', false)
        router.push('/dashboard')
      })
      .catch(error => {
        commit('SET_ERROR', error.message)
        commit('SET_LOADING', false)
      })
    },
    signIn({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('SET_USER', {email: firebaseUser.user.email})
        commit('SET_LOADING', false)
        commit('SET_ERROR', null)
        router.push('/dashboard')
      })
      .catch(error => {
        commit('SET_ERROR', error.message)
        commit("SET_LOADING", false)
      })
    },
    autoSignIn({commit}, payload){
      commit('SET_USER', {email: payload.email})
    },
    signOut({commit}){
      firebase.auth().signOut()
      commit('SET_USER', null)
      router.push('/')
    },
    fetchProducts({commit}){
      const dbRefObj = firebase.database().ref('products');
      dbRefObj.on('value', snap => {
        const products = []
        const result = snap.val()
        for(let key in result){
          products.push({
            id: key,
            name: result[key].name,
            price: result[key].price,
            real_price: result[key].real_price
          })
        }
        commit('SET_PRODUCTS', products)
      })
    },
    fetchProductsChart({commit}){
      firebase.database().ref('products').on('value', snap => {
        const productschart = snap.val()
        commit('SET_PRODUCTSCHART', productschart)
      })
    },
    fetchOrders({commit}){
      const dbRefObj = firebase.database().ref('orders');
      dbRefObj.on('value', snap => {
        const orders = []
        const result = snap.val()
        for(let key in result){
          orders.push({
            id: key,
            order_date: result[key].created_at,
            total: result[key].total,
            lines: result[key].lines
          })
        }
        commit('SET_ORDERS', orders)
      })
    },
    addProduct({commit}, payload){
      const newProduct = {
        name: payload.name,
        price: payload.price,
        real_price: payload.real_price
      }
      firebase.database().ref('products').push(newProduct)
      .then(() => {
        commit('SET_SNACKBAR', {snack: true, color: 'success', text: '1 Product added'})
      })
      .catch((error) => {
        commit('SET_SNACKBAR', {snack: true, color: 'error', text: error.message})
      })
    },
    editProduct({commit}, payload){
      const updateProduct = {
        name: payload.name,
        price: payload.price,
        real_price: payload.real_price
      }
      firebase.database().ref('products').child(payload.id).update(updateProduct)
      .then(() => {
        commit('SET_SNACKBAR', {snack: true, color: 'success', text: '1 Product updated'})
      })
      .catch((error) => {
        commit('SET_SNACKBAR', {snack: true, color: 'error', text: error.message})
      })
    },
    deleteProduct({commit}, payload){
      firebase.database().ref('products').child(payload.id).remove()
      .then(() => {
        commit('SET_SNACKBAR', {snack: true, color: 'success', text: '1 Product deleted'})
      })
      .catch(() => {
        commit('SET_SNACKBAR', {snack: true, color: 'error', text: error.message})
      })
    },
    addOrder({commit}, payload){
      firebase.database().ref('orders').push(payload)
      .then(() => {
        
      })
      .catch((error) => {
        console.log(error)
        // commit('SET_SNACKBAR', {snack: true, color: 'error', text: error.message})
      })
    }
  }
})