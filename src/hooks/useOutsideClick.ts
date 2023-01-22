import { useState, useEffect } from 'react';
interface IReturn{
    open:boolean;
    handleOpen:()=>void;
}

const useOutsideClick=(ref:any):IReturn=>{
    const [open,setOpen]=useState(false);

    useEffect(() => {
        const handleClickOutside=(event:any) =>{
          if (ref.current && !ref.current?.contains(event.target)) {
             setOpen(false)
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);

     const handleOpen=()=>{
        setOpen(prev=>!prev);
     }

      return{
        open:open,
        handleOpen
      }

}

export default useOutsideClick;