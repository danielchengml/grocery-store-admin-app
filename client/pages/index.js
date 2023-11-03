import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import { getSortedProductsData, addProduct, removeProduct } from '../lib/products';
import Modal from "../components/modal";
import {useState} from "react";
import Form from '../components/form';
import UploadAndDisplayImage from '../components/upload-display-image';

export default function Home({allProductsData}) {
  const [showModal, setShowModal] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault(event);
    let product = {
      name: event.target.name.value,
      description: event.target.description.value,
      image_url: event.target.image_url.value,
      price: parseFloat(event.target.price.value)
    }
    try {
      let res = await addProduct(product);
      if (res === 1) {
        alert(product.name + " added successfully!");
      } else {
        alert("failed to add " + product.name);
      }
    } catch (err) {
      alert("failed to add " + product.name + " " + err);
    }
    setShowModal(false);
  };

  const deleteProduct = async (id) => {
    try {
      let res = await removeProduct(id);
      if (res.status == 200) {
        alert(id + " removed successfully!");
      } else {
        alert("failed to remove " + id );
      }
    } catch (err) {
      alert("failed to remove " + id + " " + err);
    }
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
      </section>
      <div>
        <button onClick={() => setShowModal(true)}>Add Product</button>
        {showModal &&
            <Modal onClose={() => setShowModal(false)}>
                <div className="modal-body">
                  <UploadAndDisplayImage/>
                  <Form onSubmit={onSubmit}/>
                </div>
            </Modal>
        }
      </div>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Inventory</h2>
        <ul className={utilStyles.list}>
          {allProductsData.length === 0 && <p>No products to show.</p>}
          {allProductsData && allProductsData.map((product) => (
            <li className={utilStyles.listItem} key={product.id}>
              <Link href={`/product/${encodeURIComponent(product.id)}`}>
                {product.name} - ${product.price} <img id="product-photo" src={product.image_url}/> 
              </Link>
              {/* <button onClick={() => deleteProduct(product.id)}>delete</button> */}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allProductsData = await getSortedProductsData();
  return {
    props: {
      allProductsData,
    },
  };
}