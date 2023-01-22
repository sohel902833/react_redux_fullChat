interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: JSX.Element;
}
const Modal = ({ open, setOpen, children }: Props) => {
  if (!open) {
    return null;
  }
  return (
    <div
      className="fixed top-0 left-0 backdrop-blur-md w-full h-screen flex items-center justify-center"
      onClick={() => setOpen(false)}
    >
      <div
        className={`w-full sm:w-full md:w-[80%] lg:w-[70%] xl:w-[50%]  flex bg-slate-700 max-h-[80%] max-w-[70%] overflow-y-auto rounded-md p-4 `}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
