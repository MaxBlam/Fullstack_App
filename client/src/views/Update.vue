<template>
  <v-container>
    <v-card class="mx-auto my-5" max-width="70%">
      <v-toolbar color="pink" dark dense> Change Station</v-toolbar>
      <v-form class="pa-3">
        <v-select
          v-model="abbr"
          :items="stations"
          :rules="[(v) => !!v || 'Item is required']"
          label="Abbreviation"
          required
        ></v-select>

        <v-text-field
          v-model="stationName"
          :counter="100"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="location"
          :counter="200"
          label="Location"
          required
        ></v-text-field>

        <v-btn
          :disabled="
            !abbr ||
            !stationName ||
            !location ||
            location.length > 200 ||
            stationName.length > 100
          "
          color="success"
          class="mr-4"
          @click="postStation"
        >
          Update
        </v-btn>
      </v-form>
    </v-card>
    <v-card class="mx-auto my-5" max-width="70%">
      <v-toolbar color="pink" dark dense> Change Train</v-toolbar>
      <v-form class="pa-3">
        <v-select
          v-model="train"
          :items="trains"
          label="Train"
          required
        ></v-select>

        <v-select
          v-model="accessibility"
          :items="['true', 'false']"
          label="Accessible"
          required
        ></v-select>

        <v-text-field
          v-model="seats"
          label="Seats"
          type="number"
          required
        ></v-text-field>

        <v-textarea
          filled
          v-model="desc"
          label="Description"
          value=""
        ></v-textarea>

        <v-btn
          :disabled="!train || !accessibility || !seats"
          color="success"
          class="mr-4"
          @click="postTrain"
        >
          Update
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    location: '',
    accessibility: false,
    abbr: '',
    stationName: '',
    trains: [],
    train: '',
    desc: '',
    seats: '',
  }),
  created() {
    this.getTrains();
  },
  props: {
    stations: Array,
  },
  methods: {
    async postStation() {
      try {
        await axios({
          url: 'http://localhost:3000/station/' + this.abbr,
          method: 'PATCH',
          data: {
            station: {
              name: this.stationName,
              standort: this.location,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    async postTrain() {
      try {
        await axios({
          url: 'http://localhost:3000/train/' + this.train,
          method: 'PATCH',
          data: {
            train: {
              barrierefrei: this.accessibility,
              plaetze: this.seats,
              beschreibung: this.desc,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getTrains() {
      try {
        let { data } = await axios({
          url: 'http://localhost:3000/trains',
          method: 'GET',
        });
        this.trains = data.map((el) => el['name']);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
