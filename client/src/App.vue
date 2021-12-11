<template>
  <v-app>
    <v-app-bar
      app
      absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-btn icon class="mx-1" to="/">
        <v-img src="@/assets/logo.svg"></v-img>
      </v-btn>
      <v-toolbar-title>Train Schedule</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom right temporary>
      <v-list nav dense>
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
          class="text-right"
        >
          <v-list-item @click.stop="drawer = !drawer">
            <v-icon class="ms-auto">mdi-window-close</v-icon>
          </v-list-item>

          <v-list-item to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/update">
            <v-list-item-title>Update</v-list-item-title>
          </v-list-item>

          <v-list-item to="/remove">
            <v-list-item-title>Remove</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main app>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
  }),
};
</script>
