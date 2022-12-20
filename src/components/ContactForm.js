import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

const ContactForm = () => {
  const [inputs, setInputs] = useState({});
  const [textarea, setTextarea] = useState('Bara skriva här nu så du vet');

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
    setTextarea(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    setTimeout(() => {
      alert(inputs);
    }, 3000);
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>kontakta oss</h3>
      <FormWrapper>
        <Div>
          <Label htmlFor='text'>förnamn</Label>
          <InputField
            name='firstName'
            type='text'
            placeholder='Jane'
            value={inputs.firstName || ''}
            onChange={handleChange}
          />
        </Div>
        <Div>
          <Label htmlFor='text'>efternamn</Label>
          <InputField
            name='lastName'
            type='text'
            placeholder='Doe'
            value={inputs.lastName || ''}
            onChange={handleChange}
          />
        </Div>
        <Div>
          <Label htmlFor='tel'>telefonnummer</Label>
          <InputField
            name='phone'
            type='tel'
            placeholder='t.ex 0701234567...'
            value={inputs.phone || ''}
            onChange={handleChange}
          />
        </Div>
        <Div>
          <Label htmlFor='email'>epost</Label>
          <InputField
            name='email'
            type='email'
            placeholder='@doe.com...'
            value={inputs.email || ''}
            onChange={handleChange}
          />
        </Div>
        <Div>
          <Label htmlFor='message'>meddelande</Label>
          <Textarea
            name='message'
            placeholder='Skriv ditt meddelande här'
            value={textarea}
            onChange={handleChange}
          />
        </Div>
        <SubmitButton className='btn' type='submit'>
          Skicka
        </SubmitButton>
      </FormWrapper>
    </FormContainer>
  );
};

const FormContainer = styled.div``;

const FormWrapper = styled.form`
  max-width: 30rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.3rem;
`;

const InputField = styled.input`
  margin-bottom: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  padding: 1rem;
`;

const Textarea = styled.textarea`
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  padding: 0.5rem;
  height: 7rem;
`;

const SubmitButton = styled.button`
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  background-color: #7491aa;
  color: aliceblue;
`;

export default ContactForm;
