<template>
    <div class="todo-header">                                  <!-- 绑定一个键盘事件，函数名是add -->
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add"/>
        <!-- <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add"/>  -->
                                                                <!-- //方法二 用v-model实现 -->
    </div>
    
</template>

<script>
// 引入nanaoid库，生成唯一的ID
import {nanoid} from 'nanoid'
export default {
    name:'MyHeader',
    props:[],
    data(){
        return{
        // title:''  //方法2
        title:''
        }
    },
    methods:{
        add(){  
            
            if(this.title.trim() === '') return alert('输入不能为空')//加一个判断，如果输入为空就弹出提示
            // add(e){      //如果是使用第二种方法，就不要写这个e，因为报错显示，你定义了却没有用，这不符合规定
            // 将用户输入的笔记包装成一个对象
                       // 调用这个库，别忘了加（）小括号
            // const todoObj = {id:nanoid(),title:e.target.value,done:false}
            const todoObj = {id:nanoid(),title:this.title,done:false}
            
            // console.log(todoObj.title);
            // this.receive(todoObj)
            this.$emit('receive',todoObj)
            this.title=''
            // e.target.value=''     //较真来说这里是进行了DOM操作，可以用第二种方法：使用v-mode='title'，然后配置data，里面是title=''，然后更改e.target.value
        
        // add(){
        //     console.log(this.title);   //方法2
        // }
         },

},
}
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}

</style>