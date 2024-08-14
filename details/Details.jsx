import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Details() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const handleAddContact = (e) => {
    e.preventDefault();

    if (name && email) {
      const newContact = { name, email };
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      setName("");
      setEmail("");
    }
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);

    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return (
    <Container>
      <h4>Add Contact</h4>
      <Form onSubmit={handleAddContact}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
      <ul style={{ padding: 0, listStyleType: "none" }}>
        {contacts.map((contact, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <span>
              {contact.name} - {contact.email}
            </span>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteContact(index)}
              style={{ marginLeft: "auto" }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Details;
