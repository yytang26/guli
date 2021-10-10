
import request from '@/utils/request'

const api_name = '/eduservice/course'

export default {
  saveCourseInfo(courseInfo) {
    return request({

      url: `/eduservice/course/addCourseInfo`,

      method: 'post',

      data: courseInfo

    })
  },
  getCourseInfoById(id) {
    return request({
      url: `/eduservice/course/getCourseInfo/${id}`,
      method: 'get'
    })
  },

  updateCourseInfoById(courseInfo) {
    return request({
      url: `/eduservice/course/updateCourseInfo`,
      method: 'post',
      data: courseInfo,
    })
  },
  //课程确认信息显示
  getPublihCourseInfo(id) {
    return request({
      url: '/eduservice/course/getPublishCourseInfo/' + id,
      method: 'get'
    })
  },
  //课程最终发布
  publishCourse(id) {
    return request({
      url: '/eduservice/course/publish-course/' + id,
      method: 'pos'
    })
  },
  //TODO 课程列表
  //课程最终发布
  getListCourse() {
    return request({
      url: '/eduservice/course',
      method: 'get'
    })
  },

  getPageList(page, limit, searchObj) {
    return request({
      url: `/eduservice/course/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  
removeById(id) {

      return request({

          url: `/eduservice/course/${id}`,

          method: 'delete'
      })
  6
  }
}

