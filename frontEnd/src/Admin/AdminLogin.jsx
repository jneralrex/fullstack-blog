import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import './styles/AdminSignUp.css'
import './styles/General.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminGlobalDataContext } from "./AdminGlobalDataProvider";

const AdminLogin = () => {
  const [validated, setValidated] = useState(false);
  const [logAdmin, setLogAdmin] = useState({ email: '', password: '' });
  const { setReloadPage, setLoggedAdmin } = useContext(AdminGlobalDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/blog/admin/login", logAdmin);
      if (res.data.message === 'Login successful') {
        setLoggedAdmin(res.data.data);
        localStorage.setItem("Blog_Admin", JSON.stringify(res.data.data));
        navigate('/admin/control-panel/over-view');
      } else {
        alert('Login unsuccessful');
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert('Error occurred during login');
    }
    setValidated(true);
  }

  return (
    <>
      <div className="page-title">Login</div>
      <div className="form-holder-outter">
        <div className="form-holder-inner">
          <Form noValidate validated={validated} onSubmit={handleLogin}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <FloatingLabel controlId="floatingInput" label="Email">
                  <Form.Control
                    className="mt-3"
                    type="text"
                    placeholder="Input your Email"
                    required
                    value={logAdmin.email}
                    onChange={e => setLogAdmin({ ...logAdmin, email: e.target.value })}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    className="mt-3"
                    type="password"
                    placeholder="Input your password"
                    required
                    value={logAdmin.password}
                    onChange={e => setLogAdmin({ ...logAdmin, password: e.target.value })}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Button type="submit">Login</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
