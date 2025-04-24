const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
  
    return (
      <div className="flex space-x-0.5 text-yellow-500">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`}>&#9733;</span> // ★
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`}>&#9734;</span> // ☆
        ))}
      </div>
    );
  };
  export default renderStars