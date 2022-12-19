const PageHeader = ({ title, description }) => {
  return (
    <div className="mx-auto">
      <h2 className=" my-2 ">{title}</h2>
      <p>{description}</p>
    </div>
  );
};
export default PageHeader;
