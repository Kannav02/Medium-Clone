
type buttonProps={
    label:string,
    type:"primary"|"secondary",
    handleClick:()=>void
}

const buttonClasses={
    "primary":"w-full text-white bg-black text-center rounded-lg p-2 max-w-sm",
    "secondary":"bg-blue text-white"
}
export const Button=({label,type,handleClick}:buttonProps)=>{

    return (
        <button className={`${buttonClasses[type]}`} onClick={handleClick}>
            {label}
        </button>
    )

}