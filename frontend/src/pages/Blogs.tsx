import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValueLoadable } from "recoil";
import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { blogAtomFamily } from "../store/blogAtom";
import { URL } from "../config";
import { timeFormat } from "../utils/timeFormat";

export const Blogs = () => {
  const [blogIds, setBlogIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${URL}api/v1/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const blogs = response.data.posts;
        const ids = blogs.map((blog: { id: string }) => blog.id);
        setBlogIds(ids);
      } catch (e) {
        console.log(e);
      }
    };
    fetchIds();
  }, []);

  return (
    <div>
      <AppBar isVisible={true} />
      <div className="flex flex-col items-center">
        {blogIds.map((id) => (
          <BlogContainer key={id} blogId={id} />
        ))}
      </div>
    </div>
  );
};

const BlogContainer = ({ blogId }: { blogId: string }) => {
  const blogLoadable = useRecoilValueLoadable(blogAtomFamily(blogId));

  switch (blogLoadable.state) {
    case "hasValue":
      const blogData = blogLoadable.contents;
      return (
        <BlogCard
          id={blogData.id}
          title={blogData.title}
          description={blogData.description}
          authorName={blogData.author.name || "Anonymous"}
          datePublished={timeFormat(blogData.timePublished)}
        />
      );
    case "loading":
      return (
        <div role="status" className="max-w-sm animate-pulse my-3">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      );
    case "hasError":
      return <div>Error Occurred</div>;
    default:
      return null;
  }
};
