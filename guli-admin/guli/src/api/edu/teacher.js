
import request from '@/utils/request'


export default {
  
    getList() {
        return request({

            url: `/eduservice/teacher/findAll`,

            method: 'get'

        })

    },
    getTeacherById(id){
        return request({
            url:`/eduservice/teacher/findByTeacherId/${id}`,
            method:'get'
        })
    }
}