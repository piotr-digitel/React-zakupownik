import React, { useState } from 'react';
import commonColumnsStyles from "../../common/styles/Columns.module.scss";

function ShopingList({zakupyToDisplay}) {     //dostajemy listę zakupów od rodzica

  const [ zakupToDisplay ] = useState(zakupyToDisplay); //zapamiętujemy stan zakupów 
  const [ rerender, setRerender] = useState(false);     //do przerenderowania componentu w dowolnej chwili(zdarzenia)

  //************************ usuwanie zakupu po kliknięciu na lewy button myszy ************************
  const zakupClick = (zakup, koszyk) => {
    let indexOfRemove = -1;                             //szukamy indexu obiektu do usunięcia w koszyku
    for(let i=0; i<Object.keys(koszyk).length; i++){    //przemiatamy cały koszyk
      if(koszyk[i].id===zakup.id) indexOfRemove = i     //jeżeli id zakupu jest równe is towaru z koszyku to mamy index
    }
    if (indexOfRemove > -1) {
      koszyk.splice(indexOfRemove, 1); // jeśli znaleziono index to usuwamy produkt z koszyka
    }
    setRerender(!rerender);   //przerenderujemy component
  };

  //************************ zmiana od prawego buttona myszy - przekreślony lub nie ************************
  const zakupClick2 = (zakup, e) => {
    e.preventDefault();
    zakup.podkreslony = !zakup.podkreslony;    //toggle zakup.podkreslony
    setRerender(!rerender);  //przerenderujemy component
  };

   return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeaderR}>
        <b><u>Lista zakupów:</u></b>
        <ul className={commonColumnsStyles.AppList}>
          {zakupToDisplay.map((zakup) => <li onClick={()=>zakupClick(zakup, zakupToDisplay)} onContextMenu={(e) =>zakupClick2(zakup, e)} key={zakup.id}    
          style={
            {"textDecoration": `${zakup.podkreslony === true ? "line-through" : "auto"}`,
            "textDecorationColor": `${zakup.podkreslony === true ? "red" : "auto"}`}
          }>{`${zakup.nazwa}`}</li>)}  
        </ul>
      </header>
    </div>
  );
}

export default ShopingList;