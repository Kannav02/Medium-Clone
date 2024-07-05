
type AvatarProps={
    authorName:string,
    type:"small"|"medium"
}

export const Avatar=({authorName,type}:AvatarProps)=>{
    return <div className={`relative inline-flex items-center justify-center mr-2 ${type==="small"?"w-8 h-8":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-black`}>
    <span className={`${type==="small"?"font-sm":"font-md"} text-gray-600 dark:text-gray-300`}>
      {authorName[0].toUpperCase()}
    </span>
  </div>
}