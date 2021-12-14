<template>
  <v-container>
    <v-card class="mx-auto">
      <v-toolbar color="pink" dark>

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
                  <v-col
                    v-for="(key, index) in item"
                    :key="index"
                    cols="12"
                    sm="4"
                  >
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

            <v-divider
              v-if="index < departures.length - 1"
              :key="index"
            ></v-divider>
          </div>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card class="mx-auto my-5 col-md-5 col-sm-12">
      <v-row
        ><v-col md="6" sm="12">
          Add Train
          <v-text-field
            v-model="train.name"
            :counter="20"
            label="Name"
            required
          ></v-text-field>

          <v-select
            v-model="train.accessible"
            :items="['true', 'false']"
            label="Accessible"
            required
          ></v-select>

          <v-text-field
            v-model="train.seats"
            type="number"
            label="Seats"
            required
          ></v-text-field>

          <v-textarea
            v-model="train.desc"
            filled
            name="input-7-4"
            label="Description"
            value=""
          ></v-textarea>

          <v-btn
            :disabled="
              !train.accessible ||
              !train.seats ||
              !train.name ||
              train.name.length > 20
            "
            color="success"
            class="mr-4"
            @click="postTrain()"
          >
            Add train
          </v-btn>
        </v-col>
        <v-col md="6" sm="12">
          Add Station
          <v-text-field
            v-model="station.abbr"
            :counter="20"
            label="Abbreviation"
            required
          ></v-text-field>

          <v-text-field
            v-model="station.name"
            :counter="100"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="station.location"
            :counter="200"
            label="Location"
            required
          ></v-text-field>

          <v-btn
            :disabled="
              !station.name ||
              !station.abbr ||
              !station.location ||
              station.abbr.length > 20 ||
              station.name.length > 100 ||
              station.location.length > 200
            "
            color="success"
            class="mr-4"
            @click="postStation()"
          >
            Add Station
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      departures: [],
      selected: null,
      text: '',
      train: {},
      station: {},
    };
  },
  props: {
    stations: Array,
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
        this.departures = data;
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
        return error;
      }
      this.getDepatures();
    },
    async postEvent(stationFrom, stationTo, departTime, arrivalTime) {
      try {
        await axios({
          url: 'http://localhost:3000/ride',
          method: 'POST',
          data: {
            stationFrom,
            stationTo,
            departTime,
            arrivalTime,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    async swapEvents() {
      //Create Random Event
      let stationTo;
      let stationFrom;
      while (stationTo == stationFrom) {
        stationTo =
          this.stations[Math.floor(Math.random() * (this.stations.length - 1))];
        stationFrom =
          this.stations[Math.floor(Math.random() * (this.stations.length - 1))];
      }
      const departTime = this.randomTime();
      const arrivalTime = this.randomTime();
      //Post Event
      let answer;
      if (this.departures[0] != undefined) {
        answer = await this.deleteEvent(this.departures[0].id);
      }
      if (answer == undefined) {
        await this.postEvent(stationFrom, stationTo, departTime, arrivalTime);
      }
      //Refresh View
      this.getDepatures();
      //Wait until new Post
      setTimeout(() => {
        this.swapEvents();
      }, 10000);
    },
    randomTime() {
      let start = new Date(2012, 0, 1);
      let end = new Date();
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
      )
        .toTimeString()
        .slice(0, 8);
    },
    async postTrain() {
      try {
        await axios({
          url: 'http://localhost:3000/train',
          method: 'POST',
          data: this.train,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async postStation() {
      try {
        await axios({
          url: 'http://localhost:3000/train',
          method: 'POST',
          data: this.station,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    filtered() {
      return this.departures.filter(
        el =>
          el.zu.toLowerCase().includes(this.filter) ||
          el.von.toLowerCase().includes(this.filter),
      );
    },
    filter() {
      return this.text.toLowerCase();
    },
  },
  components: {},
};
</script>
