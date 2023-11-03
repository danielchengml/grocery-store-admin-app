import Link from 'next/link';
import Layout from '../components/layout';

export default function Product() {
    return (
        <Layout>
          <h1>Fake Product</h1>
          <img src="http://localhost:9000/grocery-store-bucket/Screen%20Shot%202023-10-11%20at%209.39.07%20AM.png"/>
        </Layout>
      );
  }