interface Props {
  message?: string;
}
const EmptyMessage = ({ message }: Props) => {
  return (
    <div className="flex-[10] flex flex-col gap-4 p-3 items-center justify-center">
      <h1 className="text-6xl text-slate-600">
        {message ? message : "Conversation Is Empty"}
      </h1>
    </div>
  );
};

export default EmptyMessage;
