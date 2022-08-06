import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import * as firebase from "firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        // {
        //   price: 99,
        //   title: "Watch",
        //   qty: 1,
        //   img:
        //     "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=799&q=80",
        //   id: 1
        // },
        // {
        //   price: 999,
        //   title: "Mobile Phone",
        //   qty: 10,
        //   img:
        //     "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
        //   id: 2
        // },
        // {
        //   price: 999,
        //   title: "Laptop",
        //   qty: 4,
        //   img:
        //     "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
        //   id: 3
        // }
      ],
      loading : true
    }
    this.db = firebase.firestore();
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
  }
  componentDidMount(){
    //  firebase
    //  .firestore()
    //  .collection('products')
    //  .get()
    //  .then((snapshot) => {
    //    console.log(snapshot);

    //    snapshot.docs.map((doc) => {
    //      console.log(doc.data())

        
    //     });

    //    const products = snapshot.docs.map((doc) => {
    //      const data = doc.data();
    //      data['id'] = doc.id;
    //      return data;
    //    })

    //    this.setState({
    //      products,
    //      loading:false
    //    })
    //  })
    this.db
    .collection('products')
    // .where('price', '==' , 49999)
    .orderBy('price', 'desc')
    .onSnapshot((snapshot) => {
      console.log(snapshot);

      snapshot.docs.map((doc) => {
        console.log(doc.data()) 
       });

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      })

      this.setState({
        products,
        loading:false
      })
    })
  }
  handleIncreaseQuantity = (product) => {
    console.log("Heyy please inc the qty of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // });
    const docRef = this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty: products[index].qty + 1
    })
    .then(()=>{
      console.log('Updated Successfully')
    })
    .catch((error) =>{
        console.log('Error:', error);
    })
  };
  handleDecreaseQuantity = (product) => {
    console.log("Heyy please inc the qty of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // });
    const docRef = this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty: products[index].qty - 1
    })
    .then(()=>{
      console.log('Updated Successfully')
    })
    .catch((error) =>{
        console.log('Error:', error);
    })
  };
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   products: items
    // });
    const docRef = this.db.collection('products').doc(id);
    docRef
    .delete()
    .then(()=>{
      console.log('Deleted Successfully')
    })
    .catch((error) =>{
        console.log('Error:', error);
    })

  };

  getcountOfCartItems = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price;
    });

    return cartTotal;
  }
  addProduct = () =>{
   this.db
    .collection('products')
    .add({
      img : '',
      price : 900,
      qty:3,
      title: 'Washing Machine'
    })
    .then((docRef) => {
      console.log('Product has been added', docRef);
    })
    .catch((error) => {
      console.log('Error:', error);
    })
  }
  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getcountOfCartItems()} />
        {/* <button onClick={this.addProduct} style={{padding:20, fontSize:20}}>Add a product</button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h2>Loading Products...</h2>}
        <div
          style={{
            padding: 10,
            fontSize: 20,
            fontFamily: "sans-serif",
            fontWeight: "bold",
            marginLeft: "50%"
          }}
        >
          TOTAL: {this.getCartTotal()}{" "}
        </div>
      </div>
    );
  }
}

export default App;
