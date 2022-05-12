import React from 'react';
import styles from '../../common/styles/Headers.module.scss';
import Modal from "../../components/Modal/Modal";
import logo from '../.././logo.svg';

class AddProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {                  //konstrukcja stanu z nowym produktem
            newProduct: '',
            isFood: false,
            newCategory: '',
            show: true
        }
    }

    //zdarzenia powodujące zmianę stanu i wpisywanie wartości w kontrolki
    handleProductChange = (event) => {
        this.setState({ newProduct: event.target.value });
    }

    handleCategoryChange = (event) => {
        this.setState({ newCategory: event.target.value });
    }

    handleOnlyFoodChange = (event) => {
        this.setState({ isFood: event.target.checked });
    }
    
    //zdarzenie od button [dodaj] - wywołuje callback u rodzica aby dodać produkt do listy
    handleAddProduct = () => {
        const { newProduct, isFood, newCategory } = this.state;
        // przekazanie nowego produktu do komponentu rodzica (App)
        this.props.sendNewProductToParent({newProduct, newCategory, isFood});
    }

    showModal = () => {
        this.setState({ show: true });
      };
    
    hideModal = () => {
        this.setState({ show: false });
      };

    render() {
        const { newProduct, isFood, newCategory } = this.state;  //odczyt stanu zmiennych
        return (
            <div className={styles.WrapperAdd}>
                <img src={logo} className={styles.AppLogo} alt="logo" />
                <h3 className={styles.HeaderItems}>Dodawanie nowego produktu:</h3>
                <p className={styles.HeaderItems}>Nazwa:<input value={newProduct} onChange={this.handleProductChange}></input></p>
                <p className={styles.HeaderItems}>Kategoria:<input value={newCategory} onChange={this.handleCategoryChange}></input></p>
                <p className={styles.HeaderItems}> Produkt spożywczy:<input type='checkbox' onChange={this.handleOnlyFoodChange} value={isFood} ></input></p>
                <button className={styles.button} onClick={this.handleAddProduct}>Dodaj</button>
                <Modal show={this.state.show} handleClose={this.hideModal}></Modal>
                <button className={styles.button} type="button" onClick={this.showModal}>Pomoc</button>
            </div>
          );
    }





















    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         newProduct: '',
    //         isFood: false,
    //         newCategory: ''
    //     }

    //    // this.handleChangeName = this.handleChangeName.bind(this);
    //     this.handleChangeCategory = this.handleChangeCategory.bind(this);
    //     //this.handleChangeisFood = this.handleChangeisFood.bind(this);
    // }

    // handleChangeName(event) {  
    //     this.setState({newProduct: event.target.value});  
    // }
    
    // handleChangeCategory(event) {    
    //     this.setState({newCategory: event.target.value});  
    // }

    // handleChangeisFood(event) {    
    //     this.setState({isFood: event.target.value});  
    //     //console.log(event.target.value)
    // }

    // handleAddProduct = () => {
    //     const { newProduct, isFood } = this.state;
    //     console.log(newProduct);
    //     console.log(this.state.newCategory);
    //     console.log(isFood);
    // }

    // render(){   
    //        const { newProduct, isFood } = this.state;
    //     return (
    //         <div className={styles.Wrapper}>
    //            Dodaj produkt: 
    //             <input type="text" className={styles.HeaderItems} value={newProduct} onChange={this.handleChangeName} ></input>
    //             <input type="text" className={styles.HeaderItems} value={this.state.newCategory} onChange={this.handleChangeCategory} ></input>
    //             <input type='checkbox' value={isFood} onChange={this.handleChangeisFood} ></input>
    //             <button className={styles.HeaderItems} onClick={this.handleAddProduct}>Dodaj</button>
    //         </div>
    //     );
    // };
}

export default AddProducts;