import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { AppBar } from "../components/AppBar";
import { createPostInputType } from "@kannav02/common";
import { URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const CreateBlog = () => {
  const [postDetails, setPostDetails] = useState<createPostInputType>({
    title: "",
    description: "",
    published: false,
  });

  //   useEffect(()=>{

  //   },[])

  const navigate=useNavigate()
  return (
    <div>
      <AppBar isVisible={false}/>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-6">Create A Blog Post</h1>
        <textarea
          id="message"
          className="block p-2 w-1/3 h-9 mb-2 text-sm min-w-60 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter The Title Over Here..."
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setPostDetails((prevValue: createPostInputType) => ({
              ...prevValue,
              title: e.target.value,
            }));
          }}
        ></textarea>
        <textarea
          id="message"
          className="block p-2.5 w-2/3 h-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-4"
          placeholder="Write your thoughts here..."
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setPostDetails((prevValue: createPostInputType) => ({
              ...prevValue,
              description: e.target.value,
            }));
          }}
        ></textarea>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={async () => {
            if (
              postDetails.title.trim().length === 0 ||
              postDetails.description.trim().length === 0
            ) {
              alert("Either the title field or the description field is empty");
            } else {
              const token = localStorage.getItem("token");

              const response = await axios.post(
                `${URL}api/v1/blog`,
                {
                  title: postDetails.title,
                  description: postDetails.description,
                  published: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const id: string = response.data.id;
              navigate(`/blog/${id}`)
            }
          }}
        >
          Publish
        </button>
      </div>
    </div>
  );
};
