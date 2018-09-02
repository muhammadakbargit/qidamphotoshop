<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn slot="activator" small flat><v-icon>add</v-icon> Order</v-btn>
    <v-card>
      <v-toolbar dark flat>
        <v-btn icon dark @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Order</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat :disabled="!valid" @click.native="addOrder">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-toolbar light flat>
              <v-toolbar-title>Product Search</v-toolbar-title>
              <v-autocomplete
                :loading="loading"
                :items="items"
                :search-input.sync="search"
                v-model="select"
                cache-items
                class="mx-3"
                flat
                hide-no-data
                clearable
                hide-details
                label="Search Product"
                solo-inverted
              ></v-autocomplete>
            </v-toolbar>
            <template>
              <v-data-table
                :headers="headers"
                :items="charts"
                hide-actions 
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.id }}</td>
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left">{{ props.item.unit_price }}</td>
                  <td class="text-xs-left">{{ props.item.qty }}</td>
                  <td class="text-xs-left">{{ props.item.amount }}</td>
                  <td class="text-xs-center">
                    <button>
                      <v-icon small @click="increaseQty(props.index)">add</v-icon>
                    </button>
                    <button>
                      <v-icon small @click="decreaseQty(props.index)">remove</v-icon>
                    </button>
                    <button>
                      <v-icon small @click="removeProduct(props.index)">cancel</v-icon>
                    </button>
                  </td>
                </template>
              </v-data-table>
            </template>
              <v-card flat>
                <v-card-text>
                  Total : {{ total }}
                </v-card-text>
              </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
var moment = require('moment');

  export default {
    data () {
      return {
        valid: true,
        dialog: false,
        loading: false,
        items: [],
        search: null,
        select: null,
        charts: [],
        headers: [
          { text: 'ID', value: 'id', align: 'left', sortable: false},
          { text: 'Name', value: 'name', align: 'left', sortable: false },
          { text: 'Unit Price', value: 'unit_price', align: 'left', sortable: false },
          { text: 'QTY', value: 'qty', align: 'left', sortable: false },
          { text: 'Amount', value: 'amount', align: 'left', sortable: false },
          { text: 'Action', value: 'action', align: 'center', sortable: false }
        ]
      }
    },
    created(){
      this.$store.dispatch('fetchProductsChart')
    },
    computed: {
      productschart(){
        return this.$store.getters.productschart
      },
      total(){
        return this.charts.reduce((totalx, thing) => {
          return  totalx + Number(thing.amount)
        }, 0)
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
      select(val){
        if(val !== null && val !== undefined){
          let chart = {
            id: val,
            name: this.productschart[val].name,
            unit_price: this.productschart[val].price
          }
          if(!this.contains(this.charts, chart)){
            chart.qty = 1
            chart.amount = chart.unit_price
            this.charts.push(chart)
          }
        }
      }
    },
    methods: {
      querySelections (v) {
        this.loading = true
        setTimeout(() => {
          this.items = Object.keys(this.productschart)
          .map(key => {
            return { text: this.productschart[key].name, value: key }
          })
          .filter(s => {
            return (s.text || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },
      closeDialog(){
        this.dialog = false
      },
      contains(arr, value){
        for (let index = 0; index < arr.length; index++) {
          if(arr[index].id === value.id){
            arr[index].qty += 1 
            return true
          }
        }
        return false
      },
      increaseQty(index){
        this.charts[index].qty += 1
        this.charts[index].amount = this.charts[index].unit_price * this.charts[index].qty
      },
      decreaseQty(index){
        if(this.charts[index].qty === 1){
          this.charts.splice(index, 1)
        } else {
          this.charts[index].qty -= 1
          this.charts[index].amount = this.charts[index].unit_price * this.charts[index].qty
        }
      },
      removeProduct(index){
        this.charts.splice(index, 1)
      },
      addOrder(){        
        var lines = this.charts.reduce((obj, item) => {
          obj[item.id] = item
          return obj
        }, {})
        var order = {
          created_at: moment().format(),
          total: this.total,
          lines: lines
        }
        this.$store.dispatch('addOrder', order)
      }
    }
  }
</script>