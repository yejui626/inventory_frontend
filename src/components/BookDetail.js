import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookDetail() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    function updateInventoryItem(itemId, newData) {
        return axios.put(`http://localhost:8000/api/update-inventory/${itemId}/`, newData);
    }

    


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/inventory/${productId}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [productId]);


    const handleUpdate = async () => {
        try {
            if (!product) {
                console.error('Product data is not available');
                return;
            }

            const response = await updateInventoryItem(productId, product);
            console.log('Item updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/delete-inventory/${productId}/`);
            navigate('/inventory');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (!product) {
        return <div className="book-detail">No product found</div>;
    }

    return (
        <div className="book-detail">
            <h1>{product.title}</h1>
            <p>
                <img src={product.image_url} alt="Bonus" className="book-image" />
            </p>
            <p>
                Title:
                <input
                    type="text"
                    value={product.title}
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                />
            </p>
            <p>
                Author:
                <input
                    type="text"
                    value={product.author}
                    onChange={(e) => setProduct({ ...product, author: e.target.value })}
                />
            </p>
            <p>
                Category:
                <input
                    type="text"
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                />
            </p>
            <p>
                Price:
                <input
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                />
            </p>
            <p>
                Quantity:
                <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                />
            </p>
            <p>
                Publication Date:
                <input
                    type="date"
                    value={product.publication_date}
                    onChange={(e) => setProduct({ ...product, publication_date: e.target.value })}
                />
            </p>
            <p>
                ISBN:
                <input
                    type="text"
                    value={product.isbn}
                    onChange={(e) => setProduct({ ...product, isbn: e.target.value })}
                />
            </p>
            <button onClick={handleUpdate} className="btn btn-primary mr-2">Update</button>
            <button onClick={handleDelete} className="btn btn-danger mr-2">Delete</button>
        </div>
    );
}

export default BookDetail;
