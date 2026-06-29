<<template>
  <div id="app">
    <h3>{{ msg }}</h3>
    <div>
      <div class="title">
<h4>芙蓉楼送辛渐</h4>
<!-- 1.绑定点击事件 -->
      <span @click="togFn" class="btn">
        <!-- 4. 根据isShow的值显示不同文字 -->
        {{ isShow ? '收起' : '展开' }} </span>
      </div>
      <!-- 2.v-show配合变量来控制标签隐藏出现 -->
      <div v-show="isShow" class="container">
        <p>寒雨连江夜入吴,</p>
        <p>平明送客楚山孤。</p>
        <p>洛阳亲友如相问，</p>
        <p>一片冰心在玉壶。</p>
      </div>
    </div>
  </div> 
</template>

<script>


export default {
  // 1. 准备变量
  data(){
    return {
      msg: '案例：折叠面板',
      isShow: true
    }
  },
  // 2. 准备方法
  methods: {
    togFn(){ 
      // 3. 点击时, 把值改成false, 这样就会隐藏标签了
      this.isShow = !this.isShow;
    }
}
}

</script>

<style lang="scss">
// 变量：$color: red;
// 嵌套：父 { 子 { ... } }
// 混合器：@mixin xxx { ... } 和 @include xxx;
// 模块化：@use 'file.scss'
// 继承：@extend .XXX
$color: rgb(204, 204, 204);
body{
  background-color:$color;
#app{
  width: 400px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 1em;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
    padding: 1em 2em 2em;
  border: 4px solid rgb(138, 43, 226);
  h3 {
      text-align: center;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ccc;
      padding: 0 1em;
    }
    .title h4 {
      line-height: 2;
      margin: 0;
    }
    .container {
      border: 1px solid #ccc;
      padding: 0 1em;
    }
    .btn {
      /* 鼠标改成手的形状 */
      cursor: pointer;
    }
}
}
</style>>