const ToDoList = ({weekText, dateRange, customHeight, customTitleWidth, customFontSize, customWidth, customLeftDatePadding}) => {
    const defaultHeight = "358px";
    const heightToUse = customHeight || defaultHeight;

    const defaultWidth = "293px";
    const widthToUse = customWidth || defaultWidth;

    const defaultTitleWidth = "125px";
    const titleWidthToUse = customTitleWidth || defaultTitleWidth;

    const defaultFontSize = "24px";
    const fontSizeToUse = customFontSize || defaultFontSize;

    const defaultLeftDatePadding = "21px";
    const leftDatePaddingToUse = customLeftDatePadding || defaultLeftDatePadding;

    return (
      <div 
        className="m-3.25 mb-2 bg-white outline-[0.5px] outline-[#484848] rounded-t-[25px] rounded-b-[10px] shadow-sm shadow-gray-400"
        style={{ height: heightToUse, width: widthToUse }}
      >
        <div className="flex flex-row ounded-t-[25px] h-12">
            <div 
                className="outline-[0.5px] outline-[#484848] rounded-tl-[25px] rounded-br-[25px] h-12"
                style={{width: titleWidthToUse}}
            >
                <h1 
                    className=" p-2.25 pl-3.25 font-semibold tracking-wide font-archivo"
                    style={{fontSize: fontSizeToUse}}
                >
                    {weekText}
                </h1>
            </div>
            <h1 
                className="font-assistant text-[22px] p-1.5"
                style={{paddingLeft: leftDatePaddingToUse}}
            >
                {dateRange}
            </h1>
        </div>
      </div>
    );
  };
  
  export default ToDoList;