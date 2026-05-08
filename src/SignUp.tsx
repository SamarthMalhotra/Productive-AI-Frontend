import "./SignUp.css";
import { contextApi } from "./ContextAPI/context.tsx";
import { useContext } from "react";
function SignUp() {
  const { formData, setFormData, signup } = useContext(contextApi)!;

  return (
    <div className="signup-container">
      <form
        className="signup-form"
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        <h2>Create Account</h2>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            placeholder="Enter username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            placeholder="Enter email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="input-group password-group">
          <label>Password</label>

          <div className="password-box">
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              placeholder="Enter password"
              min={8}
              max={16}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
