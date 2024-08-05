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

const AdminSignUp = () => {
  const [validated, setValidated] = useState(false);
  const { setReloadPage, setLoggedAdmin, } = useContext(AdminGlobalDataContext);

  const [adminSignUp, setAdminSignUP] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate()
  const handleSubmit = async (event) => {

    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const res = await axios.post(`http://localhost:9000/api/blog/admin`, adminSignUp);
        setAdminSignUP(adminSignUp => ({ ...adminSignUp, ...res.data }));
        alert('Admin successfully signed up');
        navigate('/admin/login')
      } catch (error) {
        console.error(error);
      }
    }

    setValidated(true);
  };

  return (
    <>
      <div className="page-title">Sign UP</div>
      <div className="form-holder-outter">
        <div className="form-holder-inner">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <FloatingLabel
                  controlId="floatingInput"
                  label="First Name"
                  className="mb-3"
                >
                  <Form.Control
                    className="mt-3"
                    type="text"
                    placeholder="input your first name"
                    required
                    value={adminSignUp.firstName}
                    onChange={e => setAdminSignUP({ ...adminSignUp, firstName: e.target.value })}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Last Name"
                  className=""
                >
                  <Form.Control
                    className="mt-3"
                    type="text"
                    placeholder="input your last name"
                    required
                    value={adminSignUp.lastName}
                    onChange={e => setAdminSignUP({ ...adminSignUp, lastName: e.target.value })}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <FloatingLabel controlId="floatingInput" label="Work email">
                  <Form.Control
                    className=""
                    type="email"
                    placeholder="Input your email"
                    required
                    value={adminSignUp.email}
                    onChange={e => setAdminSignUP({ ...adminSignUp, email: e.target.value })}
                  />
                </FloatingLabel>
                <FloatingLabel

                  className=""
                  controlId="floatingPassword" label="Password">
                  <Form.Control
                    className="mt-3"
                    type="tel"
                    placeholder="input your phone number"
                    required
                    value={adminSignUp.password}
                    onChange={e => setAdminSignUP({ ...adminSignUp, password: e.target.value })}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <FloatingLabel controlId="floatingInput"
                  label="Phone number">
                  <Form.Control
                    className=""
                    type="text"
                    placeholder="Input your phone number"
                    required
                    value={adminSignUp.phone}
                    onChange={e => setAdminSignUP({ ...adminSignUp, phone: e.target.value })}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                className="mt-3"
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit">Sign Up</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdminSignUp;
