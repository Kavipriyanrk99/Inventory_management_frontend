import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Layout from './Layout';
import Dashboard from './components/Dashboard';
import Product from './components/Product';
import Transaction from './components/Transaction';
import Inbound from './components/Inbound';
import Outbound from './components/Outbound';
import Profile from './components/Profile';
import Setting from './components/Setting';
import NotFound from './components/NotFound';

function App() {
    const [products, setProducts] = useState([
        {
            "_id": "659aa5cdecd52b2c4b55d2e7",
            "productID": "PRD-0001",
            "productName": "Pixel 8 Pro",
            "unitPrice": 90000,
            "quantityInStock": 51,
            "barcode": "",
            "description": "Made By Google",
            "date": "2024-01-07T13:23:25.000Z",
            "totalInbound": 51,
            "totalOutbound": 0
        },
        {
            "_id": "659abfb6ecd52b2c4b55d349",
            "productID": "PRD-0002",
            "productName": "Redmi 8A Dual",
            "unitPrice": 8500,
            "quantityInStock": 50,
            "barcode": "",
            "description": "Made By Redmi",
            "date": "2024-01-07T15:13:58.000Z",
            "totalInbound": 50,
            "totalOutbound": 0
        },
        {
            "_id": "659b79a39e7f427947cb6abe",
            "productID": "PRD-0003",
            "productName": "Asus Zenfone 10",
            "unitPrice": 80000,
            "quantityInStock": 5,
            "barcode": "",
            "description": "Made by Asus",
            "date": "2024-01-08T04:27:15.000Z",
            "totalInbound": 5,
            "totalOutbound": 0
        },
        {
            "_id": "659b9aae9e7f427947cb6d50",
            "productID": "PRD-0004",
            "productName": "Lenovo Legion",
            "unitPrice": 12499,
            "quantityInStock": 1,
            "barcode": "",
            "description": "Made by Lenovo",
            "date": "2024-01-08T06:48:14.000Z",
            "totalInbound": 1,
            "totalOutbound": 0
        },
        {
            "_id": "659b9aae9e7f427947cb6d50",
            "productID": "PRD-0005",
            "productName": "Lenovo Legion",
            "unitPrice": 12499,
            "quantityInStock": 1,
            "barcode": "",
            "description": "Made by Lenovo",
            "date": "2024-01-08T06:48:14.000Z",
            "totalInbound": 1,
            "totalOutbound": 0
        },
    ]);
    const [product, setProduct] = useState({
        _id: "",
        productID: "",
        productName: "",
        unitPrice: 0.0,
        quantityInStock: 0,
        barcode: "",
        description: "",
        date: "",
        totalInbound: 0,
        totalOutbound: 0
      });
    return (
        <div className="App scroll-smooth min-h-screen bg-richblack font-sans text-white">
        {<Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route 
                        path='products' 
                        element={
                            <Product
                                products={products}
                                setProducts={setProducts} 
                            />
                        }
                    />
                    <Route 
                        path='transactions' 
                        element={<Transaction />} 
                    />
                    <Route 
                        path='inbound' 
                        element={<Inbound />} 
                    />
                    <Route 
                        path='outbound' 
                        element={<Outbound />} 
                    />
                    <Route 
                        path='profile' 
                        element={<Profile />} 
                    />
                    <Route 
                        path='setting' 
                        element={<Setting />} 
                    />
                    <Route 
                        path='/*' 
                        element={<NotFound />}
                    />
                </Route>
            </Routes>}
        </div>
    );
}

export default App;
