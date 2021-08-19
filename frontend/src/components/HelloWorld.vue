<template>
  <div>
    <p>{{ message }}</p>
    <div v-if="visibility">
      <p>{{ 'visibility:' + visibility }}</p>
    </div>
    <div v-else>
      <p>{{ 'visibility:' + visibility }}</p>
    </div>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </ul>
    <input type="text" v-model="message" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: 'Hello World!',
      visibility: true,
      items: [
        { id: 1, text: 'item1' },
        { id: 2, text: 'item2' },
        { id: 3, text: 'item3' },
      ],
    };
  },
};
</script>

<style scoped></style>
