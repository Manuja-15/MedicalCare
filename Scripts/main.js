function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/MedicalCare/Scripts/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        }, err => {
          console.log('Service Worker registration failed:', err);
        });
    });
  }




  document.addEventListener("DOMContentLoaded", () => {
    // Ensure DOM is fully loaded
    const cartTable = document.getElementById("cart-table").querySelector("tbody");
    const totalPriceEl = document.getElementById("total-price");

    // Verify the elements are accessible
    console.log(cartTable, totalPriceEl);

    // Initialize variables
    let cart = [];

    // Add to cart functionality
    document.getElementById("add-to-cart").addEventListener("click", () => {
        const inputs = document.querySelectorAll("input[type=number]");
        inputs.forEach(input => {
            const qty = parseInt(input.value, 10);
            if (qty > 0) {
                cart.push({
                    medicine: input.parentNode.textContent.trim(),
                    category: input.dataset.category,
                    price: parseFloat(input.dataset.price),
                    quantity: qty,
                    total: parseFloat(input.dataset.price) * qty
                });
            }
        });
        updateCart();
    });

    // Update the cart table
    function updateCart() {
        cartTable.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.total;
            cartTable.innerHTML += `
                <tr>
                    <td>${item.medicine}</td>
                    <td>${item.category}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>${item.total}</td>
                </tr>
            `;
        });
        totalPriceEl.textContent = `$${total.toFixed(2)}`;
    }

    // Save favourites
    document.getElementById("add-to-favourites").addEventListener("click", () => {
        localStorage.setItem("favouriteOrder", JSON.stringify(cart));
        alert("Favourite saved!");
    });

    // Apply favourites
    document.getElementById("apply-favourites").addEventListener("click", () => {
        const favourite = JSON.parse(localStorage.getItem("favouriteOrder"));
        if (favourite) {
            cart = favourite;
            updateCart();
        } else {
            alert("No favourites saved!");
        }
    });

    // Buy Now
    document.getElementById("buy-now").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }
        window.location.href = "checkout.html";
    });


    
});

 // Submit form functionality
 document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const address = document.getElementById("address").value;

        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);

        alert(
            `Thank you for your purchase, ${firstName} ${lastName}!\n\nYour order will be delivered to:\n${address}\n\nExpected delivery date: ${deliveryDate.toDateString()}`
        );
        
        const form = document.getElementById("checkout-form");
        form.reset();
    });
});




