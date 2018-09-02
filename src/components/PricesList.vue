<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar flat dark>
          <v-toolbar-title>Prices List</v-toolbar-title>
          <v-spacer></v-spacer>
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
              </template>
              <v-alert outline slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'ID', value: 'id', align: 'left', sortable: false},
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Price', value: 'price', align: 'left' },
      ],
    }
  },
  computed: {
    products(){
      return this.$store.getters.products
    }
  }
}
</script>
