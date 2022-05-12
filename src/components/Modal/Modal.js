import React from "react";
import style from "./Modal.module.scss";
import logo from '../../common/img/favicon.ico';

const Modal = ({ handleClose, show }) => {
  const showHideClassName = show ? {display: 'block'} : {display: 'none'};

  return (
    <div className={style.modal} style={showHideClassName}  onClick={handleClose}>
      <section className={style.modalmain}>
      <div className={style.modalHeader} >
        <img src={logo} alt="Logo" />
        <h2>Zakupownik - krótka pomoc</h2>
      </div>
        <b>Dodawanie nowego produktu</b>
        <p>Produkt można dodać tylko 1 raz niezaleznie od kategorii oraz czy jest spożywczy, <br/> 
           Nazwa nie może być krótsza niż 3 znaki.<br/>
           Dodanie produktu bez kategorii wstawia automatycznie kategorię [inne].<br/>
           Dodanie nowego produktu kasuje filtry.</p>
        <b>Filtry</b>   
        <p>Wielkośc liter w szukaniu po nazwie nie ma znaczenia, <br/>
           a przy dodawaniu produktów lista kategorii jest automatycznie uzupełniana.</p>
        <b>Lista produktów</b>   
        <p>Lewy klawisz dodaje produkt do Listy zakupów.</p>
        <b>Lista zakupów</b>   
        <p>Lewy klawisz usuwa produkt z Listy zakupów.<br/>
           Prawy klawisz zaznacza/odznacza produkty już kupione.</p>
        <div className={style.footermodal}><button type="button" id={style.closeButton} onClick={handleClose}>Zamknij</button></div>

      </section>
    </div>
  );
};

export default Modal;