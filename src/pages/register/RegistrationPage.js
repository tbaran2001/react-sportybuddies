import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Body from "../../components/common/Body";
import InputField from "../../components/common/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiProvider";
import { useFlash } from "../../contexts/FlashProvider";
import { useUser } from "../../contexts/UserProvider";
import {registerUser} from "../../api/auth";

export default function RegistrationPage() {
  const [formErrors, setFormErrors] = useState({});
  const emailField = useRef();
  const passwordField = useRef();
  const password2Field = useRef();
  const flash = useFlash();
  const { login } = useUser();

  useEffect(() => {
    emailField.current.focus();
  }, []);

  const navigate = useNavigate();
  const api = useApi();

  const onSubmit = async (event) => {
    const email = emailField.current.value;
    const password = passwordField.current.value;
    event.preventDefault();
    const errors = {};

    if (!emailField.current.value) {
      errors.email = "Email is required";
    }
    if (!passwordField.current.value) {
      errors.password = "Password is required";
    }
    if (!password2Field.current.value) {
      errors.password2 = "Password confirmation is required";
    }
    if (passwordField.current.value !== password2Field.current.value) {
      errors.password2 = "Passwords don't match";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      const data = await registerUser(api, email, password);
      if (!data.ok) {
        setFormErrors(data.body.errors.json);
      } else {
        setFormErrors({});
        flash("You have successfully registered!", "success");

        await login(email, password);

        navigate("/profile");
      }
    }
  };

  return (
    <Body>
      <h1>Register</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="email"
          label="Email address"
          error={formErrors.email}
          fieldRef={emailField}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          error={formErrors.password}
          fieldRef={passwordField}
        />
        <InputField
          name="password2"
          label="Password again"
          type="password"
          error={formErrors.password2}
          fieldRef={password2Field}
        />
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <hr />
      <p>
        Already have an account? <Link to="/login">Login here</Link>!
      </p>
    </Body>
  );
}
