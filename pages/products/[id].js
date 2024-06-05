import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProductById } from '../../lib/api';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const productData = await getProductById(id);
        setProduct(productData);
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Category ID: {product.categoryId}</p>
      <p>Description: {product.description || 'No description available.'}</p>
      <button onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded mt-4 hover:bg-gray-600">
        Back to Products
      </button>
    </div>
  );
};

export default ProductDetails;
