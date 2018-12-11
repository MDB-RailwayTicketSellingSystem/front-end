This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



______

管理员部分图表：

1.实验一中的查询所有购票记录（Timesten&Oracle）

2.实验二中的查询所有购票记录（Java&pl/sql）

# 实验一

## 研究课题

研究不同sql语句在oracle和timesten上执行速度的差异

## 实验目的

1. 学会在linux上部署timesten数据库；
2. 使用jdbc连接timesten数据库；
3. 学会在linux环境下Timesten内存数据库各种命令、函数及过程的基本使用；
4. 了解timesten的使用场景及其性能

## 实验材料

铁路售票系统中对数据库的操作语句、timesten数据库、oracle数据库

## 实验设计

1. 分别测试各类sql语句在oracle数据库和timesten数据库上的耗时。
2. 从应用程序的各种对数据库操作的语句中，选择下列各类型语句进行对比实验。

1. 分别记录各个语句在oracle数据和timesten数据库上的执行时间

## 实验结果分析

对比分析sql语句在不同数据库上执行时间的快慢，并分析造成此现象的原因。

# 实验二

## 研究课题

尝试编写PL/SQL存储过程，并在java中调用

## 实验目的

1. 学习pl/sql编程
2. 学习在Java 中调用存储过程
3. 了解pl/sql程序的使用场景及其性能

## 实验材料

铁路售票系统的数据和实际程序、timesten数据库

## 实验设计

1. 确定应用程序中适合写为pl/sql存储过程的部分
2. 记录原本使用java+sql的执行时间
3. 将其写为pl/sql存储过程，并将其与实际程序连接使用
4. 记录改写后的执行时间

## 实验结果分析

将纯java编写sql语句并处理数据的时间与调用pl/sql程序处理的时间进行对比，根据对比结果分析原因。

简述pl/sql的使用场景，并分析其与其他语言结合sql语句操作数据库的优缺点。

# 实验三

## 研究课题

尝试在timesten中对sql语句进行性能调优

## 实验目的

1. 学习在timesten中建立索引
2. 学习使用查询执行计划（query execution plan）作为参考进行timesten性能调优

## 实验材料

铁路售票系统的数据和实际程序、timesten数据库

## 实验设计

1. 为数据库设置合理的索引
2. 进行查询操作并记录查询时间
3. 记录、阅读查询执行计划并分析
4. 根据查询执行计划尝试改进查询语句
5. 运行 TimesTen Index Advisor重建索引
6. 再次进行查询语句并记录查询时间

## 实验结果分析

1. 如何阅读执行计划
2. 分析实验中用到的具体查询语句前后变化
3. 分析重建索引对查询语句的影响

# 实验四

## 研究课题

大量数据操作请求下事务处理性能对比

## 实验目的

1. 探索timesten在短时间内响应大量数据请求的优越性

## 实验材料

铁路售票系统的数据和实际程序、timesten数据库

## 实验设计

1. 模拟大量用户同时查询时刻表

- 串行模式
- 并行模式

1. 模拟大量用户同时订票、取消订票

- 串行模式
- 并行模式

## 实验结果分析

1. 对比oracle和timesten对于大量事务请求的处理能力，并尝试分析原因