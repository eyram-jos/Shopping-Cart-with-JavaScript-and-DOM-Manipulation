document.addEventListener('DOMContentLoaded', () => {
  const plusButtons = document.querySelectorAll('.fa-plus-circle');
  const minusButtons = document.querySelectorAll('.fa-minus-circle');
  const deleteButtons = document.querySelectorAll('.fa-trash-alt');
  const likeButtons = document.querySelectorAll('.fa-heart');
  const totalElement = document.querySelector('.total');

  function adjustQuantity(event) {
      const button = event.target;
      const quantityElement = button.parentElement.querySelector('.quantity');
      let currentQuantity = parseInt(quantityElement.textContent);

      if (button.classList.contains('fa-plus-circle')) {
          currentQuantity += 1;
      } else if (button.classList.contains('fa-minus-circle') && currentQuantity > 0) {
          currentQuantity -= 1;
      }

      quantityElement.textContent = currentQuantity;
      updateTotal();
  }

  function deleteItem(event) {
      const button = event.target;
      const itemCard = button.closest('.card-body');

      if (confirm('Are you sure you want to remove this item?')) {
          itemCard.remove();
          updateTotal();
      }
  }

  function updateTotal() {
      let totalPrice = 0;
      const unitPrices = document.querySelectorAll('.unit-price');
      const quantities = document.querySelectorAll('.quantity');

      unitPrices.forEach((unitPrice, index) => {
          const price = parseInt(unitPrice.textContent.replace('$', '').trim());
          const quantity = parseInt(quantities[index].textContent);
          totalPrice += price * quantity;
      });

      totalElement.textContent = totalPrice + ' $';
  }

  function toggleHeartColor(event) {
      const heart = event.target;
      heart.classList.toggle('liked');
  }

  plusButtons.forEach(button => {
      button.addEventListener('click', adjustQuantity);
  });

  minusButtons.forEach(button => {
      button.addEventListener('click', adjustQuantity);
  });

  deleteButtons.forEach(button => {
      button.addEventListener('click', deleteItem);
  });

  likeButtons.forEach(button => {
      button.addEventListener('click', toggleHeartColor);
  });

  updateTotal();
});
