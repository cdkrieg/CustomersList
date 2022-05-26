import axios from "axios";

const baseUrl = "http://localhost:3010/api/categories";

const getCategories = async () => {
    try {
        let response = await axios.get(baseUrl)
        if (response)
        return response.data
    } catch (error) {
        console.log(`Error getting categories: ${error}`)
    }
}

const addCategory = async (categoryId, category) => {
    try {
        let response = await axios.put(`${baseUrl}/add/${categoryId}`, category)
        if (response)
        return response.data
    } catch (error) {
        console.log(`Error adding category: ${error}`)
    }
}

const removeCategory = async (categoryId, category) => {
    try {
        let response = await axios.put(`${baseUrl}/remove/${categoryId}`, category)
        if (response)
        return response.data
    } catch (error) {
        console.log(`Error removing category: ${error}`)
    }
}

const postCategory  = async (category) => {
    try {
        let response = await axios.post(baseUrl, category)
        if (response)
        return response.data
    } catch (error) {
        console.log(`Error posting category: ${error}`)
    }
}

const deleteCategory = async (categoryId) => {
    try {
        let response = await axios.delete(baseUrl, categoryId)
        if (response)
        return response.data
    } catch (error) {
        console.log(`Error deleting category: ${error}`)
    }
}

const AxiosCategories = {getCategories, addCategory, postCategory, deleteCategory, removeCategory}
export default AxiosCategories