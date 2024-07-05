import { useRecoilValueLoadable } from "recoil";
import { AppBar } from "../components/AppBar";
import { Avatar } from "../components/Avatar";
import { blogAtomFamily } from "../store/blogAtom";
import { timeFormat } from "../utils/timeFormat";
import { useParams } from "react-router-dom";

export const Blog = () => {
  return (
    <div>
      <AppBar isVisible={true} />
      <SingleBlog/>
    </div>
  );
};

export const SingleBlog = () => {
  const { id } = useParams<{ id: string }>();
  const blogContents = useRecoilValueLoadable(blogAtomFamily(id || ""));
  switch (blogContents.state) {
    case "hasValue":
      const blogData = blogContents.contents;
      return (
        <div>
          <div className="grid gridco lg:grid-cols-12 ">
            <div className="col-span-8 px-5 py-3">
              <div className="flex flex-col justify-center">
                <h1 className="text-5xl font-bold mb-2">{blogData.title}</h1>
                <p className="text-sm font-semibold text-slate-400 mb-1">
                  Posted on {timeFormat(blogData.timePublished)}
                </p>
              </div>
              <div>
                <p className="text-dm">{blogData.description}</p>
              </div>
            </div>
            <div className="col-span-4 ml-10">
              <div className="mt-4 font-semibold">Author</div>
              <div className="grid grid-cols-10 lg:mt-3">
                <div className=" col-span-3 lg:col-span-1 flex flex-col justify-center h-20 lg:h-16">
                  {blogData.author && blogData.author.name ? (
                    <Avatar type="small" authorName={blogData.author.name[0]} />
                  ) : (
                    <Avatar type="small" authorName="Anonymous" />
                  )}
                </div>
                <div className="col-span-7 lg:col-span-8 lg:ml-2">
                  <div className="text-2xl font-bold">
                    {blogData.author.name || "Anonymous"}
                  </div>
                  <div className="text-sm font-semibold text-slate-500">
                    One of the authors at Medium
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "loading":
      return (
        <div
          role="status"
          className="p-4 rounded shadow animate-pulse md:p-6 dark:border-gray-700 h-screen w-screen"
        >
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="flex items-center mt-4">
            <svg
              className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
              <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      );

    case "hasError":
      return <div> Unexpected Error Occurred</div>;
  }
};
