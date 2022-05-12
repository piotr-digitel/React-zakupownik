import React , { useState } from 'react';
import ProductsList from './components/ProductsList/ProductsList';
import ShopingList from './components/ShopingList/ShopingList';
import AddProducts from './components/AddProducts/AddProducts';
import ProductsFilters from './components/ProductsFilters/ProductsFilters';
import Footer from './components/Footer/Footer';
import styles from './App.module.scss';
import produkty from "./common/consts/produkty";  // stąd pochodzą dostępne produkty


let zakupy =  [];  //tu są przechowywane produkty dla koszyka

function App() {
  const [resultsToDisplay, setResultsToDisplay] = useState(produkty);  //dostępne produkty
  const [koszykToDisplay, setZakupyToDisplay] = useState(zakupy);      //produkty w koszyku
  const [rerender, setRerender] = useState(false);                     //zmusza do przerenderowania
  const [clearFilter, setClearFilter] = useState(false);               //wysyła do child filtra info że ma się zrestartować po dodaniu nowego elementu

  //dodawanie produktu do koszyka - zdarzenie przychodzi od kliknięcia w componencie ProductList
  const sendDataToParent = (produkt) => { // the callback. Use a better name! - 
    //Szukamy największego id w produktach w koszyku i dodajemy 1
    let iloscWKoszyku = koszykToDisplay.length
    let maxid = 0;
    for(let i = 0; i < iloscWKoszyku; i++){
      const a = koszykToDisplay[i].id;
      if(a >= maxid) maxid= a + 1; 
    }
    // dodajemy nowy produkt do koszyka z największym id+1
    koszykToDisplay.push({id: maxid, nazwa: produkt.nazwa, podkreslony: false});
    setZakupyToDisplay(koszykToDisplay);  //upgrade stejta
    setRerender(!rerender);  //przerenderujemy
  };

  //dodawanie nowego produktu do listy dostępnych - zdarzenie od kliknięcia w componencie AddProducts
  const sendNewProductToParent = (produkt) => {
    //validacja nowego produktu, czy już takiego nie ma na liście
    let nameExists = false;
    for(let i=0; i<Object.keys(produkty).length; i++){                 //przemiatamy wszystkie produkty
      if(produkty[i].nazwa===produkt.newProduct) nameExists = true     //i sprawdzamy czy już takiego nie ma
    }
    if(nameExists){
      alert('Dodanie nieudane\nTaki produkt już jest na liście')
    }else{
      //validacja nowego produktu, nie może mieć mniej niż 2 litery, jak nie ma kategorii to dajemy 'inne'
      if(produkt.newProduct.length<3){
        alert('Dodanie nieudane\nNazwa produktu musi mieć min. 3 znaki.')
      }else{
        if(produkt.newCategory.length<2){
          produkty.push({nazwa: produkt.newProduct, kategoria: 'inne', produktSpozywczy: produkt.isFood});
        }else{
          produkty.push({nazwa: produkt.newProduct, kategoria: produkt.newCategory, produktSpozywczy: produkt.isFood});
        }  
        setClearFilter(true);           //po dodaniu nowego zresetuj filtr w componencie filter
        setResultsToDisplay(produkty);  //upgrade stejta
        setRerender(!rerender);         //przerenderujemy
      }
    }
  };

  return (
    <div className={styles.appWrapper}>
      <AddProducts  sendNewProductToParent={sendNewProductToParent} />
      <ProductsFilters clearFilter={clearFilter} produkty={produkty} sendFilteredProductsToParentComponent={setResultsToDisplay} sendNoFilter={setClearFilter}/>
      <div className={styles.columnsWrapper}>
        <ProductsList produktyToDisplay={resultsToDisplay} sendDataToParent={sendDataToParent}/>
        <ShopingList zakupyToDisplay={koszykToDisplay}/>
      </div>
      <Footer/>
    </ div>
  );
}

export default App;
