import request from '@/utils/request'
export default {
    //1 课程分类列表
    getSubjectList() {
        return request({
            url: `/eduservice/subject/getAllSubject`,
            method: 'get'
          })
    },

    getOneSubject(id){
        return request({
            url: `/eduservice/subject/getOneSubject/${id}`,
            method: 'get'
          })
    },

    getSubSubject(id){
        return request({
            url: `/eduservice/subject/getSubSubject/${id}`,
            method: 'get'
          })
    }
}
