<template>
  <div class="todo-footer" v-show="todos.length">
        <label>
          <input type="checkbox" :checked='isAll' @click="checkAll"/>
        </label>
        <span>
          <span>已完成{{doneTotal}}</span> / 全部{{todos.length}}
        </span>
        <button class="btn btn-danger" @click='clearAll'>清除已完成任务</button>
        
    </div>
</template>

<script>
export default {
    name:'MyFooter',
    props:['todos',],
    computed:{
      doneTotal(){
        // 方法一：
        // let i = 0
        // this.todos.forEach(todo => {
        //   if(todo.done === true) i++
          
        // });
        // return i

        // 方法二：利用reduce函数reduce(（pre，current）=>{},0) 这个0是初始值！！！
      //  return this.todos.reduce((pre,todo)=>{
      //     return pre + (todo.done ? 1 : 0)
      //   },0)
        
        // 方法二的简写:
        return this.todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0),0)
      },
      isAll(){
        return this.doneTotal === this.todos.length && this.todos.length > 0
      }
    },
    methods:{
      checkAll(e){
        // console.log(e.target.checked);

        // this.checkAllTodo(e.target.checked)        //不用自定义事件的写法
        this.$emit('checkAllTodo',e.target.checked)   //用了自定义事件的写法
      },

      clearAll(){
        if(confirm('确定要删除所有已完成任务吗？小老弟')){
          // this.clearAllTodo()                       //不用自定义事件的写法
          this.$emit('clearAllTodo')                   //用了自定义事件的写法,不需要传参所以只写'clearAllTodo'自定义事件名

        }
      }
    }
}
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>