document.addEventListener("DOMContentLoaded", () => {
  fetch("food.json")
    .then((response) => response.json())
    .then((data) => {
      const foodList = document.getElementById("food-list");
      data.forEach((food) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.innerHTML = `
                <img src="${food.image}" alt="${food.name}">
                <div class="details">
                    <div class="food-name">
                        <h3>${food.name}</h3>
                        <h3>${food.price}</h3>
                    </div>
                    <div class="food-rate">
                        <div class="rating-time">
                            <div class="rating">
                                ${"★"}${food.rating}
                            </div>
                            <p>${food.time}</p>
                        </div>
                        <div class="quantity-container">
                            <div class="quantity-display">
                                <img src="./img/minus.png" alt="Remove" class="minus" style="display: none;">
                                <span class="quantity" style="display: none;">0</span>
                            </div>
                            <img src="./img/AddCard.png" alt="Add to Cart" class="add-card">
                        </div>
                    </div>
                </div>
                `;
        foodList.appendChild(itemDiv);

        const addCardButton = itemDiv.querySelector(".add-card");
        const quantityDisplay = itemDiv.querySelector(".quantity");
        const minusButton = itemDiv.querySelector(".minus");

        addCardButton.addEventListener("click", () => {
          let quantity = parseInt(quantityDisplay.textContent);
          quantity++;
          quantityDisplay.textContent = quantity;

          if (quantity > 0) {
            addCardButton.src = "./img/add.png";
            minusButton.style.display = "inline";
            quantityDisplay.style.display = "inline";
          }
        });

        minusButton.addEventListener("click", () => {
          let quantity = parseInt(quantityDisplay.textContent);
          if (quantity > 0) {
            quantity--;
            quantityDisplay.textContent = quantity;

            if (quantity === 0) {
              addCardButton.src = "./img/AddCard.png";
              minusButton.style.display = "none";
              quantityDisplay.style.display = "none";
            }
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

document.addEventListener("DOMContentLoaded", () => {
  const foodList = document.getElementById("food-list");
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const wrapper = document.querySelector(".wrapper");
  let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

  const fetchData = async () => {
    try {
      const response = await fetch("food.json");
      const data = await response.json();
      data.forEach((food) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.innerHTML = `
                <img src="${food.image}" alt="${food.name}">
                <div class="details">
                    <div class="food-name">
                        <h3>${food.name}</h3>
                        <h3>${food.price}</h3>
                    </div>
                    <div class="food-rate">
                        <div class="rating-time">
                            <div class="rating">
                                ${"★"}${food.rating}
                            </div>
                            <p>${food.time}</p>
                        </div>
                        <div class="quantity-container">
                            <div class="quantity-display">
                                <img src="./img/minus.png" alt="Remove" class="minus" style="display: none;">
                                <span class="quantity" style="display: none;">0</span>
                            </div>
                            <img src="./img/AddCard.png" alt="Add to Cart" class="add-card">
                        </div>
                    </div>
                </div>
                `;
        carousel.appendChild(itemDiv);

        const addCardButton = itemDiv.querySelector(".add-card");
        const quantityDisplay = itemDiv.querySelector(".quantity");
        const minusButton = itemDiv.querySelector(".minus");

        addCardButton.addEventListener("click", () => {
          let quantity = parseInt(quantityDisplay.textContent);
          quantity++;
          quantityDisplay.textContent = quantity;

          if (quantity > 0) {
            addCardButton.src = "./img/add.png";
            minusButton.style.display = "inline";
            quantityDisplay.style.display = "inline";
          }
        });
        minusButton.addEventListener("click", () => {
          let quantity = parseInt(quantityDisplay.textContent);
          if (quantity > 0) {
            quantity--;
            quantityDisplay.textContent = quantity;

            if (quantity === 0) {
              addCardButton.src = "./img/AddCard.png";
              minusButton.style.display = "none";
              quantityDisplay.style.display = "none";
            }
          }
        });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    const newScrollLeft = startScrollLeft - (e.pageX - startX);
    if (newScrollLeft < 0) {
      carousel.scrollLeft = 0;
    } else if (newScrollLeft > carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
    } else {
      carousel.scrollLeft = newScrollLeft;
    }
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const autoPlay = () => {
    timeoutId = setTimeout(() => {
      carousel.scrollLeft += carousel.clientWidth / 3;
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollLeft = 0;
      }
      autoPlay();
    }, 2500);
  };

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const direction = btn.id === "left" ? -1 : 1;
      carousel.scrollLeft += (direction * carousel.clientWidth) / 3;
      if (btn.id === "left") {
        const leftimg = btn.querySelector("img");
        leftimg.src = "./img/prsbtn2.png";
        setTimeout(() => {
          leftimg.src = "./img/leftbtn.png";
        }, 300);
      } else {
        const rightimg = btn.querySelector("img");
        rightimg.src = "./img/prsbtn1.png";
        setTimeout(() => {
          rightimg.src = "./img/rightbtn.png";
        }, 300);
      }
    });
  });

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  carousel.addEventListener("mouseup", dragStop);
  carousel.addEventListener("mouseleave", dragStop);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  fetchData();
});

document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const modal = document.getElementById("cart-modal");
  const form = document.getElementById("request-a-dish");
  const requestDish = document.getElementById("request-dish");
  const backToMenuButton = document.getElementById("back-to-menu");
  const cancel = document.getElementById("cancelForm");
  const submit = document.getElementById("submitForm");

  cartIcon.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  requestDish.addEventListener("click", () => {
    form.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  backToMenuButton.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });
  cancel.addEventListener("click", () => {
    form.style.display = "none";
    document.body.style.overflow = "auto";
  });
  submit.addEventListener("click", () => {
    form.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
    if (event.target === form) {
      form.style.display = "none";
    }
  });
});

function playVideo() {
  const video = document.querySelector(".video");
  const playButton = document.querySelector(".play");
  if (video.paused) {
    video.play();
    playButton.src = "./img/pause.png";
  } else {
    video.pause();
    playButton.src = "./img/prsbtn1.png";
  }
}
