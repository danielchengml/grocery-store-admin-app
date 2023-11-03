import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import { getSortedProductsData, addProduct } from '../lib/products';
import Modal from "../components/modal";
import {useState} from "react";
import Form from '../components/form';
import UploadAndDisplayImage from '../components/upload-display-image';

export default function Home({allProductsData}) {
  const [showModal, setShowModal] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault(event);
    console.log("!!!!event.target.files[0]", event.target.files)
    let product = {
      name: event.target.name.value,
      description: event.target.description.value, 
      price: parseFloat(event.target.price.value)
    }
    try {
      let res = await addProduct(product);
      alert(product.name + " added successfully!");
    } catch (err) {
      alert("failed to add " + product.name + " " + err);
    }
    setShowModal(false);
  };
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
        {/* <Container triggerText={triggerText} onSubmit={onSubmit} /> */}
        <h2 className={utilStyles.headingLg}>Inventory</h2>
        <ul className={utilStyles.list}>
          {allProductsData.map((product) => (
            <li className={utilStyles.listItem} key={product.id}>
              <Link href={`/product/${encodeURIComponent(product.id)}`}>
                {product.name} - ${product.price} 
              </Link>
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