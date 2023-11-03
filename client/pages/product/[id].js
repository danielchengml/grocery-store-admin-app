import Layout from '../../components/layout';
import { getAllProductIds, getProductData } from '../../lib/products';

export default function Post({ productData }) {
    return (
        <Layout>
            name: {productData.name}
            <br />
            description: {productData.description}
            <br />
            image: {productData.image_url}
            <br />
            price: {productData.price}
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllProductIds();
    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps({ params }) {
    const productData = await getProductData(params.id);
    return {
        props: {
            productData,
        },
    };
}