<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">本日</v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>

    <v-sheet height="94vh">
      <v-calendar ref="calendar" v-model="value" :events="events" @change="fetchEvents" locale="ja-jp" @click:event="showEvent" />
    </v-sheet>

    <v-dialog :value="event !== null">
      <div v-if="event !== null">
        <v-card>
          <h1>予定詳細</h1>
          <p>name: {{ event.name }}</p>
          <p>start: {{ event.start.toLocaleString() }}</p>
          <p>end: {{ event.end.toLocaleString() }}</p>
          <p>timed: {{ event.timed }}</p>
          <p>description: {{ event.description }}</p>
          <p>: {{ event.color }}</p>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

// メモ // 下記の記述は必要なのか？ // :day-format="(timestamp) => new Date(timestamp.date).getDate()" // :month-format="(timestamp) => new
Date(timestamp.date).getMonth()"

<script>
import { format } from 'date-fns';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Calendar',
  data() {
    return {
      // 表示する月を指定
      value: format(new Date(), 'yyyy/MM/dd'),
      dialogMessage: '',
    };
  },
  computed: {
    ...mapGetters('events', ['events', 'event']),
    title() {
      return format(new Date(this.value), 'yyyy年M月');
    },
  },
  methods: {
    ...mapActions('events', ['fetchEvents', 'setEvent']),
    setToday() {
      this.value = format(new Date(), 'yyyy/MM/dd');
    },
    showEvent({ event }) {
      console.log(event);
      this.setEvent(event);
    },
  },
};
</script>
