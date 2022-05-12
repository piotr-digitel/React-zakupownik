import React from 'react';
import styles from '../../common/styles/Headers.module.scss';

class ProductsFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {                    //konstrukcja stanu z filtrem
            searchPhrase: '',
            searchOnlyFood: false,
            searchCategory: '',
         }
    }

//odbiera od parenta informację po dodaniu elementu, że trzeba zresetować filtr
    componentDidUpdate() {
        const { clearFilter } = this.props;
        if(clearFilter) this.handleResetFilters();
        return false;
      }

    //zdarzenia powodujące zmianę stanu i wpisywanie wartości w kontrolki
    handleSearchPhraseChange = (event) => {
        this.setState({ searchPhrase: event.target.value }, () => this.filterProdukty());
    }

    handleOnlyFoodChange = (event) => {
        this.setState({ searchOnlyFood: event.target.checked }, () => this.filterProdukty());
    }

    handleSelectCategory = (event) => {
        this.setState({ searchCategory: event.target.value }, () => this.filterProdukty());
    }

    //wykonanie filtrowania ze zdarzeń
    filterProdukty = () => {
        const { produkty } = this.props;
        const { searchPhrase, searchOnlyFood, searchCategory } = this.state;
        // odfiltrowanie zgodnych wyników - sprawdza zmieniając wszystko do małych liter - wielkość liter nie ma znaczenia
        let filteredProdukty = produkty.filter((produkt) => produkt.nazwa.toLowerCase().includes(searchPhrase.toLowerCase()));
        if (searchOnlyFood) {
            filteredProdukty = filteredProdukty.filter((produkt) => produkt.produktSpozywczy === true);  //tylko spożywcze
        }
        if (searchCategory) {
            filteredProdukty = filteredProdukty.filter((produkt) => produkt.kategoria === searchCategory);   //po kategoriach
        }
        // przekazanie wyfiltrowanych produktów do komponentu rodzica (App)
        this.props.sendFilteredProductsToParentComponent(filteredProdukty);
    }

    //zdarzenie do resetowania filtrów
    handleResetFilters = () => {
        this.setState({               //zapamiętanie stanu pustego filtru
            searchPhrase: '',
            searchOnlyFood: false,
            searchCategory: '',
        },() => {
            const checkboxById = document.getElementById("checkbox");   //żeby przy resecie filtrów odznaczało checkboxa [tylko spożywcze]
            checkboxById.checked = false;
            const selectById = document.getElementById("select");  //żeby przy resecie filtrów czyściło pole select - wypisuje [Wszystkie]
            selectById.value = '';
            this.filterProdukty();  //wykonanie filtrowania dla pustego filtra - aby się przerenderowało i wświetliło wszystko
            this.props.sendNoFilter(false);  //kiedy filtr się zrestartuje, przekazuje do parenta false, aby się nie zapetliło
        });
    }

    //do filtrowania po kategoriach tworzy arraya z unikalnymi kategoriami 
    getUniqueCategories = () => {
        const { produkty } = this.props;
        const CategoryList = produkty.map((produkt) => produkt.kategoria)
        const uniqueCategoryList = [...new Set(CategoryList)];
        return uniqueCategoryList
    }

    render() {
        const uniqueCategories = this.getUniqueCategories();  //odczyt unikalnych kategorii
        const { searchPhrase, searchOnlyFood, searchCatType } = this.state;  //odczyt stanu filtra - aby wypisać wprowadzone wartości
        return (
            <div className={styles.Wrapper}>
                <h3 className={styles.HeaderItems}>Filtry:</h3>
                <p className={styles.HeaderItems}>Szukaj po nazwie:<input value={searchPhrase} onChange={this.handleSearchPhraseChange}></input></p>
                <p className={styles.HeaderItems}>Tylko produkty spożywcze:<input type='checkbox' id="checkbox" onChange={this.handleOnlyFoodChange} value={searchOnlyFood} ></input></p>
                <div className={styles.CustomSelect}>Kategorie: 
                <select value={searchCatType} onChange={this.handleSelectCategory} id="select">
                    <option key={'all'} value={''}>Wszystkie</option>
                    {uniqueCategories.map((kategoria) =><option key={kategoria} value={kategoria}>{kategoria}</option>)}
                </select></div>
                <button className={styles.button} onClick={this.handleResetFilters}>Zresetuj filtry</button>
            </div>
          );
    }
  }

  export default ProductsFilters;