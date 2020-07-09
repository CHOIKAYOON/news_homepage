import axios from "axios";

export const getApi = async () => {
    try {
        return await axios.get('http://localhost:3001/search')
        // console.log((Object.entries(Api_data.data)));
    } catch (error) {
        console.log(error)
    }
}

