<template>
  <v-container>
    <v-card class="mx-auto">
      <v-toolbar color="pink" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Upcoming Departures</v-toolbar-title>

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
          <v-list-item>
            <v-list-item-content>
              <v-row no-gutters>
                <v-col cols="12" sm="4">
                  <v-list-item-title v-text="'To'"></v-list-item-title>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-list-item-title v-text="'Depart /'"></v-list-item-title>
                  <v-list-item-title v-text="'Arrival'"></v-list-item-title>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-list-item-title v-text="'From'"></v-list-item-title>
                </v-col>
              </v-row>
            </v-list-item-content>
            <v-list-item-action> </v-list-item-action>
          </v-list-item>
          <div v-for="(item, index) in filtered" :key="item.id">
            <v-list-item :key="item.id">
              <v-list-item-content>
                <v-row no-gutters>
                  <v-col v-for="key in item" :key="key" cols="12" sm="4">
                    <v-list-item-title v-text="key"></v-list-item-title>
                  </v-col>
                </v-row>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn color="error" depressed @click="deleteEvent(item.id)"
                  >Delete event</v-btn
                >
              </v-list-item-action>
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
    this.swapEvents();
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
    async deleteEvent(id) {
      try {
        await axios({
          url: 'http://localhost:3000/ride/' + id,
          method: 'DELETE',
        });
      } catch (error) {
        console.log(error);
      }
      this.getDepatures();
    },
    async getStations() {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/stations',
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async postEvent(fk_bahnhofab, fk_bahnhofzu, abfahrt_zeit, ankunft_zeit) {
      console.log(fk_bahnhofab,fk_bahnhofzu,abfahrt_zeit,ankunft_zeit)
      try {
        await axios({
          url: 'http://localhost:3000/station',
          method: 'POST',
          data: {
            fk_bahnhofab,
            fk_bahnhofzu,
            abfahrt_zeit,
            ankunft_zeit,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    async swapEvents() {
      //Refresh View
      this.getDepatures();
      //Get Available Stations
      const available = await this.getStations();
      //Create Random Event
      const fk_bahnhofzu =
        available[Math.floor(Math.random() * (available.length - 1))].kuerzel;
      const fk_bahnhofab =
        available[Math.floor(Math.random() * (available.length - 1))].kuerzel;
      const abfahrt_zeit = this.randomTime();
      const ankunft_zeit = this.randomTime();
      //Post Event
      await this.postEvent(fk_bahnhofab, fk_bahnhofzu, abfahrt_zeit, ankunft_zeit);
      //Wait until new Post
      setTimeout(() => {
        this.swapEvents();
      }, /*Math.floor(Math.random() * 60000 + 5000)*/ 10000);
    },
    randomTime() {
      let start = new Date(2012, 0, 1);
      let end = new Date();
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      )
        .toTimeString()
        .slice(0, 8);
    },
  },
  computed: {
    filtered() {
      return this.items.filter(
        (el) =>
          el.zu.toLowerCase().includes(this.filter) ||
          el.von.toLowerCase().includes(this.filter)
      );
    },
    filter() {
      return this.text.toLowerCase();
    },
  },
  components: {},
};
</script>
