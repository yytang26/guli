import request from '@/utils/request'

//阿里云视频api
const api_name = '/eduvod/video'

export default {

    removeById(id) {

        return request({

            url: `/eduvod/video/removeAlyVideo/${id}`,

            method: 'delete'

        })

    }

}