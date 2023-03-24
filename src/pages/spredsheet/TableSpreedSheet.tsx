import { useCallback, useEffect, useRef, useState } from "react";
import { headersDT, IHeader, itemData } from "./data";

const createHeaders = (headers: IHeader[]) => {
  return headers.map((item) => ({
    item: item,
    ref: useRef(),
  }));
};

const TableSpreedSheet = () => {
  const [headers, setHeaders] = useState<any[]>(createHeaders(headersDT));
  const [values, setValues] = useState<any[]>(itemData);

  const [selectedResizer, setSelectedResizer] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);

  const handleMouseMove = useCallback(
    (e: any) => {
      const gridNewHeaders = headers.map((col: any, i) => {
        if (col?.item?.id === selectedResizer?.id) {
          const width = e.clientX - col.ref.current.offsetLeft;

          if (col?.ref?.current !== null) {
            col.ref.current.style.width = `${width}px`;
          }
          return {
            ...col,
            item: {
              ...col.item,
              width,
            },
          };
        }
        return col;
      });
      setHeaders(gridNewHeaders);
    },
    [selectedResizer, headers]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [handleMouseMove]);
  const handleMouseUp = useCallback(() => {
    setSelectedResizer(null);
    removeListeners();
  }, [setSelectedResizer, removeListeners]);
  useEffect(() => {
    if (selectedResizer !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [selectedResizer, handleMouseMove, handleMouseUp, removeListeners]);

  const handleSelectedResizer = (item: any) => {
    setSelectedResizer(item);
  };
  const handleEnableEdit = (item: any) => {
    setEditItem(item);
  };

  const handleValueChange = (value: string, key: string) => {
    setValues((prevValue) => {
      const newValues = prevValue.map((item) => {
        if (item?.id === editItem?.id) {
          return {
            ...item,
            [key]: value,
          };
        }
        return item;
      });
      return newValues;
    });
  };

  return (
    <>
    <table className="bg-white border-collapse border border-slate-400  w-full table-fixed">
      {headers?.map(({ item, ref }) => (
        <th
          ref={ref}
          key={item?.id}
          style={{ maxWidth: `${item?.width}px`, overflowWrap: "break-word" }}
          className="border-2 border-slate-300 text-left h-[40px] relative"
        >
          <p>{item?.title}</p>
          <div
            onMouseDown={() => handleSelectedResizer(item)}
            className="absolute right-[-2px] top-0 hover:bg-slate-600 cursor-col-resize w-[4px] h-full"
          ></div>
        </th>
      ))}
      {values?.map((item: any, index) => {
        const keyList = Object.keys(item).filter((key) => key !== "id");
        return (
          <tr key={item?.id}>
            {keyList?.map((key) => (
              <td
                style={{ overflowWrap: "break-word" }}
                valign="top"
                key={key + index}
                onDoubleClick={() => handleEnableEdit(item)}
                className="border-2 border-slate-300 overflow-hidden"
              >
                {editItem?.id === item?.id ? (
                  <input
                    className="w-full h-full outline-none"
                    value={item[key]}
                    onChange={(e) => handleValueChange(e.target.value, key)}
                  />
                ) : (
                  <p> {item[key]}</p>
                )}
              </td>
            ))}
          </tr>
        );
      })}
    </table>
    <button className=" h-[40px] w-[40px] bg-white p-4 rounded-full fixed bottom-[20px] right-[20px]">
       +
    </button>
    </>
  );
};

export default TableSpreedSheet;
