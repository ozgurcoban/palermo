import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
// import nodemailer from 'nodemailer';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <Label htmlFor='checkbox'>
        <Input type='checkbox' {...field} {...props} />
        {children}
      </Label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Textarea className='text-area' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const ContactForm = () => {
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ \-]*)|(\+\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  return (
    <FormContainer>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        // initialTouched={{
        //   field: true,
        // }}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Fältet måste vara högst 15 tecken långt')
            .required('Obligatorisk fält'),
          lastName: Yup.string()
            .max(20, 'Fältet måste vara högst 20 tecken långt')
            .required('Obligatorisk fält'),
          phone: Yup.string().matches(phoneRegExp, 'Ogiltig telefonnummer'),
          email: Yup.string()
            .email('Ogiltig e-postadress')
            .required('Obligatorisk fält'),
          acceptedTerms: Yup.boolean()
            .required('Obligatorisk fält')
            .oneOf([true], 'Du måste acceptera villkoren och bestämmelserna.'),
        })}
        onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            setStatus({ success: 'Ditt meddelande har skickats!' });
          }, 1500);
          setTimeout(() => {
            resetForm({ values: '' });
            setStatus(null);
          }, 4000);
        }}
      >
        {({ isValid, isSubmitting, dirty, status }) => {
          return (
            <Form>
              <Div>
                <TextInput
                  label='Förnamn'
                  name='firstName'
                  type='text'
                  placeholder='Janne'
                  TextInput
                />
              </Div>
              <Div>
                <TextInput
                  label='Efternamn'
                  name='lastName'
                  type='text'
                  placeholder='Doe'
                />
              </Div>
              <Div>
                <TextInput
                  label='Telefonnummer'
                  name='phone'
                  type='text'
                  placeholder='0701234567...'
                />
              </Div>
              <Div>
                <TextInput
                  label='Email'
                  name='email'
                  type='email'
                  placeholder='janne@doe.com...'
                />
              </Div>
              <Div>
                <TextArea
                  label='Meddelande'
                  name='message'
                  rows='6'
                  placeholder='Skriv ditt meddelande här'
                />
              </Div>
              <Checkbox name='acceptedTerms'>
                Jag accepterar&nbsp;
                <Link className='link' to='/anvandarvillkor' target='blank'>
                  användarvillkoren
                </Link>
              </Checkbox>

              <SubmitButton type='submit' disabled={!(dirty && isValid)}>
                {isSubmitting ? 'Skickar...' : 'Skicka'}
              </SubmitButton>

              {status && status.success ? (
                <div className='success'>{status.success}</div>
              ) : null}
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  .form-wrapper {
    max-width: 30rem;
  }

  .error {
    color: red;
  }

  .link {
    text-decoration: underline;
    cursor: pointer;
  }

  .success {
    transition: ${({ theme }) => theme.transition};
  }
`;

const StyledForm = styled.form`
  max-width: 30rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.1rem;
`;

const Input = styled.input`
  margin-bottom: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  padding: 0.95rem 0.8rem;
`;

const Textarea = styled.textarea`
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  padding: 0.5rem;
`;

const SubmitButton = styled.button`
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  background-color: #7491aa;
  border: none;
  color: aliceblue;

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

export default ContactForm;
