import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import AppLayout from './AppLayout';
import Dashboard from './components/Dashboard';
import Product from './components/Product';
import Transaction from './components/Transaction';
import Inbound from './components/Inbound';
import Outbound from './components/Outbound';
import Profile from './components/Profile';
import Setting from './components/Setting';
import NotFound from './components/NotFound';
import Layout from './Layout';
import Login from './components/Login';
import Register from './components/Register';
import NotFound404 from './components/NotFound404';
import Unauthorized from './components/Unauthorized';
import ROLES_LIST from './utils/ROLES_LIST';

function App() {
    const [products, setProducts] = useState([]);
    
    return (
        <div className="App scroll-smooth h-screen bg-richblack font-sans text-white">
            {<Routes>
                <Route path='/' element={<Layout />}>
                    <Route
                        index
                        element={
                            <Login />
                        } 
                    />
                    <Route
                        path='register' 
                        element={
                            <Register />
                        } 
                    />
                    <Route
                        path='unauthorized'
                        element={
                            <Unauthorized />
                        } 
                    />
                    <Route path='/app' element={<AppLayout allowedRoles={[ROLES_LIST.Admin]}/>}>
                        <Route 
                            index 
                            element={
                                <Dashboard
                                    products={products}
                                    setProducts={setProducts} 
                                />
                            } 
                        />
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
                            element={
                                <Inbound 
                                    products={products}
                                />
                            } 
                        />
                        <Route 
                            path='outbound' 
                            element={
                                <Outbound
                                    products={products} 
                                />
                            } 
                        />
                        <Route 
                            path='profile' 
                            element={<Profile />} 
                        />
                        <Route 
                            path='setting' 
                            element={<Setting />} 
                        />
                    </Route>
                    <Route 
                        path='/*' 
                        element={<NotFound404 />}
                    />
                </Route>
            </Routes>}
        </div>
    );
}

export default App;
