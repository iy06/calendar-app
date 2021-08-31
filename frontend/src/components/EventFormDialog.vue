<template>
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <DialogSection icon="mdi-square" :color="event.color || 'blue'">
        <v-text-field v-model="name" label="タイトル"></v-text-field>
      </DialogSection>
      <DialogSection icon="mid-clock-outline">
        <DateForm v-model="startDate" />
        <TimeForm v-model="startTime" />
        <DateForm v-model="endDate" />
        <TimeForm v-model="endTime" />
      </DialogSection>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="submit">作成</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DialogSection from './DialogSection.vue';
import DateForm from './DateForm.vue';
import TimeForm from './TimeForm.vue';

export default {
  name: 'EventFormDialog',
  components: {
    DialogSection,
    DateForm,
    TimeForm,
  },
  data() {
    return {
      name: '',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    };
  },
  // コンポーネントが描画された時に文字列に変換した日時を代入する。
  created() {
    this.startDate = this.event.startDate;
    this.endDate = this.event.endDate;
    this.startTime = this.event.startTime;
    this.endTime = this.event.endTime;
  },
  computed: {
    ...mapGetters('events', ['event']),
  },
  methods: {
    ...mapActions('events', ['setEvent', 'setEditMode', 'createEvent']),
    closeDialog() {
      this.setEditMode(false);
      this.setEvent(null);
    },
    submit() {
      const params = {
        name: this.name,
        start: `${ this.startDate } ${ this.startTime || '' }`,
        end: `${ this.endDate } ${ this.endTime || '' }`,
      };
      this.createEvent(params);
      this.closeDialog();
    },
  },
};
</script>
