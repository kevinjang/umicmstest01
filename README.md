# 数据模式

##### pages 渲染页面，

###### 		只实现数据的渲染，数据的修改都保存到models中去，临时数据修改都在页面的state中保存，只有点击确定时才推送到models。

###### 		但是又感觉不合理。推送到models以后就必须和数据库同步了，否则没有时点可以完成models和数据库的同步工作。

###### 		也就是在推送到models时就需要同步到数据库里了。

##### models数据逻辑

1. ###### effects - 远程请求数据，也可以调用reducers中定义的函数用于处理数据，如请求回来的数据调用一个保存的reducer函数以更新state中的数据；

2. ###### reducers - 处理state中的数据

3. ###### state - 数据存储中心

4. ###### namespace - 数据中心名称用于区别

![tianqi](../../tree/With-Breadcrumn/public/images/tianqi.svg)

##### services发起网络请求

##### mock响应网络请求

