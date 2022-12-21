const Input = ({ type, label, name, error, ...rest }) => {
  return (
    <>
      <div className="form-floating mb-3">
        <input
          {...rest}
          type={type}
          name={name}
          className={["form-control", error && "is-invalid"]
            .filter(Boolean)
            .join(" ")}
          id={name}
          placeholder="name@example.com"
        />
        <label htmlFor={name}>{label}</label>
        <span style={{ color: "red" }}>{error}</span>
      </div>
    </>
  );
};
export default Input;
