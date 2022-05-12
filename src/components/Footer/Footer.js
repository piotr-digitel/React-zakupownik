import React from "react";
import style from "./Footer.module.scss";
import logo from '../../common/img/pb.gif';

const Footer = () => {
  
  return (
    <div className={style.footer} >
        <img src={logo} alt="Logo" />
        <div className={style.footerText}>
          Politechnika Białostocka - Zadanie zaliczeniowe React 2021/22 - Piotr Kuczkowski - digitel @ o2.pl
        </div>
    </div>
  );
};

export default Footer;