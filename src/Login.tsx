import "./Login.css";
import { Link } from "react-router-dom";
import { contextApi } from "./ContextAPI/context";
import { useContext } from "react";
const Login = () => {
  const { formData, login, setFormData } = useContext(contextApi)!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login Form</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password || ""}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
        <span className="signup-link">
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
