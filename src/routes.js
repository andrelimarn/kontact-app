import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function PrivateRoute({ component: Component }) {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? Component : <Navigate to="/" />;
}

function MyRoutes() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="/home" element={<PrivateRoute component={<Home />} />} />
            </Routes>
        </Router>
    );
}

export default MyRoutes;