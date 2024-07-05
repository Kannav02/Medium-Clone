import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";

type BlogProps = {
  id: string;
  authorName: string;
  datePublished: string;
  title: string;
  description: string;
};

export const BlogCard = ({
  id,
  authorName,
  datePublished,
  title,
  description,
}: BlogProps) => {
  return (
    <div className="w-full md:w-96 py-3 px-4 border border-gray-200 rounded-lg">
      <div className="text-sm font-medium flex items-center mb-2">
        <Avatar authorName={authorName[0]} type="small" />
        <span className="ml-2">{authorName}</span>
        <span className="text-sm font-light text-slate-400 ml-1">
          {datePublished}
        </span>
      </div>
      <Link to={`/blog/${id}`}>
        <div className="text-xl font-bold">{title}</div>
      </Link>
      <div className="text-sm font-normal py-2 break-words overflow-hidden whitespace-pre-line">
        {description.length > 75
          ? `${description.substring(0, 75)}...`
          : description}
      </div>
      <div className="text-xs font-light">{`${Math.ceil(
        description.length / 100
      )} min read`}</div>
      <div className="h-0.5 w-full bg-slate-200 mt-3"></div>
    </div>
  );
};
