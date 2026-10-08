document.addEventListener("DOMContentLoaded", () => {
  const reviewCountElement = document.getElementById("review-count");
  
  if (reviewCountElement) {
    let reviewCount = localStorage.getItem("reviewCount");
    
    if (!reviewCount) {
      reviewCount = 0;
    }
    
    reviewCount = parseInt(reviewCount) + 1;
    localStorage.setItem("reviewCount", reviewCount);
    
    reviewCountElement.textContent = reviewCount;
  }
});
