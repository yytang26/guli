import request from '@/utils/request'

//小节api
export default {

    //添加小节
    addVideo(video) {
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data: video
        })
    },

    //删除小节
    deleteVideo(id) {
        return request({
            url: '/eduservice/video/' + id,
            method: 'delete'
        })
    },
    //通过id查找小节
    getVideoInfoById(id) {

        return request({

            url: `/eduservice/video/video-info/${id}`,

            method: 'get'

        })

    },

    updateVideoInfoById(videoInfo) {

        return request({

            url: `/eduservice/video/update-video-info/${videoInfo.id}`,

            method: 'put',

            data: videoInfo

        })

    }

}