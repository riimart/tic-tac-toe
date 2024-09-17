const TotalCard = ({ count, title }) => {
  return (
    <div className="total-card">
      <p className="count">{count}</p>
      <p className="count-title">{title}</p>
    </div>
  );
};

export default TotalCard;
