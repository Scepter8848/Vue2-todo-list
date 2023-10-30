<template>
  <transition name='todo' appear>
  <li>
          <label>
                                                        <!-- 这里的事件可以用点击或者change事件 -->
            <input type="checkbox" :checked='todo.done' @click='handleCheck(todo.id)'/>
             <!-- 使用传递过来的对象 -->
            <span v-show="!todo.isEdit">{{todo.title}}</span>
            <input 
            v-show="todo.isEdit" 
            type="text" 
            :value="todo.title"
            @blur='handleBlur(todo,$event)'
            ref="inputTitle"
            >
          
          </label>
          <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
          <button class="btn btn-edit" @click="handleEdit(todo)" v-show="!todo.isEdit">编辑</button>

        </li>
  </transition>
</template>

<script>
export default {
    name:'MyItem',
    // props:['todo','checkTodo','deleteTodo'],//2.接受list传过来的对象
    props:['todo'],//2.接受list传过来的对象  //事件总线，删掉
    methods:{
      // 勾选
      handleCheck(id){ //上边的todo.id是实参，这里的id是形参，通过handleChecke这个函数将实参传递给了形参id，这样点击每个事件的复选框都能得到这个点击的复选框的id，
        // 通知APP组件将done的值取反，因为点击要么勾选要么取消勾选，就是取反操作，去APP操作因为数据在APP
        // console.log(id);
        // this.checkTodo(id)//上边handleCheck的id是形参，实参是todo.id（绑定点击事件传递的）,实参传给形参，形参又作为实参传递给checkTodo的形参，传递回去，这一行是调用checkTodo函数进行传递参数
      this.$bus.$emit('checkTodo',id)
      },
      // 删除
      handleDelete(id){
        if(confirm('确定删除吗？老弟')){
        // console.log(id);
        // this.deleteTodo(id)                 //这是调用，并且传参
      this.$bus.$emit('deleteTodo',id)         //全局事件总线写法

        }
      },
      // 编辑
      handleEdit(todo){
        //eslint-disable-next-line
        if(todo.hasOwnProperty('isEdit')){
              todo.isEdit = true
        } else{
             this.$set(todo,'isEdit',true)
        }
        // 这里有两种写法，第一种用$nextTick
        this.$nextTick(function(){
             this.$refs.inputTitle.focus()
          
        })
        
        //第二种方法，用定时器,但是官方推荐用第一种方法，用的最多
        // setTimeout(()=>{
        //      this.$refs.inputTitle.focus()
        // },200)
          
        
      },
      // 失去焦点
      handleBlur(todo,e){
        if(!e.target.value.trim())  return alert('输入不能为空！')
        todo.isEdit = false
        this.$bus.$emit('updateTodo',todo.id,e.target.value)
      }
    }
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
background-color: #ddd;
}
li:hover button {
display: block;
/* background-color: #ddd; */
}
.todo-enter,.todo-leave-to{   
    transform: translateX(100%);           
}

.todo-enter-to,.todo-leave{
    transform: translateX(0);
} 

.todo-enter-active,.todo-leave-active{
    transition: 0.5s linear;
}
</style>