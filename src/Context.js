
import React, { Component, createContext } from 'react';
import { rowData } from './appdata';

const ProductContext = createContext();

class ProductProvider extends Component {
  state = {
    AllData: rowData,
    id: '',
    title: '',
    info: '',
    price: '',
    company: '',
  };

  getRecord = (id) => {
    const product = this.state.AllData.find((item) => item.id === id);
    return product;
  };

  onEdit = (id) => {
    const tempProduct = this.state.AllData;
    const index = tempProduct.indexOf(this.getRecord(id));
    const selectedRecord = tempProduct[index];
    this.setState({
      id: selectedRecord.id,
      title: selectedRecord.Title,
      info: selectedRecord.info,
      price: selectedRecord.price,
      company: selectedRecord.company,
    });
  };

  updateValue = (e, test) => {
    if (test === 'title') {
      this.setState({ title: e.target.value });
    }

    if (test === 'info') {
      this.setState({ info: e.target.value });
    }

    if (test === 'price') {
      this.setState({ price: e.target.value });
    }

    if (test === 'company') {
      this.setState({ company: e.target.value });
    }
  };

  onSave = (id) => {
    if (id !== '') {
      const savedRecord = [...this.state.AllData];
      const index = savedRecord.findIndex((item) => item.id === id);
      const record = savedRecord[index];
      record.Title = this.state.title;
      record.info = this.state.info;
      record.price = this.state.price;
      record.company = this.state.company;
      this.setState({
        AllData: savedRecord,
        id: '',
        title: '',
        info: '',
        price: '',
        company: '',
      });
    } else {
      const newRecord = {
        id: Date.now(),
        Title: this.state.title,
        info: this.state.info,
        price: this.state.price,
        company: this.state.company,
      };
      this.setState({
        AllData: [...this.state.AllData, newRecord],
        title: '',
        info: '',
        price: '',
        company: '',
      });
    }
  };

  onDelete = (id) => {
    const tempProduct = this.state.AllData.filter(item => item.id !== id);
    this.setState({
      AllData: tempProduct
    });
  }

  render() {
    return (
      <div>
        <ProductContext.Provider
          value={{
            ...this.state,
            onEdit: this.onEdit,
            updateValue: this.updateValue,
            onSave: this.onSave,
            onDelete: this.onDelete,
          }}
        >
          {this.props.children}
        </ProductContext.Provider>
      </div>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
