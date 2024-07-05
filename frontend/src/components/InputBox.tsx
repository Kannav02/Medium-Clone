import { ChangeEvent } from "react"

type inputBoxProps={
    label:string,
    placeholder?:string
    type?:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}



export const InputBox=({label,placeholder,type,onChange}:inputBoxProps)=>{
    return (
    <div className="w-full mb-6 max-w-sm">
        <p className="text-md font-semibold mb-2">{label}</p>
        <input className="border border-1 border-grey p-2 w-full" placeholder={placeholder} type={type || "text"} onChange={onChange} />
    </div>
    )

}