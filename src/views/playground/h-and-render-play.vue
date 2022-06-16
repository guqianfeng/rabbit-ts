<script lang="ts">
import { h } from 'vue'
export default {
  render () {
    // return h('div', {title: 'big title', className: 'box'}, '我是内容')
    return h("ul", {}, [
      h('li', {}, 111),
      h('li', {}, 222),
      h('li', {}, 333),
      h('li', {}, 444),
    ])
  }
}
</script>

<style scoped>
.box {
  width: 400px;
  height: 400px;
  background-color: pink;
}
</style>