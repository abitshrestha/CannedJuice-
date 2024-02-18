import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddCategory from "./pages/Admin/AddCategory";
import FruitJuices from "./pages/Admin/FruitJuices";
import AddFruitJuice from "./pages/Admin/AddFruitJuice";
import UpdateFruitJuice from "./pages/Admin/UpdateFruitJuice";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/User/DetailPage";
import CheckoutPage from "./pages/User/CheckoutPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path='/fruitJuices/:slug' element={<DetailPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/add-category' element={<AddCategory/>}/>
          <Route path='admin/add-fruit-juice' element={<AddFruitJuice/>}/>
          <Route path='admin/fruit-juices' element={<FruitJuices/>}/>
          <Route path='admin/fruit-juice/:slug' element={<UpdateFruitJuice/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
