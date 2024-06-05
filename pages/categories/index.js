// pages/categories/index.js
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../lib/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
