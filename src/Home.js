import React, { Component } from 'react';
import { ProductConsumer } from './Context';
import { Table, Button, Form } from 'react-bootstrap';

class Home extends Component {
  renderTableRows(products) {
    return products.map((product) => (
      <tr key={product.id}>
        <td>{product.Title}</td>
        <td>{product.info}</td>
        <td>{product.price}</td>
        <td>{product.company}</td>
        <td>
          <div className="action-buttons">
            <ProductConsumer>
              {(value) => (
                <>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      value.onEdit(product.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      value.onDelete(product.id);
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </ProductConsumer>
          </div>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        <h3>Bike List</h3>
        <ProductConsumer>
          {(value) => (
            <>
              <Table size="sm" variant="dark" striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Information</th>
                    <th>Price</th>
                    <th>Company</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{this.renderTableRows(value.AllData)}</tbody>
              </Table>

              <div className="add-new-row">
                <Form>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      value={value.title}
                      onChange={(e) => {
                        value.updateValue(e, 'title');
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formInfo">
                    <Form.Label>Information</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter information"
                      value={value.info}
                      onChange={(e) => {
                        value.updateValue(e, 'info');
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter price"
                      value={value.price}
                      onChange={(e) => {
                        value.updateValue(e, 'price');
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formCompany">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter company"
                      value={value.company}
                      onChange={(e) => {
                        value.updateValue(e, 'company');
                      }}
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    onClick={() => {
                      value.onSave(value.id);
                    }}
                  >
                    {value.id ? 'Save' : 'Add New Row'}
                  </Button>
                </Form>
              </div>
            </>
          )}
        </ProductConsumer>
      </div>
    );
  }
}

export default Home;
