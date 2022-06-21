import React from "react";
import ProductItem from "../../components/product-item";
import axiosInstance from "../../services/axios";

function Products(props) {
  const { products } = props;

  const renderProducts = () => {
    return products.map((product) => <ProductItem product={product} />);
  };

  return <div>{renderProducts()}</div>;
}

export async function getServerSideProps() {
  try {
    const res = await axiosInstance.get("/products");

    return {
      props: { products: res.data },
    };
  } catch (error) {
    console.log({ error });
  }
}

export default Products;
