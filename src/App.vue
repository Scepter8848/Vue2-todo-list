<template>
    
<div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <MyHeader @receive='receive'/>
      <!-- <MyList :todos="todos" :checkTodo='checkTodo' :deleteTodo='deleteTodo'/> 未利用全局事件总线  -->
      <MyList :todos="todos"/><!-- 利用了全局事件总线，所以不用给list传这两个数据:checkTodo='checkTodo' :deleteTodo='deleteTodo' -->
      <MyFooter :todos='todos' @checkAllTodo='checkAllTodo' @clearAllTodo='clearAllTodo'/>
    </div>
  </div>
</div>


</template>

<script>
import MyFooter from './components/MyFooter.vue'
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'

export default {
    name:'App',
    components:{MyFooter,MyHeader,MyList},
    data(){
            return{
              // 原版写死的：
                // todos:[
                //     // {id:'001',title:'吃饭',done:true},   //todoObj
                //     // {id:'002',title:'睡觉',done:true},
                //     // {id:'003',title:'打豆豆',done:true}
                // ]

              //采用本地存储的：
              // todos:JSON.parse(localStorage.getItem('todos'))//用户第一使用会报错，因为第一次使用没有数据，解析空数据返回null，然后todos传递给其他组件的时候就会报错，所以有了下一行的‘或’一个空数组，空数组有长度！！！
              todos:JSON.parse(localStorage.getItem('todos')) || []
            }
        },

    methods:{
      //添加一个笔记并展示在页面上
      // receive函数是APP给list的一个函数，通过这个函数实现将list中的数据传递给APP
      receive(e){      
          // console.log('App组件收到了数据：',e);//打印e的内容是：{id: 'To6OAQ3RfKNmolwTKfJbE', title: '订单', done: false}
          // 将包装完毕后的对象，也就是这个e，放到todos里面进行展示，用unshift
          this.todos.unshift(e)
      },

      // 勾选或者取消勾选一个todo
      checkTodo(id){
      
                          // todo是传递的一个参数，后边还可以有index，表示索引号
        this.todos.forEach((todo)=>{
          if(todo.id === id) todo.done = !todo.done
         
        })
      },

      // 删除一个todo
      deleteTodo(id){
        this.todos = this.todos.filter((todo)=>{
          return todo.id !== id
        })
      },

      // 底部复选框，全选或者全不选
      checkAllTodo(done){
        this.todos.forEach((todo)=>{
          todo.done = done
        })
      },

      // 清楚已完成的任务
      clearAllTodo(){
        this.todos = this.todos.filter((todo)=>{
          return  !todo.done
        })
      },

      // 更新一个todo
      updataTodo(id,title){
        this.todos.forEach((todo)=>{
          if(todo.id === id) todo.title = title
          
          })
      }
    },
    
    watch:{
      // // 方法一，但是有bug,比如勾选了任务的复选框之后，刷新页面，已勾选的复选框会变为未勾选，原因是本地存储里面不知道你勾选了 
      // //监视todos，所以函数名是todos，监视谁就用写谁  // 操作的是谁，形参value就是谁
      // todos(value){
      //   // console.log(value);//value就是这个，[{…}, __ob__: Observer]，是一个数组对象，里面的title是你输入的任务，
        
      //   // 进行本地存储        todos是存储的键名，后边的JSON.stringify(value)是值，键值对！！！
      //   localStorage.setItem('todos',JSON.stringify(value))
      
      todos:{
        deep:true,
        handler(value){
        localStorage.setItem('todos',JSON.stringify(value))

        }
      }
      

    },


    mounted(){
      this.$bus.$on('checkTodo',this.checkTodo)  //checkTodo事件被触发，就调用后边的checkTodo函数
      this.$bus.$on('deleteTodo',this.deleteTodo)
      this.$bus.$on('updateTodo',this.updataTodo)
    },
    beforeDestroy() {                            //最好加上这个beforeDestroy，才是一个完整的事件总线
      this.$bus.$off('checkTodo')
      this.$bus.$off('deleteTodo')
      this.$bus.$off('updateTodo')

    }


 
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(71, 188, 234);
  margin-right: 10px;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}







</style>