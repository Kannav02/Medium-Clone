import { atomFamily, selectorFamily } from "recoil";
import { URL } from "../config";
import axios from "axios";

export const blogAtomFamily=atomFamily({
    key:"getAllBlogs",
    default:selectorFamily({
        key:"fetchBlogs",
        get:(blogId:string)=>async()=>{
            try{
            const token=localStorage.getItem("token")

            const response=await axios.get(`${URL}api/v1/blog/${blogId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("API Response:", response.data);
            return response.data.blog
            }
            catch(e){
                return null;

            }
        }

    })
})

