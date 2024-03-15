import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

function BookList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [sortedBy, setSortedBy] = useState(null);
    const [newProduct, setNewProduct] = useState({
        title: '',
        author: '',
        category: '',
        price: '',
        quantity: '',
        publication_date: '',
        isbn: '',
        image_url: '',
        supplier: {
            name: '',
            contact_person: '',
            email: '',
            phone_number: '',
            address: '',
            currency: ''
        }
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://yejui626.pythonanywhere.com/api/inventory/');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortedBy(event.target.value);
    };

    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(filter.toLowerCase());
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.startsWith("supplier_")) {
            const supplierField = name.substring("supplier_".length);
            setNewProduct({
                ...newProduct,
                supplier: {
                    ...newProduct.supplier,
                    [supplierField]: value,
                },
            });
        } else {
            setNewProduct({
                ...newProduct,
                [name]: value,
            });
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('test');
            await axios.post(`https://yejui626.pythonanywhere.com/api/add-inventory/`, newProduct);
            setNewProduct({
                title: '',
                author: '',
                category: '',
                price: '',
                quantity: '',
                publication_date: '',
                isbn: '',
                image_url: '',
                supplier: {
                    name: '',
                    contact_person: '',
                    email: '',
                    phone_number: '',
                    address: '',
                    currency: ''
                }
            });
            fetchProducts();
            setShowModal(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    
    
    if (sortedBy) {
        filteredProducts.sort((a, b) => {
            if (a[sortedBy] < b[sortedBy]) return -1;
            if (a[sortedBy] > b[sortedBy]) return 1;
            return 0;
        });
    }

    return (
        <div className="container">
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Product
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="book-list">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Title"
                                value={newProduct.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input
                                type="text"
                                name="author"
                                className="form-control"
                                placeholder="Author"
                                value={newProduct.author}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                className="form-control"
                                placeholder="Category"
                                value={newProduct.category}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                className="form-control"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                className="form-control"
                                placeholder="Quantity"
                                value={newProduct.quantity}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Publication Date</label>
                            <input
                                type="date"
                                name="publication_date"
                                className="form-control"
                                value={newProduct.publication_date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                className="form-control"
                                placeholder="ISBN"
                                value={newProduct.isbn}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input
                                type="text"
                                name="image_url"
                                className="form-control"
                                placeholder="Image URL"
                                value={newProduct.image_url}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* Supplier fields */}
                        <div className="form-group">
                            <label>Supplier Name</label>
                            <input
                                type="text"
                                name="supplier_name"
                                className="form-control"
                                placeholder="Supplier Name"
                                value={newProduct.supplier_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Person</label>
                            <input
                                type="text"
                                name="supplier_contact_person"
                                className="form-control"
                                placeholder="Contact Person"
                                value={newProduct.supplier_contact_person}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="supplier_email"
                                className="form-control"
                                placeholder="Email"
                                value={newProduct.supplier_email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="supplier_phone_number"
                                className="form-control"
                                placeholder="Phone Number"
                                value={newProduct.supplier_phone_number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="supplier_address"
                                className="form-control"
                                placeholder="Address"
                                value={newProduct.supplier_address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Currency</label>
                            <input
                                type="text"
                                name="supplier_currency"
                                className="form-control"
                                placeholder="Currency"
                                value={newProduct.supplier_currency}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
            <h1 className="my-4">Book List</h1>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by title..."
                    value={filter}
                    onChange={handleFilterChange}
                />
                <select className="form-control" onChange={handleSortChange}>
                    <option value="">Sort by...</option>
                    <option value="title">Title</option>
                    <option value="price">Price</option>
                </select>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="table table-bordered book-list" style={{ border: '2px solid #ccc', borderRadius: '5px', borderCollapse: 'collapse' }}>
                    <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>ISBN</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td><Link to={`/inventory/${product.id}`}>{product.title}</Link></td>
                                <td>{product.isbn}</td>
                                <td>{product.author}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default BookList;
