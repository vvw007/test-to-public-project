<template>
  <ul class="list-group RoadMain col-sm-6">
    <li class="list-group-item" v-for="obj in arr" :key="obj.id">
      <input
        class="form-check-input me-1"
        type="checkbox"
        name="listGroupRadio"
        value=""
        id="firstRadio"
        v-model="obj.learned"
      />
      <label
        class="form-check-label"
        :class="{ islearned: obj.learned }"
        for="firstRadio"
        >{{ obj.name }}</label
      >
      <button @click="deleteItem(obj.id)">删除</button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["arr"],
  methods: {
    deleteItem(id) {
      this.$emit("delete", id);
    },
  },
};
</script>

<style scoped>
.RoadMain .islearned {
  /* text-decoration: line-through solid red 2px; */
  text-decoration: line-through;
  color: #ccc;
}
</style>
