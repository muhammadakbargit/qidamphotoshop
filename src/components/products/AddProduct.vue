<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn slot="activator" small flat><v-icon>add</v-icon> Product</v-btn>
    <v-card>
      <v-toolbar dark flat>
        <v-btn icon dark @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Product</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat :disabled="!valid" @click="addProduct">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-form ref="form" v-model="valid">
              <v-text-field name="name" label="Name" v-model="name" :rules="nameRules" type="text" required></v-text-field>
              <v-text-field name="price" label="Price (in Rp)" v-model="price" :rules="priceRules" type="number"></v-text-field>
              <v-text-field name="real_price" label="Real Price (in Rp)" v-model="real_price" :rules="real_priceRules" type="number"></v-text-field>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        valid: true,
        name: '',
        price: 1,
        real_price: 1,
        nameRules: [
          v => !!v || 'Name is required'
        ],
        priceRules: [
          v => !!v || 'Price is required',
          v => (v && v > 0) || 'Price must be larger than 0'
        ],
        real_priceRules: [
          v => !!v || 'Real Price is required',
          v => (Number(v) <= Number(this.price)) || 'Real Price must be smaller than or same as Price'
        ]
      }
    },
    methods: {
      addProduct(){
        this.$store.dispatch('addProduct', {name: this.name, price: this.price, real_price: this.real_price})
        this.closeDialog()
      },
      closeDialog(){
        this.clearForm()
        this.dialog = false
      },
      clearForm(){
        this.name = ''
        this.price = 1
        this.real_price = 1
      }
    }
  }
</script>