import React, { useCallback, useEffect, useRef, useState } from "react";
import { headersDT, IHeader, itemData } from "./data";
import "./style.css";
import TableSpreedSheet from "./TableSpreedSheet";

const createHeaders = (headers: IHeader[]) => {
  return headers.map((item) => ({
    item: item,
    ref: useRef(),
  }));
};

const SpredSheet = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeaders, setGridHeaders] = useState<any[]>(
    createHeaders(headersDT)
  );
  const [selectedResizer, setSelectedResizer] = useState<any>(null);
  const getHeaderWidth = useCallback(() => {
    const gridTemplateColumns = gridHeaders
      .map((grid) => (grid?.item?.width ? `${grid?.item?.width}px` : "1fr"))
      .join(" ");
    return gridTemplateColumns;
  }, [gridHeaders]);
  useEffect(() => {
    if (gridRef?.current !== null) {
      const headerWidth = getHeaderWidth();
      console.log(headerWidth);
      gridRef.current.style.gridTemplateColumns = headerWidth;
    }
  }, [gridHeaders]);

  const handleMouseMove = useCallback(
    (e: any) => {
      console.log("moving");
      const gridNewHeaders = gridHeaders.map((col: any, i) => {
        if (col?.item?.id === selectedResizer?.id) {
          const width = e.clientX - col.ref.current.offsetLeft;
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
      setGridHeaders(gridNewHeaders);
    },
    [selectedResizer, gridHeaders]
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

  const handleResizeSelect = (item: any) => {
    setSelectedResizer(item);
  };

  console.log({ selectedResizer });
  return (
    <TableSpreedSheet />
    // <div ref={gridRef} className="shit_container">
    //   {/* //render headers  */}
    //   {gridHeaders?.map(({ item, ref }, index) => (
    //     <div ref={ref} key={item?.id}>
    //       <p>{item?.title}</p>
    //       <div
    //         onMouseDown={() => handleResizeSelect(item)}
    //         className="resizer"
    //       ></div>
    //     </div>
    //   ))}
    //   {itemData?.map((item) => (
    //     <React.Fragment key={item?.id}>
    //       <div>{item?.name}</div>
    //       <div>{item?.phone}</div>
    //       <div>{item?.email}</div>
    //       <div>{item?.password}</div>
    //       <div>{item?.userId}</div>
    //     </React.Fragment>
    //   ))}
    // </div>
  );
};

export default SpredSheet;
