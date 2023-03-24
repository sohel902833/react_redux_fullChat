import ChatBootItem from "./ChatBootItem";

const ChatBootContainer = () => {
  return (
    <div className=" h-[500px] fixed bottom-0 right-0  bg-transparent">
      <div className=" flex items-center justify-end gap-2 h-full ">
        {[...new Array(0)].map((item, index) => (
          <ChatBootItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default ChatBootContainer;
