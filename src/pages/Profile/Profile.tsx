import { avatarImg, flowerImage } from "../../assets/assets";
import PostItem from "../../components/news-feed/PostItem";

const Profile = () => {
  return (
    <div className="mx-4">
      <div className="bg-white p-1 rounded-md">
        <img
          className="w-full h-[400px] object-cover"
          src={flowerImage}
          alt="cover_image"
        />
      </div>
      <div className="mt-[-50px] ml-8 flex items-center gap-2">
        <img
          className="h-[150px] w-[150px] object-cover rounded-full"
          src={avatarImg}
          alt="profile_image"
        />
        <div className="mt-[50px] flex flex-col gap-1">
          <h1 className="text-4xl font-bold ">Md Sohrab Hossain</h1>
          <p className="font-bold text-md">284 Friends</p>
          {/* friends container  */}
          <div className="flex items-center max-w-[300px] overflow-hidden">
            {[...new Array(30)].map((item, index) => (
              <img
                key={index}
                className="w-[30px] h-[30px] rounded-full object-cover mr-[-10px]"
                src={avatarImg}
                alt="frnds_img"
              />
            ))}
          </div>
        </div>
      </div>
      <section className="mt-4 flex gap-2">
        <div className="flex flex-col gap-4 flex-[5]">
          {[...new Array(10)].map((item) => (
            <PostItem key={item} />
          ))}
        </div>
        <div className="flex-[2]">
          {/* Photos section  */}
          <div className="bg-white p-2">
            <h2 className="text-md font-bold mb-2">Photos</h2>
            {/* image grid  */}
            <div className="flex flex-wrap grow shrink gap-4 justify-center">
              {[...new Array(10)].map((item, index) => (
                <img
                  key={index}
                  className="basis-[120px] w-full h-full object-cover rounded-md"
                  src={flowerImage}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
<div>Profile</div>;
