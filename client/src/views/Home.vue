<template>
  <v-container>
    <v-card class="mx-auto">
      <v-toolbar color="pink" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Departures</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="text"
          hide-details
          background-color=""
          append-icon="mdi-magnify"
          flat
          single-line
          placeholder="Station name"
          solo-inverted
        ></v-text-field>
      </v-toolbar>

      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="pink--text"
          multiple
        >
          <div v-for="(item,index) in filtered" :key="item.id">
            <v-list-item :key="item.id">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.headline"
                  ></v-list-item-subtitle>

                  <v-list-item-subtitle
                    v-text="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="item.action"
                  ></v-list-item-action-text>

                  <v-icon v-if="!active" color="grey lighten-1">
                    mdi-star-outline
                  </v-icon>

                  <v-icon v-else color="yellow darken-3"> mdi-star </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
          </div>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      items: [],
      selected: null,
      text: '',
    };
  },
  created() {
    this.getDepatures();
  },
  methods: {
    async getDepatures() {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/rides',
        });
        this.items = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    filtered() {
      return this.items.filter(
        el =>
          el.name.toLowerCase().includes(this.filter) ||
          el.standort.toLowerCase().includes(this.filter),
      );
    },
    filter() {
      return this.text.toLowerCase();
    },
  },
  components: {},
};
</script>
