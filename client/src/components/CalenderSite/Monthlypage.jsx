import ToDoList from "./ToDoList";

const Monthlypage = () => {
    return (
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <ToDoList weekText="WEEK 1" dateRange="12/30 ─ 01/05"/>
              <ToDoList weekText="WEEK 2" dateRange="01/06 ─ 01/12"/>
              <ToDoList weekText="WEEK 3" dateRange="01/13 ─ 01/19"/>
            </div>
            <div className="flex flex-row">
              <ToDoList weekText="WEEK 4" dateRange="01/20 ─ 01/26" customHeight="263px" customWidth="453px" customLeftDatePadding="180px"/>
              <ToDoList weekText="WEEK 5" dateRange="01/27 ─ 01/31" customHeight="263px" customWidth="453px" customLeftDatePadding="180px"/> 
            </div>
          </div>
          <ToDoList weekText="FUTURE MONTHS" customHeight="643px" customTitleWidth="205px" customFontSize="20px"/>
        </div>
    );
  };
  
  export default Monthlypage;
  