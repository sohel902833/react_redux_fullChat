import { flowerImage } from "../../assets/assets";

const DonorItem = () => {
  return (
    <div className="basis-[280px] grow bg-white rounded-2xl cursor-pointer max-w-[400px] flex gap-2">
      <img
        className="rounded-tl-2xl rounded-bl-2xl h-full w-[120px] object-cover"
        src={flowerImage}
        alt="donor-image"
      />
      <div className="flex flex-col py-3 px-2">
        <h2 className="font-bold text-lg">Md Sohrab Hossain</h2>
        <h2 className="text-lg">0174024479</h2>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
          repellat esse sint,
        </p>
      </div>
    </div>
  );
};

export default DonorItem;
