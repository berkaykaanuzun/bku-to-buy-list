import { useState } from "react";

import Button from "react-bootstrap/Button";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { nanoid } from "nanoid";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fuse from "fuse.js";
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
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [selectedShop, setSelectedShop] = useState(shops[0].id);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [filteredShopId, setFilteredShopId] = useState(null);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [filteredStatus, setFilteredStatus] = useState(null);
  const [filteredName, setFilteredName] = useState("");

  console.log(products);

  const filteredProducts = products.filter((product) => {
    let result = true;
    let myProductBought = product.isBought;

    // is Bought
    if (filteredStatus === true) {
      result = result && myProductBought === true;
    }
    if (filteredStatus === false) {
      result = result && myProductBought !== true;
    }

    // Name
    if (filteredName !== "") {
      const fuse = new Fuse(products, { keys: ["name"] });

      const isIncluded = fuse
        .search(filteredName)
        .find((f) => f.item.id == product.id);
      result = result && !!isIncluded;
    }

    // Shop
    if (filteredShopId !== null) {
      const isIncluded = product.shop == filteredShopId;
      result = result && isIncluded;
    }

    // Category
    if (filteredCategory !== null) {
      const isIncluded = product.category == filteredCategory;
      result = result && isIncluded;
    }
    return result;

    // if (filteredName !== "") {
    //   const fuse = new Fuse(product, { keys: ["name"] });
    //   const searchedProductsForName = fuse.search(filteredName);
    // } else {
    //   return product;
    // }
  });

  // const [confettiVisible, setConfettiVisible] = useState(false);
  // Product obje Arrayine Karakter Eklememizi Sağlayan Fonksiyon

  const addProduct = () => {
    // Aynı isimde ürün kontrolü
    if (products.some((item) => item.name === productName)) {
      alert("Daha önce aynı üründen zaten eklenmiş!");
      return;
    }

    const newProduct = {
      id: nanoid(),
      name: productName,
      category: selectedCategory,
      shop: selectedShop,
      isBought: false,
    };
    setProducts((oldProduct) => [...oldProduct, newProduct]);
  };

  // Ürüne Tıkladığımız zaman İsBoughtı True Yapan (satın alındı gösteren) Fonksiyon

  const toggleIsBought = (id) => {
    let copyProduct = products.map((item) =>
      item.id === id ? { ...item, isBought: true } : item
    );
    if (copyProduct.every((item) => item.isBought)) {
      alert("tamam");
    }
    setProducts(() => copyProduct);
  };

  // Ürün Silmemizi Sağlayan Fonksiyon
  const deleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== id)
    );
  };

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

      <Form onSubmit={addProduct}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <div key={`default-radio`} className="mb-3">
            <Form.Check // prettier-ignore
              type={"radio"}
              id={`default`}
              label={`Tümü`}
              name={`isBought`}
              checked={filteredStatus === null}
              onClick={() => {
                setFilteredStatus(null);
              }}
            />
            <Form.Check // prettier-ignore
              type={"radio"}
              id={`default-radio`}
              label={`Satın Alındı`}
              name={`isBought`}
              checked={filteredStatus === true}
              onClick={() => {
                setFilteredStatus(true);
              }}
            />

            <Form.Check
              type={"radio"}
              label={`Satın Alınmadı`}
              id={`default-radio-2`}
              name={`isBought`}
              checked={filteredStatus === false}
              onClick={() => {
                setFilteredStatus(false);
              }}
            />
          </div>
          <Form.Label>Ürün Filtreleyiniz</Form.Label>
          <Form.Control
            type="text"
            placeholder="örn: "
            value={filteredName}
            onChange={(event) => {
              setFilteredName(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Select
          value={filteredShopId}
          onChange={(e) => {
            setFilteredShopId(e.target.value);
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
          value={filteredCategory}
          onChange={(e) => {
            setFilteredCategory(e.target.value);
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
        <Button>Filtrele</Button>
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
                {filteredProducts.map((item) => (
                  <tr onClick={() => toggleIsBought(item.id)} key={item.id}>
                    <td>{item.name}</td>
                    <td>{shops.find((shop) => shop.id == item.shop).name}</td>
                    <td>
                      {
                        categories.find(
                          (category) => category.id == item.category
                        ).name
                      }
                    </td>
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
