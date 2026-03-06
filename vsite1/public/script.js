// DOM Elements
const customersTableBody = document.getElementById('customers-table-body');
const addCustomerBtn = document.getElementById('add-customer-btn');
const customerModal = document.getElementById('customer-modal');
const modalTitle = document.getElementById('modal-title');
const customerForm = document.getElementById('customer-form');
const customerIdInput = document.getElementById('customer-id');
const customerNameInput = document.getElementById('customer-name');
const customerEmailInput = document.getElementById('customer-email');
const customerPhoneInput = document.getElementById('customer-phone');
const closeBtn = document.querySelector('.close');

// Current customer being edited (if any)
let currentCustomer = null;

// Fetch and display customers
async function fetchCustomers() {
    try {
        const response = await fetch('/api/customers');
        const customers = await response.json();
        renderCustomers(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        alert('Failed to load customers');
    }
}

// Render customers in the table
function renderCustomers(customers) {
    customersTableBody.innerHTML = '';

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone || 'N/A'}</td>
            <td>
                <button onclick="editCustomer(${customer.id})">Edit</button>
                <button onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        `;
        customersTableBody.appendChild(row);
    });
}

// Show modal for adding a new customer
function showAddModal() {
    currentCustomer = null;
    modalTitle.textContent = 'Add Customer';
    customerIdInput.value = '';
    customerNameInput.value = '';
    customerEmailInput.value = '';
    customerPhoneInput.value = '';
    customerModal.style.display = 'block';
}

// Show modal for editing a customer
function editCustomer(id) {
    fetch(`/api/customers/${id}`)
        .then(response => response.json())
        .then(customer => {
            currentCustomer = customer;
            modalTitle.textContent = 'Edit Customer';
            customerIdInput.value = customer.id;
            customerNameInput.value = customer.name;
            customerEmailInput.value = customer.email;
            customerPhoneInput.value = customer.phone || '';
            customerModal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching customer:', error);
            alert('Failed to load customer data');
        });
}

// Close modal
function closeModal() {
    customerModal.style.display = 'none';
}

// Handle form submission (add or update)
async function handleFormSubmit(event) {
    event.preventDefault();

    const id = customerIdInput.value ? parseInt(customerIdInput.value) : null;
    const customerData = {
        name: customerNameInput.value,
        email: customerEmailInput.value,
        phone: customerPhoneInput.value
    };

    try {
        let response;
        if (id) {
            // Update existing customer
            response = await fetch(`/api/customers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerData)
            });
        } else {
            // Create new customer
            response = await fetch('/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerData)
            });
        }

        if (response.ok) {
            closeModal();
            fetchCustomers(); // Refresh the list
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Error saving customer:', error);
        alert('Failed to save customer');
    }
}

// Delete a customer
async function deleteCustomer(id) {
    if (!confirm('Are you sure you want to delete this customer?')) {
        return;
    }

    try {
        const response = await fetch(`/api/customers/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchCustomers(); // Refresh the list
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Failed to delete customer');
    }
}

// Event Listeners
addCustomerBtn.addEventListener('click', showAddModal);
closeBtn.addEventListener('click', closeModal);
customerForm.addEventListener('submit', handleFormSubmit);

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === customerModal) {
        closeModal();
    }
});

// Initialize the page
fetchCustomers();