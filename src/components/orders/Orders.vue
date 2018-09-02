<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar flat dark>
          <v-toolbar-title>Manage Orders</v-toolbar-title>
          <v-spacer></v-spacer>
          <add-order></add-order>
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
            <v-data-table :headers="headers" :items="orders" :search="search">
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.order_date }}</td>
                <td class="text-xs-left">{{ props.item.total }}</td>
                <td class="text-xs-center">
                  <v-tooltip top>
                    <v-icon small slot="activator" @click="viewList(props.item)">view_list</v-icon>
                    <span>View Products</span>
                  </v-tooltip>
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
import AddOrder from './AddOrder'

export default {
  components: {
    'add-order': AddOrder
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'ID', value: 'id', align: 'left', sortable: false},
        { text: 'Order Date', value: 'order_date', align: 'left' },
        { text: 'Total', value: 'total', align: 'left' },
        { text: 'Action', value: 'action', align: 'center', sortable: false}
      ]
    }
  },
  created(){
    this.$store.dispatch('fetchOrders')
  },
  computed: {
    snackbar(){
      return this.$store.getters.snackbar
    },
    orders(){
      return this.$store.getters.orders
    }
  },
  methods: {
    viewList(item){
      console.log(item)
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
