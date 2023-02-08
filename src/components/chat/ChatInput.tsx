import { useEffect, useRef, useState } from "react";
import { useSendMessageMutation } from "../../feature/chat/chatApi";
import { BsFillFileTextFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useUploadAttatchmentMutation } from "../../feature/attatchment/attatchmentApi";
import React from "react";
import { IMessage } from "../../feature/chat/chat.types";

const image = require("../../assets/images/flower.jpeg");

interface Image {
  url: string;
}

interface Props {
  conversationId: string;
  setRepliedMessage: (message: IMessage | null) => void;
  repliedMessage: IMessage | null;
}

const ChatInput = ({
  conversationId,
  setRepliedMessage,
  repliedMessage,
}: Props) => {
  const prevText = localStorage.getItem(`Message${conversationId}`);
  const [text, setText] = useState(prevText ? prevText : "");
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const textInputRef = useRef<HTMLInputElement>(null);
  const [uploadAttatchment, { isLoading: attatchmentUploadLoading }] =
    useUploadAttatchmentMutation();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [previewImages, setPreviewImages] = useState<Image[] | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Handle Submit");
    if (selectedImage && selectedImage?.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < selectedImage.length; i++) {
        formData.append("files", selectedImage[i]);
      }
      const res: any = await uploadAttatchment({
        body: formData,
        folderName: "chatAttatchment",
      });
      setPreviewImages([]);
      setSelectedImage([]);
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
    textInputRef?.current?.focus();
  };
  const handleRemoveImage = (index: number) => {
    const newImages = previewImages?.filter((_, i) => i !== index);
    if (newImages) setPreviewImages(newImages);
  };

  const isShowSelectedPopup = () => {
    if (previewImages && previewImages?.length > 0) {
      return true;
    }
    if (
      repliedMessage &&
      (repliedMessage?.text || repliedMessage?.images?.length > 0)
    ) {
      return true;
    }
    return false;
  };

  const isBothTrue = () => {
    if (
      previewImages &&
      previewImages?.length > 0 &&
      repliedMessage &&
      (repliedMessage?.text || repliedMessage?.images?.length > 0)
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    return () => {
      previewImages?.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [previewImages]);

  useEffect(() => {
    textInputRef?.current?.focus();
  }, [repliedMessage]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-[1] ">
      <div className="flex w-full border-t-2 border-slate-500 pr-7 relative">
        {isShowSelectedPopup() && (
          <div
            className={`bg-slate-700 w-full flex flex-col gap-2 p-1 absolute  left-0 ${
              isBothTrue() ? "top-[-220px]" : "top-[-125px]"
            }`}
          >
            <div className="bg-slate-600 rounded-md">
              {repliedMessage && (
                <div className="flex flex-col  p-2">
                  <button
                    onClick={() => setRepliedMessage(null)}
                    className="absolute top-0 right-0 bg-red-500 p-2 hover:bg-red-600 rounded-tl-md rounded-bl-md"
                  >
                    <MdClose color="white" size={20} />
                  </button>
                  {repliedMessage?.images?.length > 0 && (
                    <div className="flex items-center overflow-y-auto h-[80px] w-[70%] justify-center self-center gap-2">
                      {repliedMessage?.images?.slice(0, 5).map((image) => (
                        <div
                          key={image?._id}
                          className="h-full w-[80px] cursor-pointer bg-slate-500 p-1 rounded-sm"
                        >
                          <img
                            src={image?.url}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-white">
                    {" "}
                    {repliedMessage?.text?.substring(0, 50)}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-3 overflow-y-auto ">
              {previewImages &&
                previewImages?.length > 0 &&
                previewImages.map((image, index) => (
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
          </div>
        )}

        <div className="flex-[7] flex items-center">
          <input
            ref={textInputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className=" text-white bg-transparent text-xl w-full outline-none px-4 placeholder:text-slate-500 "
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
      </div>
    </form>
  );
};

export default React.memo(ChatInput);
