<template>
  <div>
    <el-input placeholder="请输入内容" v-model="query.target" style="width: 500px;" class="handle-select handle-input mr10">
      <el-select v-model="select" slot="prepend" placeholder="请选择" @change="handleSearch">
        <el-option label="便签标题" value="1"></el-option>
        <el-option label="便签内容" value="2"></el-option>
      </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleSearchButton"></el-button>
    </el-input>
    <el-button type="warning" size="mini" icon="el-icon-refresh" @click="resetForm">重置</el-button>
    <div style="display: flex; justify-content: center">
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        stripe
        :data="tableData"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        style="width: 100%"
        @selection-change="handleDetailSelectionChange"
      >
        <!-- <el-table-column prop="id" label="id" width="180"> </el-table-column> -->
        <el-table-column prop="createtime" label="创建日期" width="180">
        </el-table-column>
        <el-table-column prop="email" label="发布人" width="300">
        </el-table-column>
        <el-table-column prop="title" label="便签标题" width="300">
        </el-table-column>
        <el-table-column prop="content" label="便签内容" width="300">
        </el-table-column>
        <el-table-column label="" width="100">
          <!-- 修改按钮 -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleUpdate(scope.row.id, scope.$index, scope.row.title, scope.row.content)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="" width="100">
          <!-- 删除按钮 -->
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete(scope.row.id, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column width="50">
          <el-checkbox></el-checkbox>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.params.page"
      :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
      :page-size="this.params.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
    >
    </el-pagination>
    <UpdateArticle></UpdateArticle>
    <!-- 声明路由占位标签 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      query: {
        target: "",
      },
      select: 1,
      //选择框
      checkedDetail: [],
      userEmail: "",
      that: "",
      tableData: [],
      page: 1,
      size: "",
      list: [],
      total: "",
      params: {
        page: 1,
        size: 6,
      },
    };
  },
  props: {
    msgchange: {
      type: String,
    },
  },
  activated: function () {
    this.$emit("update:activeName", "browsearticle");
  },
  mounted() {
    // 页面一加载完成就执行
    this.pagehelper();
    localStorage.setItem("email", this.userEmail);
  },
  created: function () {
    console.log("App组件被创建了");
    const email = localStorage.getItem("email");
    if (email) {
      this.userEmail = email;
    }
    // this.$store.commit("sendEmailVal", email);
    console.log(this.$store.state.email + "   123")
    if(this.$store.state.email === "email初始值"){
      // location.href = "http://baidu.com"
      this.$router.push("/login");
      location.reload();
    }
  },
  methods: {
    resetForm(){
      this.query.target = "";
      this.pagehelper();
    },
    handleSearch (select) {
        this.select = select
        return select
    },
    handleSearchButton () {
      console.log("hh " + this.query.target)
      console.log(this.query.target === "")
      this.params.size = 6;
      this.params.page = 1;
      if(this.query.target == ''){
        console.log("1slvc")
        this.pagehelper();
        return
      }
      // console.log("getdata " + getData)
      // console.log("选择" + this.select)
      console.log("这里？")
      this.myFenye()
    },
    // 配合搜素栏的分页函数
    myFenye() {
      var selectName = "";
      var suffix = "";
      if(this.select === '1'){
        selectName = "TitleOrContent";
        suffix = "/1";
      }
      else if(this.select === '2'){
        selectName = "TitleOrContent";
        suffix = "/2";
      }
      if(selectName === ""){
        return
      }
      console.log("这里dsdsc " + this.select)
      console.log("这里dsdsc " + suffix)
      console.log("/article/getBy" + selectName + "/" + this.params.page + "/" + this.params.size + suffix + '/' + this.query.target)
      this.that = this;
      this.$http
        .get("/article/getBy" + selectName + "/" + this.params.page + "/" + this.params.size + suffix + '/' + this.query.target)
        .then((res) => {
          // console.log("分页页面");
          // console.log(res.data);
          // console.log("分页后");
          this.that.list = res.data.records;
          // console.log(this.list);
          this.that.total = res.data.total;
          // console.log(this.total);
          // console.log(this.list[0].createtime);

          let start = 0;
          for (let i = start; i < this.params.size; i++) {
            // 检查，防止访问不存在的元素
            if (this.list[i]) {
              this.list[i].createtime = this.list[i].createtime.replace(
                ".0",
                ""
              );
              // console.log(this.list[i].createtime);
            }
          }
          this.tableData = this.list;
          // console.log(this.tableData);
        });
    },
    handleUpdate(id, index, title, content) {
      console.log(id);
      if (this.checkedDetail.length == 0) {
        // 这里
        this.$store.commit("setUpdateId", id);
        this.$store.commit("setUpdateTitle", title);
        this.$store.commit("setUpdateContent", content);
        this.$router.push("/updatearticle");
      }
    },
    // 删除单个行
    handleDelete(id, index) {
      console.log(id);
      // console.log(this.tableData[index]);
      if (this.checkedDetail.length == 0) {
        this.$alert("确定要删除该便签", "提示", {
          iconClass: "el-icon-question", //自定义图标样式
          confirmButtonText: "确认", //确认按钮文字更换
          cancelButtonText: "取消", //取消按钮文字更换
          showClose: true, //是否显示右上角关闭按钮
          type: "warning", //提示类型  success/info/warning/error
        })
          .then(() => {
            //确认操作
            this.$http.delete("/article/delete/" + id).then((res) => {
              console.log("删除：" + res.data);
            });
            this.tableData.splice(index, 1);
          })
          .then((data) => {
            //取消操作
            console.log("取消");
          })
          .catch(function (err) {
            //捕获异常
            console.log("异常");
            console.log(err);
          });
      }
    },
    //单选框选中数据
    handleDetailSelectionChange(selection) {
      //如果缓存中已有数据，则清空
      if (selection.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(selection.pop());
      } else {
        //将选中行存入缓存中
        this.checkedDetail = selection;
      }
    },
    //    分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.size = val;
      if(this.query.target === ""){
        this.pagehelper();
        return
      }
      this.myFenye();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.page = val;
      if(this.query.target === ""){
        this.pagehelper();
        return
      }
      this.myFenye();
    },
    pagehelper: function () {
      this.that = this;
      console.log("abc")
      this.$http
        .get("/article/get/" + this.params.page + "/" + this.params.size)
        .then((res) => {
          // console.log("分页页面");
          // console.log(res.data);
          // console.log("分页后");
          this.that.list = res.data.records;
          // console.log(this.list);
          this.that.total = res.data.total;
          // console.log(this.total);
          // console.log(this.list[0].createtime);

          let start = 0;
          for (let i = start; i < this.params.size; i++) {
            // 检查，防止访问不存在的元素
            if (this.list[i]) {
              this.list[i].createtime = this.list[i].createtime.replace(
                ".0",
                ""
              );
              // console.log(this.list[i].createtime);
            }
          }
          this.tableData = this.list;
          // console.log(this.tableData);
        })
        // .catch(function(error){
        //   console.log(error.response)
        // });
    },
  },
};
</script>

<style>
body {
  /* background: rgb(255, 246, 75); */
  font-family: sans-serif;
}
.wrapper {
  background: white;
  margin: auto;
  padding: 1em;
  width: 50%;
}
h1 {
  text-align: center;
}
ul.tabs {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul.tabs li {
  border: gray solid 1px;
  border-bottom: none;
  float: left;
  margin: 0 0.25em 0 0;
  padding: 0.25em 0.5em;
}
ul.tabs li a {
  color: gray;
  font-weight: bold;
  text-decoration: none;
}
ul.tabs li.active {
  background: gray;
}
ul.tabs li.active a {
  color: white;
}
.clr {
  clear: both;
}
article {
  border-top: gray solid 1px;
  padding: 0 1em;
}
.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #999;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}
.author {
  margin-right: 1rem;
}
.views {
  margin-right: 1rem;
}
</style>