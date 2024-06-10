import MyCalendar from "../../components/Calendar/MyCalendar";
import Header from "../../components/Header/Header";
import styles from "./userPage.module.css";
import { useSelector } from "react-redux";
import { IRootStoreType } from "../../types/types";
import down from'../../../public/down_arrow_ngsvqhli4jd3.svg'
import PopUpMenu from "../../components/PopUp/PopUpMenu";
import { useState } from "react";
import CreateTodo from "../../components/CreateTodo/CreateTodo";
import Todo from "../../components/Todo/Todo";

export default function UserPage() {  

  const [popupVisible, setPopupVisible]= useState(false)

  const dataSelectedMonth = useSelector(
    (state: IRootStoreType) => state.calendarReducer.data.selectedMonth
  );
  const dataSelectedYear = useSelector(
    (state: IRootStoreType) => state.calendarReducer.data.selectedYear
  );
  const currentUser = useSelector(
    (state: IRootStoreType) => state.calendarReducer.currentUser
  );

  const createTodoOpened = useSelector(
    (state: IRootStoreType) => state.calendarReducer.createTodoOpen
  );
  const year = dataSelectedYear;
  const lastDayMonth = new Date(year, dataSelectedMonth, 0).getDate();
  const startMonth = `${dataSelectedYear}-${dataSelectedMonth}-01`;
  const endMonth = `${dataSelectedYear}-${dataSelectedMonth}-${lastDayMonth}`;
  const user = currentUser?currentUser:(localStorage.getItem('currentUser')!==null?JSON.parse(localStorage.getItem('currentUser')||''):'')

  return (
    <div className={styles.userpage__container}>
      <div className={styles.userpage__container_title}>
      <h1  >Список дел</h1>
      <div className={styles.userpage__container_menu}>
      <span>Список для:  </span>
     {user? <span className={styles.container__title_name}>{user}</span>:''}
      <img style={popupVisible?{rotate:'180deg'}:{rotate:'0deg'}} onClick={()=>{setPopupVisible(!popupVisible)}} className={styles.container__title_arrow} src={down} alt="down" />
      {popupVisible&&<PopUpMenu/>}
      </div>
      </div>
      
      <Header/>
      <MyCalendar
        startMonth={startMonth}
        endMonth={endMonth}   
      />
                          
      {createTodoOpened&&<CreateTodo/>}            
    </div>
  );
}
