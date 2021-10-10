
<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>



      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 -->
      <el-form-item label="课程简介">
        <!-- <tinymce :height="300" v-model="courseInfo.description" /> -->
        <el-input v-model="courseInfo.description" placeholder=" "/>
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面(可点击修改)">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/fileoss'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import teacher from '@/api/edu/teacher'
import tinymce from '@/components/Tinymce'

export default {
    data() {
        components: { tinymce }
        return {
            saveBtnDisabled:false,
            courseInfo:{
                title: '',
                subjectId: '',//二级分类id
                subjectParentId:'',//一级分类id
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '/static/01.jpg',
                price: 0
            },
            BASE_API: process.env.BASE_API, // 接口API地址
            teacherList:[],//封装所有的讲师
            subjectOneList:[],//一级分类
            subjectTwoList:[]//二级分类
        }   
    },

    created() {
        this.init()
    },
    

    methods:{
        
        init(){
            if (this.$route.params && this.$route.params.id) {
                course.id  = this.$route.params.id
                // 根据id获取课程基本信息
                this.fetchCourseInfoById(course.id)
             } else {
                //初始化分类列表
                  this.initSubjectList()
                //获取讲师列表
                  this.initTeacherList()
           }
       },

        //上传封面成功调用的方法
        handleAvatarSuccess(res, file) {
            this.courseInfo.cover = res.data.url
        },
        //上传之前调用的方法
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 10

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!')
            }
            return isJPG && isLt2M
        },
        //点击某个一级分类，触发change，显示对应二级分类
        subjectLevelOneChanged(value) {
            //value就是一级分类id值
            //遍历所有的分类，包含一级和二级
            for(var i=0;i<this.subjectOneList.length;i++) {
                //每个一级分类
                var oneSubject = this.subjectOneList[i]
                //判断：所有一级分类id 和 点击一级分类id是否一样
                if(value === oneSubject.id) {
                    //从一级分类获取里面所有的二级分类
                    this.subjectTwoList = oneSubject.children
                    //把二级分类id值清空
                    this.courseInfo.subjectId = ''
                }
            }
        },
        //查询所有的一级分类
        getOneSubject() {
            subject.getSubjectList()
                .then(response => {
                    this.subjectOneList = response.data.list
                })
        },
        //查询所有的讲师
        getListTeacher() {
            course.getListTeacher()
                .then(response => {
                    this.teacherList = response.data.items
                })
        },
        saveOrUpdate() {
            if(!this.courseInfo.id){
                this.saveData()
            }else{
                this.updateData()
            }
        },
        initTeacherList() {

             teacher.getList().then(response => {

             this.teacherList = response.data.items

           })
        },
        fetchCourseInfoById(id) {
            course.getCourseInfoById(id).then(responseCourse => {
            this.courseInfo = responseCourse.data.courseInfoVo
             // 初始化分类列表
            subject.getSubjectList().then(responseSubject => {
                this.subjectOneList = responseSubject.data.list
               
                for (let i = 0; i < this.subjectOneList.length; i++) {
                    let oneSubject = this.subjectOneList[i]
                    if (oneSubject.id === this.courseInfo.subjectParentId) {
                         this.subjectTwoList = oneSubject.children
                    }
                }
                
            })
            
        // 获取讲师列表
            this.initTeacherList()
                }).catch((response) => {
                    this.$message({
                    type: 'error',
                    message: response.message
                })
            })
        },
        saveData(){
            course.saveCourseInfo(this.courseInfo)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: '添加课程信息成功!'
                    });
                    //跳转到第二步
                   // this.$router.push({path:'/course/chapter/'+response.data.courseId})
                   this.$router.push({path:'/course/chapter/'+response.data.courseId})
                })
        },
        updateData() {
            this.saveBtnDisabled = true
            course.updateCourseInfoById(this.courseInfo).then(response => {
            this.$message({
                type: 'success',
                message: '修改成功!'
            })
                return response// 将响应结果传递给then
            }).then(response => {
                this.$router.push({ path: '/course/chapter/' + response.data.id })
            }).catch((response) => {
                // console.log(response)
                this.$message({
                    type: 'error',
                    message: '保存失败'
                })
            })
        },
        initSubjectList() {

            subject.getSubjectList().then(response => {

            this.subjectOneList = response.data.list
 
            })
        }
        
    }
    
}

</script>


<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
