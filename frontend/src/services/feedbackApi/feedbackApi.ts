import axios from '../../constants/intance'

export const addFeedback = (userId: string, data: any) => {
    console.log(data);
    return axios.post(`/api/feedback/${userId}`, data)
}

export const getFeedback = () => {
    return axios.get('/api/feedback')
}

