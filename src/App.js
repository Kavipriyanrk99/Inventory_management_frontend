import { Route, Routes } from 'react-router-dom';
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
  return (
    <div className="App scroll-smooth min-h-screen bg-richblack font-sans text-white">
      {<Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route 
                    path='products' 
                    element={<Product />}
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
