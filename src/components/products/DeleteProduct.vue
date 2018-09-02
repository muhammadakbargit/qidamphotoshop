<template>
  <v-dialog v-model="dialog" persistent max-width="350">
    <v-icon small slot="activator">delete</v-icon>
    <v-card>
      <v-card-text class="subheading">Do you want to delete this product ?</v-card-text>
      <v-divider class="mt-1"></v-divider>
      <v-card-actions>
        <v-btn color="success" small flat @click.native="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" small flat @click="deleteProduct">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      deleteProduct(){
        this.$store.dispatch('deleteProduct', {id: this.id})
        // console.log(this.id)
        this.dialog = false
      }
    }
  }
</script>