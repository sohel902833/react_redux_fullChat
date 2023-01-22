import { useEffect, useState } from "react";
import { useSendMessageMutation } from "../../feature/chat/chatApi";
import { BsFillFileTextFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useUploadAttatchmentMutation } from "../../feature/attatchment/attatchmentApi";
import {
  IAttatchment,
  IAttatchmentResponse,
} from "../../feature/attatchment/attatchment.types";

const image = require("../../assets/images/flower.jpeg");

interface Image {
  url: string;
}

interface Props {
  conversationId: string;
}

const ChatInput = ({ conversationId }: Props) => {
  const prevText = localStorage.getItem(`Message${conversationId}`);
  const [text, setText] = useState(prevText ? prevText : "");
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const [uploadAttatchment, { isLoading: attatchmentUploadLoading }] =
    useUploadAttatchmentMutation();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [previewImages, setPreviewImages] = useState<Image[] | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedImage && selectedImage?.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < selectedImage.length; i++) {
        formData.append("files", selectedImage[i]);
      }
      const res: any = await uploadAttatchment({
        body: formData,
        folderName: "chatAttatchment",
      });
      sendNewMessage(res?.data?.files);
    } else {
      sendNewMessage();
    }
  };

  const sendNewMessage = async (images?: any[]) => {
    if (!text && !images) {
      return;
    }
    const data = {
      text: text,
      images: images && images?.length > 0 ? images : [],
    };

    const res = await sendMessage({
      id: conversationId,
      data,
    });
    setText("");
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const images = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
    }));
    setPreviewImages(images);
    setSelectedImage(files);
  };
  const handleRemoveImage = (index: number) => {
    const newImages = previewImages?.filter((_, i) => i !== index);
    if (newImages) setPreviewImages(newImages);
  };

  useEffect(() => {
    return () => {
      previewImages?.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [previewImages]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-[1] border-t-2 border-slate-500 pr-7 relative"
    >
      {previewImages && previewImages?.length > 0 && (
        <div className=" bg-slate-700 w-full p-1 flex gap-2 mt-3 overflow-y-auto absolute top-[-100px] left-0">
          {previewImages.map((image, index) => (
            <div
              key={index}
              className="flex w-[80px] h-[80px]  gap-3 items-center  bg-slate-500 shadow-sm rounded-md p-1 basis-50 relative"
            >
              <img
                className="w-full h-full object-cover rounded-sm"
                src={image.url}
                alt=""
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 p-2 hover:bg-red-600 rounded-tr-md rounded-br-md"
              >
                <MdClose color="white" size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex-[7] flex items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className=" text-white bg-transparent text-xl outline-none px-4 placeholder:text-slate-500 "
          type="text"
          placeholder="Hello"
        />
      </div>

      <input
        id="chatFileInput"
        type="file"
        accept="*/image"
        className="hidden"
        multiple
        onChange={handleSelectImage}
      />
      <label
        htmlFor="chatFileInput"
        className="flex[2] flex items-center cursor-pointer"
      >
        <BsFillFileTextFill size={40} color="white" />
      </label>
    </form>
  );
};

export default ChatInput;
