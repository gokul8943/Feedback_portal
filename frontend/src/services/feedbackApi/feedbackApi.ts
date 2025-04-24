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

export const feedbackReply = (feedbackId:any) =>{
    return axios.post(`/api/feedback/reply/${feedbackId}`)
}
