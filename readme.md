每一个`vue`文件由三个部分组成：`html+css+js`

`scoped`的作用是使所有组件之间的`css`样式不会相互影响到

### 引入组件的方式：

import ... from ...

export default {

components: {

...

}

}

之后就能使用该组件了,同时里面还可以传递一个信息



### 如何在子组件中获取父组件的信息并显示出来：

在子组件中使用slot标签，会将父组件中所有的信息显示到标签里面

![image-20230201175641099](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230201175641099.png)



### 路由：

在router中添加

下面是一个例子

![image-20230201180026331](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230201180026331.png)

前端渲染使用router-link标签，同时使用:to绑定属性,里面是一个对象

![image-20230201180506227](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230201180506227.png)



### 父组件向子组件传递信息：

![image-20230204114937438](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204114937438.png)

![image-20230204114950413](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204114950413.png)

![image-20230204114958261](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204114958261.png)



使用router-link实现前端渲染，其中:是v-bind:的缩写

![image-20230204123017945](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204123017945.png)

组件之间数据的交互，我们选择将所有的数据存储到最顶层的组件中,然后进行父子组件之间的值传递

父 =》子 ：props   两种定义变量的方式：1、不修改数据的用reactive 2、修改数据的用ref

子 =》父：事件

![image-20230204134004570](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204134004570.png)

传递到子组件中：

![image-20230204134020084](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204134020084.png)

在子组件中取出值：

![image-20230204134052790](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204134052790.png)

在子组件中就可以使用user对象了

![image-20230204134226307](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204134226307.png)

### 将一些值进行计算后展示出来的方式要使用`computed`：

![image-20230204134722445](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204134722445.png)

在上面直接使用

![image-20230204134731482](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204134731482.png)

### 如何给标签加上判断条件？

![image-20230204174759680](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204174759680.png)

### 子组件对父组件进行修改

同时当我们关注或者是取消关注之后要对父组件的状态进行更新，涉及到子组件对父组件的修改，那么如何做呢？

在子组件中的setup中定义两个函数，分别表示关注和取消关注，然后在上面的button中绑定事件，`v-on:click` == `@click`

状态修改遵循的原则是在哪里定义在哪里修改，所以我们要在父组件中修改，只不过是通过子组件触发父组件中的事件来完成的

1、在父组件中定义修改函数

![image-20230204182926454](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204182926454.png)

2、在父组件中为子组件绑定两个事件

![image-20230204183125269](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204183125269.png)

3、在子组件中的setup中传入context参数并调用里面的emit函数

![image-20230204183219517](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204183219517.png)

4、为子组件中的具体按钮绑定事件

![image-20230204183329058](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230204183329058.png)

总结：首先在子组件中触发点击事件，触发里面的follow和unfollow函数，在里面调使用emit函数触发父组件中为子组件绑定的事件，然后触发事件调用父组件中的函数对数据进行修改

### for循环：

![image-20230205072648515](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205072648515.png)

另一种写法，但不推荐

![image-20230205072922557](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205072922557.png)



实现发帖功能首先要获得textarea里面的功能，创建对象变量要用reactive，否则可以用ref

### 使用v-model绑定变量

![image-20230205075624514](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205075624514.png)

![image-20230205075714203](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205075714203.png)

### 子组件向父组件传递信息时传参写法：

![image-20230205081312115](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205081312115.png)

父组件中的事件触发函数

![image-20230205081359049](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205081359049.png)

### 使用`ajax`调用后端api

![image-20230205124052548](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205124052548.png)

当想取得字符串内的值要在前面加上`：`

![image-20230205124104757](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205124104757.png)

指针和悬浮效果：

![image-20230205124206460](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205124206460.png)

### 路由中的default

![image-20230205124822075](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205124822075.png)



### 使用`usestore`得到`url`中的参数：

路由中加上参数列表

![image-20230205125814516](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205125814516.png)

`navbar`中加上`params`

![image-20230205125858329](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205125858329.png)

对应控件中使用`usestre`存储id

![image-20230205125935923](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205125935923.png)

### `vuex`用来维护全局变量

state是用来存储所有数据的 == ref, reactive

当我们不想直接获取数据而是想对他们做一些计算再得到的话可以使用getters

![image-20230205225031834](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205225031834.png)

`actinos`里面写所有对于`state`的更新方式

![image-20230205225613932](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205225613932.png)

module用来对state里面的内容进行分割来防止代码过长不易阅读

举例：

首先创建一个单独的`js`文件维护一个变量

![image-20230205230253810](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205230253810.png)

创建一个变量处理该变量相关的操作，最后导出即可

![image-20230205230322642](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205230322642.png)

在主文件中导入

![image-20230205230453339](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230205230453339.png)

使用`store.state.user`访问属性

### 设置登录界面(`jwt`验证)

谨记引入$一定不要加上大括号

在store中定义全局函数login并将数据从后端得到

![image-20230206170515278](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230206170515278.png)

在login组件中调用全局函数login，使用dispatch函数,第一个参数是函数名，第二个参数可以传递我们需要的信息

![image-20230206170626292](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230206170626292.png)

进行`jwt`验证：

![image-20230206180718844](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230206180718844.png)

### 可知调用mutations里面的函数使用commit，调用actions里面的函数使用dispatch

### 成功登录后跳转

![image-20230206185708994](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230206185708994.png)

![image-20230206185659796](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230206185659796.png)

### 根据用户是否登录改变右上角状态：

![image-20230208121524433](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230208121524433.png)

![image-20230208121648112](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230208121648112.png)

### 事件中传参

![image-20230208112753946](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230208112753946.png)

![image-20230208112820569](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230208112820569.png)

### 使图片竖直居中：
![image-20230208115936728](C:\Users\86150\AppData\Roaming\Typora\typora-user-images\image-20230208115936728.png)