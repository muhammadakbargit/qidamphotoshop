<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar flat dark>
          <v-toolbar-title>Manage Products</v-toolbar-title>
          <v-spacer></v-spacer>
          <add-product></add-product>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          />
        </v-toolbar>
        <template>
          <v-card>
            <v-data-table :headers="headers" :items="products" :search="search">
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.price }}</td>
                <td class="text-xs-left">{{ props.item.real_price }}</td>
                <td class="text-xs-center">
                  <edit-product :product="props.item"></edit-product>
                  <delete-product :id="props.item.id"></delete-product>
                </td>
              </template>
              <v-alert outline slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
     <v-snackbar v-model="snackbar.snack" :color="snackbar.color" :timeout="5000">
        {{ snackbar.text }}
        <v-btn flat @click="snackbar.snack = false">
          Close
        </v-btn>
      </v-snackbar>
  </v-container>
</template>

<script>
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'

export default {
  components: {
    'add-product': AddProduct,
    'edit-product': EditProduct,
    'delete-product': DeleteProduct
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'ID', value: 'id', align: 'left', sortable: false},
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Price', value: 'price', align: 'left' },
        { text: 'Real Price', value: 'real_price', align: 'left' },
        { text: 'Action', value: 'action', align: 'center', sortable: false}
      ]
    }
  },
  created(){
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products(){
      return this.$store.getters.products
    },
    snackbar(){
      return this.$store.getters.snackbar
    }
  },
  watch: {
    snackbar(value){
      if(value.snack == true){
        setTimeout(() => {
          this.$store.commit('SET_SNACKBAR', {snack: false, color: 'success', text: 'Hello World'})
        }, 5000)
      }
    }
  }
}
</script>
