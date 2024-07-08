"use strict";

const toggle = document.getElementById("billingToggle");
const monthlyLabel = document.getElementById("monthlyLabel");
const yearlyLabel = document.getElementById("yearlyLabel");
const billingSlider = document.getElementById("billingSlider");
const rangeInput = document.getElementById("pageviews");
const pageviewsDisplay = document.querySelector(".pricing__views");
const priceDisplay = document.querySelector(".pricing__cost");
const pricePeriod = document.querySelector(".pricing__period");

const pricingData = [
  { pageviews: "10K", price: 8 },
  { pageviews: "50K", price: 12 },
  { pageviews: "100K", price: 16 },
  { pageviews: "500K", price: 24 },
  { pageviews: "1M", price: 36 },
];

const updatePricing = () => {
  const value = rangeInput.value - 1;
  const data = pricingData[value];
  let price;
  if (toggle.checked) {
    // Calculate yearly price (12 months with 25% discount)
    price = (data.price * 12 * 0.75).toFixed(2);
    pricePeriod.textContent = " / year";
  } else {
    // Calculate monthly price
    price = data.price.toFixed(2);
    pricePeriod.textContent = " / month";
  }
  pageviewsDisplay.textContent = `${data.pageviews} Pageviews`;
  priceDisplay.textContent = `$${price}`;
};

toggle.checked = false;

monthlyLabel.addEventListener("click", () => {
  if (!toggle.checked) {
    toggle.checked = true;
    updatePricing();
  }
});

yearlyLabel.addEventListener("click", () => {
  if (toggle.checked) {
    toggle.checked = false;
    updatePricing();
  }
});

billingSlider.addEventListener("click", () => {
  toggle.checked = !toggle.checked;
  updatePricing();
});

rangeInput.addEventListener("input", () => {
  updatePricing();
});

updatePricing();

const updateDiscountText = () => {
  const discountText = document.querySelector(".billing__discount-text");
  if (window.innerWidth > 425) {
    discountText.textContent = "25% discount";
  } else {
    discountText.textContent = "-25%";
  }
};

updateDiscountText();

window.addEventListener("resize", updateDiscountText);
