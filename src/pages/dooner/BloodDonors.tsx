import AddMeDonor from "../../components/blood-donor/AddMeDonor";
import DonorItem from "../../components/blood-donor/DonorItem";

const BloodDonors = () => {
  return (
    <div className="m-2">
      <h2 className="font-bold text-3xl">Filter</h2>
      <input
        type="search"
        placeholder="Last Donate"
        className="my-4 outline-none bg-slate-200 rounded-md px-4 py-3 font-bold text-black max-w-[450px] w-full"
      />
      <br />
      <div className="flex gap-2">
        <div className="flex-[5] flex flex-wrap gap-4">
          {[...new Array(40)].map((item, index) => (
            <DonorItem key={index} />
          ))}
        </div>
        <div className="flex-[2]">
          <AddMeDonor />
        </div>
      </div>
    </div>
  );
};

export default BloodDonors;
