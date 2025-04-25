import axios from '../../constants/intance'

export const addFeedback = (userId: string, data: any) => {
    console.log(data);
    return axios.post(`/api/feedback/${userId}`, data)
}

export const getFeedback = () => {
    return axios.get('/api/feedback')
}

export const getFeedbackById = (feedbackId:any) => {
    return axios.get(`/api/feedback/${feedbackId}`)
}

export const feedbackReply = (feedbackId:any,reply:any) =>{
    return axios.post(`/admin/feedback/reply/${feedbackId}`, {
        reply, 
      });
}

export const getFeedbackByUserId = (userId:any) => {
    return axios.get(`/api/feedback/user/${userId}`)
}
