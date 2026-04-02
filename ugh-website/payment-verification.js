// Payment Verification JS
const API_BASE_URL = ''; // Update to backend URL

let currentOrder = null;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('order');
    
    if (!orderNumber) {
        window.location.href = 'index.html';
        return;
    }
    
    await loadOrderDetails(orderNumber);
    initForm();
});

async function loadOrderDetails(orderNumber) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderNumber}`);
        const result = await response.json();
        
        if (!result.success) {
            showStatus('Order not found', 'error');
            return;
        }
        
        currentOrder = result.data;
        document.getElementById('orderDetails').innerHTML = `
            <p><strong>Order Number:</strong> ${currentOrder.orderNumber}</p>
            <p><strong>Date:</strong> ${new Date(currentOrder.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> Bank Transfer</p>
            <ul>
                ${currentOrder.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join('')}
            </ul>
        `;
        document.getElementById('orderTotal').textContent = formatPrice(currentOrder.total);
        document.getElementById('claimedAmount').setAttribute('max', currentOrder.total);
    } catch (error) {
        showStatus('Error loading order', 'error');
    }
}

function initForm() {
    const form = document.getElementById('verificationForm');
    const fileInput = document.getElementById('proofFile');
    
    fileInput.addEventListener('change', previewFile);
    
    form.addEventListener('submit', handleVerification);
}

function previewFile(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            document.getElementById('filePreview').innerHTML = `
                <img src="${e.target.result}" alt="Preview" class="preview-img">
            `;
        };
        reader.readAsDataURL(file);
    }
}

async function handleVerification(e) {
    e.preventDefault();
    
    if (!currentOrder) return;
    
    const formData = new FormData(e.target);
    formData.append('orderNumber', currentOrder.orderNumber);
    
    const claimedAmount = parseFloat(formData.get('claimedAmount'));
    
    if (claimedAmount !== currentOrder.total) {
        showStatus('Amount must match order total exactly!', 'error');
        return;
    }
    
    try {
        showStatus('Verifying payment...', 'loading');
        
        const response = await fetch(`${API_BASE_URL}/payments/verify/${currentOrder.orderNumber}`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showStatus('Payment verified successfully! Your order is now processing.', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        } else {
            showStatus(result.message || 'Verification failed', 'error');
        }
    } catch (error) {
        showStatus('Error submitting proof', 'error');
    }
}

function showStatus(message, type) {
    const statusEl = document.getElementById('verificationStatus');
    statusEl.innerHTML = `
        <div class="status-message status-${type}">
            ${type === 'loading' ? '<div class="spinner"></div>' : ''} 
            ${message}
        </div>
    `;
}

function formatPrice(amount) {
    return `₦${amount.toLocaleString('en-NG')}`;
}
