<<template>
  <div>
    <!-- 1.变量准备-静态页面铺设 -->
    <h1>{{ message }}</h1>
    <!-- 2.方法准备-事件处理 -->
     <button @click.prevent="btn">玩转vue3</button>
  </div> 
</template>

<script>


export default {
  // 1. 准备变量
  data(){
    return {
      message: 'Hello, Vue 3!'
    }
  },
  // 2. 准备方法
  methods: {
    btn(){ 
      this.message = this.message.split(``).reverse().join(``)
    }
}
}

</script>

<style>

</style>>