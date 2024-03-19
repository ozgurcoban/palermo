interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <h1>Contact form submission</h1>
    <p>
      From <strong>{name}</strong> at <a href={`mailto:${email}`}>{email}</a>
    </p>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
);

export default ContactFormEmail;
