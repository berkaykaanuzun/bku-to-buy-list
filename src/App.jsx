import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { nanoid } from "nanoid";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Confetti from "react-confetti";
// import useWindowSize from "react-use/lib/useWindowSize";

let shops = [
  {
    id: 1,
    name: "Migros",
  },
  {
    id: 2,
    name: "Teknosa",
  },
  {
    id: 3,
    name: "BİM",
  },
];
let categories = [
  {
    id: 1,
    name: "Elektronik",
  },
  { id: 2, name: "Şarküteri" },
  { id: 3, name: "Oyuncak" },
  { id: 4, name: "Bakliyat" },
  { id: 5, name: "Fırın" },
];

function App() {
  const [product, setProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [selectedShop, setSelectedShop] = useState(shops[0].id);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [allBought, setAllBought] = useState(false);
  // const [confettiVisible, setConfettiVisible] = useState(false);
  // Product obje Arrayine Karakter Eklememizi Sağlayan Fonksiyon

  const addProduct = () => {
    // Aynı isimde ürün kontrolü
    if (product.some((item) => item.name === productName)) {
      alert("Daha önce aynı üründen zaten eklenmiş!");
      return;
    }

    const newProduct = {
      id: nanoid(),
      name: productName,
      category: categories.find(
        (category) => category.id === parseInt(selectedCategory)
      ).name,
      shop: shops.find((shop) => shop.id === parseInt(selectedShop)).name,
      isBought: false,
    };
    setProduct((oldProduct) => [...oldProduct, newProduct]);
  };

  // Ürüne Tıkladığımız zaman İsBoughtı True Yapan (satın alındı gösteren) Fonksiyon

  const toggleIsBought = (id) => {
    let copyProduct = product.map((item) =>
      item.id === id ? { ...item, isBought: true } : item
    );
    if (copyProduct.every((item) => item.isBought)) {
      alert("tamam");
    }
    setProduct(() => copyProduct);
  };

  // Ürün Silmemizi Sağlayan Fonksiyon
  const deleteProduct = (id) => {
    setProduct((prevProducts) => prevProducts.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (allBought) {
      alert("Alışveriş Tamamlandı");
    }
  }, [allBought]);

  return (
    <>
      <Form onSubmit={addProduct}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Ürün Giriniz</Form.Label>
          <Form.Control
            type="text"
            placeholder="örn: Bilgisayar"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Select
          value={selectedShop}
          onChange={(e) => {
            setSelectedShop(e.target.value);
          }}
          aria-label="Default select example"
        >
          <option>Market</option>
          {shops.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          aria-label="Default select example"
        >
          <option>Kategori</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
        <Button onClick={addProduct}>Ekle</Button>
      </Form>

      <ul></ul>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Shop</th>
                  <th>Category</th>
                  <th>isBought</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item) => (
                  <tr onClick={() => toggleIsBought(item.id)} key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.shop}</td>
                    <td>{item.category}</td>
                    <td>{item.isBought ? "✅" : "❌"}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default App;
