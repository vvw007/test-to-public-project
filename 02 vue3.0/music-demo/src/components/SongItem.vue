<template>
  <van-cell center :title="musicName" :label="author + ' - ' + musicName">
    <template #right-icon>
      <van-icon name="play-circle-o" size="0.5rem" @click="playFn" />
    </template>
  </van-cell>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({ id: Number, author: String, musicName: String });

const router = useRouter();

function playFn() {
  router.push({ path: "/play", query: { id: props.id } });
}
</script>

<style></style>
