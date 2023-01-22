interface Props {
  message?: string;
}
const EmptyConversation = ({ message }: Props) => {
  return (
    <div className="flex flex-col h-full flex-[5]  border-l-2 border-slate-600 shadow-sm">
      {/* header */}
      <div className="flex-[1] p-4 border-b-2 border-slate-600 shadow-sm flex justify-between items-center"></div>
      <div className="flex-[10] flex flex-col gap-4 p-3 items-center justify-center">
        <h1 className="text-6xl text-slate-600">
          {message ? message : "No Conversation Selected"}
        </h1>
      </div>
      {/* text input  */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-[1] border-t-2 border-slate-500"
      ></form>
    </div>
  );
};

export default EmptyConversation;
