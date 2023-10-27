import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getAllProductsUrl,
  updateProductUrl,
} from "../../networking/apiEndPoints";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ApiGet } from "../../networking/apiCalls";

function AddProduct() {
  const [product, setProduct] = useState({});
  const [stock, setStock] = useState("");
  const { product_id, action } = useParams();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await ApiGet(getAllProductsUrl);
        const result = await data.json();
        const filteredProducts = result.products.find(
          (item) => item._id === product_id
        );
        console.log("all products data", filteredProducts);
        setProduct(filteredProducts);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllProducts();
  }, [product_id]);

  console.log("product state ", product);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(
        updateProductUrl + product._id,
        {
          stock: stock,
        },
        { withCredentials: true }
      );
      console.log("data ", data);
      toast(data?.message);
    } catch (error) {
      console.log("error in catch ", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8 ">
        <div className="flex gap-2 items-center mb-6">
          <p className="text-gray-800 font-semibold text-base">Product Id: </p>
          <p className="text-black font-bold text-lg"> {product_id}</p>
        </div>
        <div className="bg-[#fff] px-14 py-7 rounded-xl shadow-xl">
          <form>
            <div className="grid grid-cols-2 gap-10 mb-10">
              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Product Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product?.name}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium text-sm outline-none shadow-sm"
                  readOnly
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Category:
                </label>
                <input
                  name="category"
                  value={product?.category}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium text-sm outline-none shadow-sm"
                  readOnly
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Original Price:
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={product?.originalPrice}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium text-sm outline-none shadow-sm"
                  readOnly
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Discount Price:
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  value={product?.discountPrice}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium text-sm outline-none shadow-sm"
                  required
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Stock:
                </label>
                <input
                  type="number"
                  name="stock"
                  value={stock}
                  placeholder="Enter Product Count"
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium text-sm outline-none shadow-sm placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={product?.description}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium text-sm outline-none shadow-sm"
                  rows="4"
                  readOnly
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-black w-[60%] text-white text-sm font-medium px-4 py-2 rounded"
              >
                {action === "add" ? "Add Product" : "Update Stocks"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-green-600"></div>
      </div>
    </Layout>
  );
}

export default AddProduct;
