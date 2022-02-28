const Products = [];

class ProductTable extends React.Component {
  render() {
    const productRows = this.props.products.map(product => /*#__PURE__*/React.createElement(ProductRow, {
      key: product.id,
      product: product
    }));
    return /*#__PURE__*/React.createElement("table", {
      className: "borderedTable"
    }, /*#__PURE__*/React.createElement("thead", {
      align: "left"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image"))), /*#__PURE__*/React.createElement("tbody", null, productRows));
  }

}

class ProductRow extends React.Component {
  render() {
    const prd = this.props.product;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, prd.Name), /*#__PURE__*/React.createElement("td", null, "$", prd.Price), /*#__PURE__*/React.createElement("td", null, prd.Category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
      href: prd.Image,
      target: "_blank"
    }, "View")));
  }

}

class AddProduct extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    var price = form.prdPrice.value;
    price = price.slice(1);
    const prd = {
      productName: form.prdName.value,
      productPrice: price,
      productCategory: form.prdCat.value,
      productImage: form.prdImg.value
    };
    this.props.createProduct(prd);
    form.prdName.value = "";
    form.prdPrice.value = "$";
    form.prdImg.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
      name: "productAdd",
      className: "formAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", null, "Category", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("select", {
      id: "prdCat",
      name: "category"
    }, /*#__PURE__*/React.createElement("option", {
      value: "shirts"
    }, "Shirts"), /*#__PURE__*/React.createElement("option", {
      value: "jeans"
    }, "Jeans"), /*#__PURE__*/React.createElement("option", {
      value: "jackets"
    }, "Jackets"), /*#__PURE__*/React.createElement("option", {
      value: "sweaters"
    }, "Sweaters"), /*#__PURE__*/React.createElement("option", {
      value: "accessories"
    }, "Accessories")))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", null, "Price", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "prdPrice",
      defaultValue: "$"
    }))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("input", {
      type: "submit",
      id: "btnAdd",
      value: "Add Product"
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", null, "Product Name", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "prdName"
    }))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", null, "Image URL", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "prdImg"
    }))))));
  }

}

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query{
            productList{
                id Name Price Image Category
            }
        }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const resposeResult = await response.json();
    this.setState({
      products: resposeResult.data.productList
    });
  }

  async createProduct(newProduct) {
    const query = `mutation {
            productAdd(product:{
                Name: "${newProduct.productName}",
                Price: ${newProduct.productPrice},
                Image: "${newProduct.productImage}",
                Category: ${newProduct.productCategory},
            }) {id}
        }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    this.loadData();
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "mainDiv"
    }, /*#__PURE__*/React.createElement("h1", null, "Company Inventory"), /*#__PURE__*/React.createElement("h3", null, "Availble products"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(ProductTable, {
      products: this.state.products
    }), /*#__PURE__*/React.createElement("h3", null, "Add a new product"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(AddProduct, {
      createProduct: this.createProduct
    }));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Product, null), document.getElementById('section1'));