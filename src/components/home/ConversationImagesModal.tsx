import Modal from "../util/Modal";
import { IAttatchment } from "../../feature/attatchment/attatchment.types";
import { useState } from "react";
import { MdClose } from "react-icons/md";

interface Props {
  images: IAttatchment[];
  centerImage?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ConversationImagesModal = ({
  open,
  setOpen,
  images,
  centerImage,
}: Props) => {
  const [currentImage, setCurrentImage] = useState(
    centerImage ? centerImage : images[0]?.url
  );

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full gap-3 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-0 right-0 bg-red-500 p-2 hover:bg-red-600 rounded-tl-md rounded-bl-md"
        >
          <MdClose color="white" size={20} />
        </button>
        <div className="h-50vh w-full">
          <img className="h-full w-full object-cover" src={currentImage} />
        </div>
        <div className="flex items-center overflow-y-auto h-[80px] w-[70%] justify-center self-center gap-2">
          {images?.map((image) => (
            <div
              onClick={() => setCurrentImage(image?.url)}
              key={image?._id}
              className="h-full w-[80px] cursor-pointer bg-slate-500 p-1 rounded-sm"
            >
              <img src={image?.url} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ConversationImagesModal;
