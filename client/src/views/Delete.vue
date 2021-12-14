<template>
  <v-container>
    <v-card class="mx-auto my-5" max-width="70%">
      <v-toolbar color="pink" dark dense> Delete Station</v-toolbar>
      <v-form class="pa-3">
        <v-select
          v-model="station"
          :items="stations"
          label="Abbreviation"
          required
          clearable
        ></v-select>
        <v-btn
          :disabled="!station"
          color="success"
          class="mr-4"
          @click="deleteStation"
        >
          Delete
        </v-btn>
      </v-form>
    </v-card>
    <v-card class="mx-auto my-5" max-width="70%">
      <v-toolbar color="pink" dark dense> Delete Train</v-toolbar>
      <v-form class="pa-3">
        <v-select
          v-model="train"
          :items="trains"
          label="Name"
          required
          clearable
        ></v-select>

        <v-btn
          :disabled="!train"
          color="success"
          class="mr-4"
          @click="deleteTrain"
        >
          Delete
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    train: '',
    station: '',
  }),
  props: {
    trains: Array,
    stations: Array,
  },
  methods: {
    async deleteTrain() {
      try {
        await axios({
          url: 'http://localhost:3000/train/' + this.train,
          method: 'DELETE',
        });
      } catch (error) {
        console.log(error);
      }
      this.train = '';
      this.$emit('getTrains');
    },
    async deleteStation() {
      try {
        await axios({
          url: 'http://localhost:3000/station/' + this.station,
          method: 'DELETE',
        });
      } catch (error) {
        console.log(error);
      }
      this.station = '';
      this.$emit('getStations');
    },
  },
};
</script>

<style lang="scss" scoped></style>
