<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.id" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated" @click="userSignOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Sign Out
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="align-center">
        <span class="title">My Shop</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    computed: {
      items(){
        if(this.isAuthenticated){
          return [
            { id: 5, icon: 'dashboard', text: 'Dashboard', link: '/dashboard', level: 1},
            { id: 6, icon: 'local_offer', text: 'Manage Products', link: '/products', level: 1},
            { id: 7, icon: 'shopping_cart', text: 'Manage Orders', link: '/orders', level: 1}
          ]
        } else {
          return [
            { id: 1, icon: 'home', text: 'Home', link: '/', level: 99},
            { id: 2, icon: 'local_offer', text: 'Prices List', link: '/priceslist', level: 99},
            { id: 3, icon: 'person_add', text: 'Sign Up', link: '/signup', level: 1},
            { id: 4, icon: 'person', text: 'Sign In', link: '/signin', level: 1},
          ]
        }
      },
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      }
    },
    data() {
      return {
        drawer: true,
      }
    },
    methods: {
      userSignOut(){
        this.$store.dispatch('signOut')
      }
    }
  }
</script>