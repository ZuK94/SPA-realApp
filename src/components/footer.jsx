const Footer = () => {
  return (
    <footer className="border-top py-2 text-center">
      <span>
        Real<i className="bi bi-incognito"></i>App
      </span>
      <span> &copy; </span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
};
export default Footer;
