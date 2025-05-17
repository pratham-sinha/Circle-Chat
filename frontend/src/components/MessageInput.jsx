import React, { useRef,useState } from 'react'
import { useChatStore } from '../store/useChatStore.js';
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

function MessageInput() {
    const [text,setText]=useState("");
    const { sendMessage }=useChatStore();
    const [imgPreview,setImgPreview]=useState(null);
    const fileInputRef=useRef(null);


    //in ProfilePage we used async await bcz
    //we needed to wait till pfp is updated 
    //to move on to next thing after showing
    //success

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file");
          return;
        }
    
        const reader=new FileReader();
        reader.onloadend=()=>{
          setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);
      };
    
      const removeImage=()=>{
        setImgPreview(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
      };
    
      const handleSendMessage=async(e)=>{
        
        e.preventDefault();
        if (!text.trim() && !imgPreview)return;
    
        try {
          await sendMessage({
            text:text.trim(),
            image:imgPreview,
          });
    
          // Clear form
          setText("");
          setImgPreview(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
          console.error("Failed to send message:", error);
        }
      };

  return (
    <div className="p-4 w-full">
    {imgPreview && (
      <div className="mb-3 flex items-center gap-2">
        <div className="relative">
          <img
            src={imgPreview}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
          />
          <button
            onClick={removeImage}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
            flex justify-center items-center"
            type="button"
           
          >
            <X className="size-3" />
          </button>
        </div>
      </div>
    )}

    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
      <div className="w-full  flex gap-2">
        <input
          type="text"
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          //multiple (for multiple files)
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          className={`hidden sm:flex btn btn-circle
                   ${!imgPreview ? "text-rose-300" : "text-zinc-400  "}`}
          onClick={() => fileInputRef.current?.click()}
          disabled={imgPreview}
        >
          <Image size={20} />
        </button>
      </div>
      <button
        type="submit"
        className="btn btn-circle flex items-center justify-center"
        disabled={!text.trim() && !imgPreview}
      >
        <Send size={20} />
      </button>
    </form>
  </div>

  )
}

export default MessageInput
