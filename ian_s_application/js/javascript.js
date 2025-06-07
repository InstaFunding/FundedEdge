 

        function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.remove();
    }
}

    function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.remove();
    });
    }
    
    const savedCredentials = JSON.parse(localStorage.getItem('userCredentials'));
if (savedCredentials) {
    console.log('User is already logged in:', savedCredentials.email);
}

    document.getElementById('loginButton').addEventListener('click', function () {
        const loginModal = document.createElement('div');
        loginModal.id = 'loginModal';
        loginModal.classList.add('modal');
        loginModal.innerHTML = `
            <div class="modal-content">
                <span class="close-button" data-modal-id="loginModal">&times;</span>
                <h2>Login / Sign Up</h2>
                <form id="loginForm">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px;">Email</label>
                        <input type="email" name="email" required>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px;">Password</label>
                        <input type="password" name="password" required>
                    </div>
                    <button type="submit">Sign Up / Login</button>
                </form>
            </div>`;
        document.body.appendChild(loginModal);
        loginModal.style.display = 'block';
    
        // Close modal functionality
        loginModal.querySelector('.close-button').addEventListener('click', function () {
            loginModal.style.display = 'none';
            loginModal.remove();
        });
    
        // Handle form submission
        loginModal.querySelector('#loginForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const userData = Object.fromEntries(formData.entries());
    
            // Save user credentials locally
            document.cookie = `sessionToken=${token}; Secure; HttpOnly; SameSite=Strict`;
            alert('You have successfully signed up / logged in!');
            loginModal.style.display = 'none';
            loginModal.remove();
        });
    });

    function validateFile(file) {
        const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
        const maxSize = 5 * 1024 * 1024; // 5 MB
    
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Only PNG, JPEG, and PDF are allowed.');
            return false;
        }
    
        if (file.size > maxSize) {
            alert('File size exceeds the 5 MB limit.');
            return false;
        }
    
        return true;
    }
        
        document.addEventListener('DOMContentLoaded', function() {
            // Theme toggle
            const themeToggle = document.querySelector('.theme-toggle');
            const themeIcon = document.getElementById('themeIcon');
            if (themeToggle && themeIcon) {
                themeToggle.addEventListener('click', function() {
                    document.body.classList.toggle('light-theme');
                    // IMPORTANT: Adjust image paths if your assets folder is not in the same directory as the HTML
                    if (document.body.classList.contains('light-theme')) {
                        themeIcon.src = '../assets/images/img_sun_symbol.png';
                    } else {
                        themeIcon.src = '';
                    }
                });
            }

            // Dropdown functionality
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('.nav-link');
                if (link) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        const content = dropdown.querySelector('.dropdown-content');
                        
                        dropdowns.forEach(d => {
                            if (d !== dropdown) {
                                const otherContent = d.querySelector('.dropdown-content');
                                if (otherContent) otherContent.style.display = 'none';
                            }
                        });

                        if (content) {
                            content.style.display = content.style.display === 'block' ? 'none' : 'block';
                        }
                    });
                }
            });

            document.addEventListener('click', function() {
                dropdowns.forEach(dropdown => {
                    const content = dropdown.querySelector('.dropdown-content');
                    if (content) content.style.display = 'none';
                });
            });

            const getFundedBtn = document.getElementById('getFundedBtn');
            if (getFundedBtn) {
                getFundedBtn.addEventListener('click', function() {
                    alert('Thank you for your interest! Let\'s get you funded. Please select a plan below.');
                    const plansSection = document.querySelector('.plans-section');
                    if (plansSection) plansSection.scrollIntoView({ behavior: 'smooth' });
                });
            }

            const compareAccountsBtn = document.getElementById('compareAccountsBtn');
            if (compareAccountsBtn) {
                compareAccountsBtn.addEventListener('click', function() {
                    alert('Let\'s compare our account options to find the best fit for you.');
                    const plansSection = document.querySelector('.plans-section');
                    if (plansSection) plansSection.scrollIntoView({ behavior: 'smooth' });
                });
            }
            
            let currentPlanData = {};

            function showSignupForm(planName, planCapital, planPrice) {
    currentPlanData = { 
        name: planName, 
        capital: planCapital, 
        basePrice: parseFloat(planPrice.replace('$', '').replace(',', '')) // Handle commas in price
    };
    closeAllModals();

    const formPopup = document.createElement('div');
    formPopup.id = 'signupModal';
    formPopup.classList.add('modal');
    formPopup.innerHTML = `
        <div class="modal-content">
            <span class="close-button" data-modal-id="signupModal">&times;</span>
            <h2>Sign Up for ${planName} Plan (${planCapital})</h2>
            <form id="signupFormInternal">
                <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Full Name</label><input type="text" name="fullName" required></div>
                <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Email</label><input type="email" name="email" required></div>
                <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Password</label><input type="password" name="password" required></div>
                <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Trading Experience</label><select name="experience" required><option value="">Select</option><option value="beginner">Beginner (0-1 years)</option><option value="intermediate">Intermediate (1-3 years)</option><option value="advanced">Advanced (3-5 years)</option><option value="expert">Expert (5+ years)</option></select></div>
                <button type="submit">Continue to Configuration</button>
            </form>
        </div>`;
    document.body.appendChild(formPopup);
    formPopup.style.display = 'block';
    formPopup.querySelector('#signupFormInternal').addEventListener('submit', handleSignupSubmit);
}

function handleSignupSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this);
    currentPlanData.user = Object.fromEntries(formData.entries());
    closeModal('signupModal');
    showPaymentConfigForm(); // Call payment configuration form
}

            let configFormData = new FormData(); // Initialize configFormData

            function handlePaymentConfigSubmit(e) {
    e.preventDefault();
    const configFormData = new FormData(this);
    currentPlanData.configuration = Object.fromEntries(configFormData.entries());
    currentPlanData.configuration.addOns = [];
    if (configFormData.get('addon_payout')) currentPlanData.configuration.addOns.push('Lifetime Payout 95%');
    if (configFormData.get('addon_reward')) currentPlanData.configuration.addOns.push('150% Reward');
    if (configFormData.get('addon_doubleup')) currentPlanData.configuration.addOns.push('Double Up');

    // Calculate final price
    currentPlanData.finalPrice = currentPlanData.basePrice; // Start with base price
if (configFormData.get('swapType') === 'swap-free') currentPlanData.finalPrice += currentPlanData.basePrice * 0.10; // Add 10% for swap-free
if (configFormData.get('addon_payout')) currentPlanData.finalPrice += currentPlanData.basePrice * 0.30; // Add 30% for payout
if (configFormData.get('addon_reward')) currentPlanData.finalPrice += currentPlanData.basePrice * 0.10; // Add 10% for reward
if (configFormData.get('addon_doubleup')) currentPlanData.finalPrice += currentPlanData.basePrice * 0.40; // Add 40% for double-up

    closeModal('paymentConfigModal');
    showCustomPaymentForm(); // Proceed to payment form
}

function showPaymentConfigForm() {
                closeAllModals();
                const paymentModal = document.createElement('div');
                paymentModal.id = 'paymentConfigModal';
                paymentModal.classList.add('modal', 'payment-config-modal');
                paymentModal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-button" data-modal-id="paymentConfigModal">&times;</span>
                        <h2 class="modal-title">Configure Your Plan: <span id="selectedPlanName">${currentPlanData.name}</span></h2>
                        <div class="plan-details-summary">Capital: <span id="selectedPlanCapital">${currentPlanData.capital}</span> | Base Price: $<span id="selectedPlanBasePrice">${currentPlanData.basePrice.toFixed(2)}</span></div>
                        <form id="paymentConfigFormInternal">
                            <div class="form-group"><label>Select Platform:</label><div class="radio-group"><input type="radio" id="mt4" name="platform" value="MT4" checked><label for="mt4">MT4</label><input type="radio" id="mt5" name="platform" value="MT5"><label for="mt5">MT5</label></div></div>
                            <div class="form-group"><label>Select Swap Type:</label><div class="radio-group"><input type="radio" id="swap" name="swapType" value="swap" data-price-modifier="0" checked><label for="swap">Swap</label><input type="radio" id="swap-free" name="swapType" value="swap-free" data-price-modifier="0.10"><label for="swap-free">Swap-Free (Price +10%)</label></div></div>
                            <div class="form-group"><label>Select Add-on(s):</label><div class="checkbox-group"><div><input type="checkbox" id="addon-payout" name="addon_payout" value="payout" data-price-modifier="0.30"><label for="addon-payout">Lifetime Payout 95% (Price +30%)</label></div><div><input type="checkbox" id="addon-reward" name="addon_reward" value="reward" data-price-modifier="0.10"><label for="addon-reward">150% Reward (Price +10%)</label></div><div><input type="checkbox" id="addon-doubleup" name="addon_doubleup" value="doubleup" data-price-modifier="0.40"><label for="addon-doubleup">Double Up (Price +40%)</label></div></div></div>
                            <div class="form-group terms-group"><input type="checkbox" id="agreeTerms" name="agreeTerms" required><label for="agreeTerms">I agree to the <a href="#" target="_blank">Terms of Service</a> & <a href="#" target="_blank">Challenge Terms</a>.</label></div>
                            <div class="payable-amount">Payable Amount: $<span id="totalPayableAmountText">${currentPlanData.basePrice.toFixed(2)}</span></div>
                            <button type="submit" id="proceedToPaymentBtnInternal" class="cta-button" disabled>Proceed to Payment</button>
                        </form>
                    </div>`;
                document.body.appendChild(paymentModal);
                paymentModal.style.display = 'block';
                const form = paymentModal.querySelector('#paymentConfigFormInternal');
                form.querySelectorAll('input[name="swapType"], input[name^="addon_"], #agreeTerms').forEach(input => {
                    input.addEventListener('change', () => calculateAndUpdatePrice(form));
                });
                calculateAndUpdatePrice(form); 
                form.addEventListener('submit', handlePaymentConfigSubmit);
            }

            function calculateAndUpdatePrice(formElement) {
                let finalPrice = currentPlanData.basePrice;
                const swapTypeSelected = formElement.querySelector('input[name="swapType"]:checked');
                if (swapTypeSelected) finalPrice += currentPlanData.basePrice * parseFloat(swapTypeSelected.dataset.priceModifier); // Changed to additive for percentage
                
                formElement.querySelectorAll('input[name^="addon_"]:checked').forEach(addon => {
                     finalPrice += currentPlanData.basePrice * parseFloat(addon.dataset.priceModifier); // Changed to additive for percentage
                });
                document.getElementById('totalPayableAmountText').textContent = finalPrice.toFixed(2);
                currentPlanData.finalPrice = finalPrice;
                formElement.querySelector('#proceedToPaymentBtnInternal').disabled = !formElement.querySelector('#agreeTerms').checked;
            }


             
            // PAYMENT CONFIGURATION
          const PAYMENT_CONFIG = {
          businessName: "FundedEdge Trading",
          currency: "USD",
          cardPatterns: {
          visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
          mastercard: /^5[1-5][0-9]{14}$/,
          amex: /^3[47][0-9]{13}$/,
          discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
    }
};


// Custom Payment Form
function showCustomPaymentForm() {
    closeAllModals();
    const paymentModal = document.createElement('div');
    paymentModal.id = 'customPaymentModal';
    paymentModal.classList.add('modal', 'payment-modal');
    paymentModal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" data-modal-id="customPaymentModal">&times;</span>
            <h2>Complete Your Payment</h2>
            <div class="payment-summary">
                <h3>${currentPlanData.name}</h3>
                <p>Total: <span id="payableAmountText">$${currentPlanData.finalPrice.toFixed(2)}</span></p>
                <div class="currency-selection">
                    <label for="currencySelect">Select Currency:</label>
                    <select id="currencySelect">
                        <option value="USD" selected>USD</option>
                        <option value="UGX">UGX</option>
                        <option value="KSH">KSH</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="ZAR">Rand (ZAR)</option>
                        <option value="GBP">GBP (£)</option>
                    </select>
                </div>
            </div>
            <div class="payment-methods">
                <h3>Select Payment Method</h3>
                <div class="payment-method-tabs">
                    <button class="tab-button active" data-method="card">Credit/Debit Card</button>
                    <button class="tab-button" data-method="crypto">Cryptocurrency</button>
                    <button class="tab-button" data-method="bank">Bank Transfer</button>
                    <button class="tab-button" data-method="mobile">Mobile Money</button>
                </div>
            </div>
           <div id="card-payment" class="payment-form active">
    <div class="blur-banner">Coming Soon</div>
    <form id="cardPaymentForm">
        <div class="form-row">
            <div class="form-group">
                <label>Card Number</label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required>
                <div class="card-type-indicator" id="cardTypeIndicator"></div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group half">
                <label>Expiry Date</label>
                <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5" required>
            </div>
            <div class="form-group half">
                <label>CVV</label>
                <input type="text" id="cvv" placeholder="123" maxlength="4" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Cardholder Name</label>
                <input type="text" id="cardholderName" placeholder="John Doe" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <input type="checkbox" id="saveCard" name="saveCard">
                <label for="saveCard">Save card for future payments</label>
            </div>
        </div>
        <button type="submit" class="pay-button">Pay $${currentPlanData.finalPrice.toFixed(2)}</button>
    </form>
</div>
            <div id="crypto-payment" class="payment-form">
    <div class="crypto-options">
        <h4>Select Cryptocurrency</h4>
        <div class="crypto-buttons">
            <button class="crypto-btn" data-crypto="bitcoin">₿ Bitcoin (BTC)</button>
            <button class="crypto-btn" data-crypto="litecoin">Ł Litecoin (LTC)</button>
            <button class="crypto-btn" data-crypto="usdt">₮ Tether (USDT)</button>
        </div>
    </div>
    <div id="crypto-details" style="display: none;">
        <h4>Payment Details</h4>
        <p><strong>Address:</strong> <span id="cryptoAddress"></span></p>
        <p><strong>Amount:</strong> <span id="cryptoAmount"></span></p>
        <div id="qrCode"></div>
        <button id="verifyPaymentBtn">I've Sent the Payment</button>
    </div>
</div>
            <div id="bank-payment" class="payment-form">
                <div class="blur-banner">Coming Soon</div>
                <div class="bank-details">
                    <h4>Bank Transfer Details</h4>
                    <div class="bank-info">
                        <p><strong>Bank Name:</strong> Your Business Bank</p>
                        <p><strong>Account Name:</strong> FundedEdge Trading Ltd</p>
                        <p><strong>Account Number:</strong> 1234567890</p>
                        <p><strong>Routing Number:</strong> 123456789</p>
                        <p><strong>SWIFT Code:</strong> ABCDUS33</p>
                        <p><strong>Reference:</strong> <span id="bankReference"></span></p>
                    </div>
                    <div class="upload-proof">
                        <h4>Upload Payment Proof</h4>
                        <input type="file" id="proofUpload" accept="image/*,.pdf">
                        <button onclick="submitBankTransfer()">Submit Transfer Proof</button>
                    </div>
                </div>
            </div>
            <div id="mobile-payment" class="payment-form">
                <div class="blur-banner">Coming Soon</div>
                <div class="mobile-money-options">
                    <h4>Select Mobile Money Provider</h4>
                    <div class="mobile-providers">
                        <button class="provider-btn" data-provider="mtn">MTN Mobile Money</button>
                        <button class="provider-btn" data-provider="airtel">Airtel Money</button>
                        <button class="provider-btn" data-provider="vodacom">Vodacom M-Pesa</button>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.appendChild(paymentModal);
    paymentModal.style.display = 'block';
    initializePaymentForm(); // Initialize form functionality

    // Add event listener for currency selection
    const currencySelect = document.getElementById('currencySelect');
    currencySelect.addEventListener('change', updateCurrency);
}

function updateCurrency() {
    const currencySelect = document.getElementById('currencySelect');
    const payableAmountText = document.getElementById('payableAmountText');
    const payButtonAmount = document.getElementById('payButtonAmount');

    const selectedCurrency = currencySelect.value;
    let convertedAmount;

    if (selectedCurrency === 'USD') {
        convertedAmount = currentPlanData.finalPrice; // Keep the amount in USD
        payableAmountText.textContent = `$${convertedAmount.toFixed(2)}`;
        payButtonAmount.textContent = `$${convertedAmount.toFixed(2)}`;
    } else if (selectedCurrency === 'UGX') {
        const conversionRate = 3638.61; // USD to UGX conversion rate
        convertedAmount = currentPlanData.finalPrice * conversionRate; // Convert to UGX
        payableAmountText.textContent = `${convertedAmount.toFixed(2)} UGX`;
        payButtonAmount.textContent = `${convertedAmount.toFixed(2)} UGX`;
    } else if (selectedCurrency === 'KSH') {
        const conversionRate = 129.25; // USD to KSH conversion rate
        convertedAmount = currentPlanData.finalPrice * conversionRate; // Convert to KSH
        payableAmountText.textContent = `${convertedAmount.toFixed(2)} KSH`;
        payButtonAmount.textContent = `${convertedAmount.toFixed(2)} KSH`;
    } else if (selectedCurrency === 'EUR') {
        const conversionRate = 0.88; // USD to Euro conversion rate
        convertedAmount = currentPlanData.finalPrice * conversionRate; // Convert to Euro
        payableAmountText.textContent = `€${convertedAmount.toFixed(2)}`;
        payButtonAmount.textContent = `€${convertedAmount.toFixed(2)}`;
    } else if (selectedCurrency === 'ZAR') {
        const conversionRate = 17.87; // USD to Rand conversion rate
        convertedAmount = currentPlanData.finalPrice * conversionRate; // Convert to Rand
        payableAmountText.textContent = `${convertedAmount.toFixed(2)} ZAR`;
        payButtonAmount.textContent = `${convertedAmount.toFixed(2)} ZAR`;
    } else if (selectedCurrency === 'GBP') {
        const conversionRate = 0.74; // USD to GBP conversion rate
        convertedAmount = currentPlanData.finalPrice * conversionRate; // Convert to GBP
        payableAmountText.textContent = `£${convertedAmount.toFixed(2)}`;
        payButtonAmount.textContent = `£${convertedAmount.toFixed(2)}`;
    }
}
// Initialize payment form functionality
function initializePaymentForm() {
    // Tab switching
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.payment-form').forEach(f => f.classList.remove('active'));
            e.target.classList.add('active');
            const method = e.target.dataset.method;
            document.getElementById(`${method}-payment`).classList.add('active');
        });
    });

    // Card number formatting and validation
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.addEventListener('input', formatCardNumber);
    cardNumber.addEventListener('input', detectCardType);

    // Expiry date formatting
    const expiryDate = document.getElementById('expiryDate');
    expiryDate.addEventListener('input', formatExpiryDate);

    // CVV validation
    const cvv = document.getElementById('cvv');
    cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Form submission for card payment
    document.getElementById('cardPaymentForm').addEventListener('submit', handleCardPayment);

    // Crypto payment setup
    document.querySelectorAll('.crypto-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const crypto = e.currentTarget.dataset.crypto;
        showCryptoPaymentDetails(crypto);
    });
});

    // Mobile money setup
    document.querySelectorAll('.provider-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const provider = e.currentTarget.dataset.provider;
            showMobilePaymentDetails(provider);
        });
    });

    // Generate bank reference
    const bankRef = 'BANK_' + Date.now().toString().slice(-8);
    document.getElementById('bankReference').textContent = bankRef;
}

// Card number formatting function
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    e.target.value = formattedValue;
}

// Detect card type function
function detectCardType(e) {
    const value = e.target.value.replace(/\s/g, '');
    const indicator = document.getElementById('cardTypeIndicator');
    for (const [type, pattern] of Object.entries(PAYMENT_CONFIG.cardPatterns)) {
        if (pattern.test(value)) {
            indicator.textContent = type.toUpperCase();
            indicator.className = `card-type-indicator ${type}`;
            return;
        }
    }
    indicator.textContent = '';
    indicator.className = 'card-type-indicator';
}

// Format expiry date function
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
}

// Handle card payment
async function handleCardPayment(e) {
    e.preventDefault();
    const selectedCurrency = document.getElementById('currencySelect').value;
    const cardData = {
        number: document.getElementById('cardNumber').value.replace(/\s/g, ''),
        expiry: document.getElementById('expiryDate').value,
        cvv: document.getElementById('cvv').value,
        name: document.getElementById('cardholderName').value,
        currency: selectedCurrency // Include selected currency
    };

    // Basic validation
    if (!validateCard(cardData)) {
        showError('Please check your card details');
        return;
    }

    // Show processing
    showProcessing();
    try {
        // Simulate payment processing
        const result = await processCardPayment(cardData);
        if (result.success) {
            handlePaymentSuccess(result);
        } else {
            showError(result.message || 'Payment failed');
        }
    } catch (error) {
        showError('Payment processing error: ' + error.message);
    }
}

// Validate card details
function validateCard(cardData) {
    const cardValid = Object.values(PAYMENT_CONFIG.cardPatterns).some(pattern => pattern.test(cardData.number));
    const expiryValid = /^\d{2}\/\d{2}$/.test(cardData.expiry);
    const [month, year] = cardData.expiry.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const now = new Date();
    const notExpired = expiryDate > now;
    const cvvValid = /^\d{3,4}$/.test(cardData.cvv);
    const nameValid = cardData.name.trim().length > 2;
    return cardValid && expiryValid && notExpired && cvvValid && nameValid;
}

// Process card payment (simulation)
async function processCardPayment(cardData) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const lastDigit = parseInt(cardData.number.slice(-1));
    if (lastDigit % 2 === 0) {
        return { success: true, transactionId: 'TXN_' + Date.now(), message: 'Payment successful' };
    } else {
        return { success: false, message: 'Payment declined by bank' };
    }
}

function showCryptoPaymentDetails(cryptoType) {
    const addresses = {
        bitcoin: '1KQp9rDfDi95Wom9urtKRYf5TBaKECpKvg',
        litecoin: 'LP1rv4LUnGSWwXikPevGt5XFxmDEkmCSK2',
        usdt: 'TU6oQumHcAyAsgzxynz7N9gmd9Ppx4rMrg'
    };
    const rates = {
        bitcoin: 0.0000095, // USD to BTC conversion rate
        litecoin: 0.011,    // USD to LTC conversion rate
        usdt: 1.00          // USD to USDT conversion rate
    };
    const address = addresses[cryptoType];
    const rate = rates[cryptoType];
    const amount = (currentPlanData.finalPrice * rate).toFixed(8);

    // Update wallet details
    document.getElementById('cryptoAddress').textContent = address;
    document.getElementById('cryptoAmount').textContent = `${amount} ${cryptoType.toUpperCase()}`;

    // Generate QR code using the `QRCode` constructor
    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code
    new QRCode(qrCodeContainer, {
        text: address,
        width: 128,
        height: 128
    });

    // Update the QR section layout
    const cryptoDetails = document.getElementById('crypto-details');
    cryptoDetails.innerHTML = `
        <div class="qr-section">
            <h4>Scan the QR Code to Pay</h4>
            <div class="qr-code-container" id="qrCode"></div>
            <p class="payment-address"><strong>Address:</strong> ${address}</p>
            <p class="amount-crypto"><strong>Amount:</strong> ${amount} ${cryptoType.toUpperCase()}</p>
            <button id="verifyPaymentBtn">I've Sent the Payment</button>
        </div>
    `;

    // Bind the verification function to the "I've Sent the Payment" button
    const verifyPaymentBtn = document.getElementById('verifyPaymentBtn');
    if (verifyPaymentBtn) {
        verifyPaymentBtn.addEventListener('click', verifyCryptoPayment);
    }

    cryptoDetails.style.display = 'block';
}

// Function to copy the address to the clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Address copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Show mobile payment details
function showMobilePaymentDetails(provider) {
    const providerInfo = { mtn: 'MTN Mobile Money', airtel: 'Airtel Money', vodacom: 'Vodacom M-Pesa' };
    document.getElementById('mobile-details').style.display = 'block';
    document.getElementById('mobilePaymentForm').onsubmit = (e) => {
        e.preventDefault();
        const phoneNumber = document.getElementById('mobileNumber').value;
        processMobilePayment(provider, phoneNumber);
    };
}

// Process mobile payment
async function processMobilePayment(provider, phoneNumber) {
    showProcessing();
    await new Promise(resolve => setTimeout(resolve, 3000));
    const result = { success: true, transactionId: 'MOBILE_' + Date.now(), method: provider };
    handlePaymentSuccess(result);
}

function verifyCryptoPayment() {
    const coinType = prompt("Enter cryptocurrency type (BTC, LTC, USDT):").toUpperCase();
    const txHash = prompt("Please enter the transaction hash from your crypto wallet:");

    if (!coinType || !txHash) {
        alert("Both coin type and transaction hash are required.");
        return;
    }

    if (!isValidTxHash(txHash, coinType)) {
        alert("Invalid transaction hash for " + coinType + ".");
        return;
    }

    showProcessing();
    setTimeout(() => {
        const result = {
            success: true,
            transactionId: txHash,
            method: `Cryptocurrency (${coinType})`
        };
        handlePaymentSuccess(result);
    }, 2000);
}

// Helper function to validate based on coin type
function isValidTxHash(txHash, coinType) {
    const patterns = {
        BTC: /^[A-Fa-f0-9]{64}$/,        // Bitcoin
        LTC: /^[A-Fa-f0-9]{64}$/,        // Litecoin (same format)
        USDT: /^0x[a-fA-F0-9]{64}$/      // Tether (on Ethereum)
    };

    const regex = patterns[coinType];
    return regex ? regex.test(txHash) : false;
}


// Submit bank transfer
function submitBankTransfer() {
    const fileInput = document.getElementById('proofUpload');
if (!validateFile(fileInput.files[0])) {
    return;
}
    showProcessing();
    setTimeout(() => {
        const result = { success: true, transactionId: 'BANK_' + Date.now(), method: 'Bank Transfer' };
        handlePaymentSuccess(result);
    }, 2000);
}

function handlePaymentSuccess(result) {
    hideProcessing();
    closeModal('customPaymentModal');
    const completedPayment = {
        name: currentPlanData.name,
        capital: currentPlanData.capital,
        finalPrice: typeof currentPlanData.finalPrice === 'number' ? currentPlanData.finalPrice.toFixed(2) : '0.00',
        transactionId: result.transactionId,
        paymentMethod: result.method || 'Credit Card',
        userEmail: currentPlanData.user.email,
        userName: currentPlanData.user.fullName,
        applicationTimestamp: new Date().toISOString(),
        paymentStatus: 'Completed'
    };

    // Save payment data locally
    let allUserData = JSON.parse(localStorage.getItem('fundedEdgeApplications') || '[]');
    allUserData.push(completedPayment);
    localStorage.setItem('fundedEdgeApplications', JSON.stringify(allUserData));

    // Send data to webhook
    sendToWebhook(completedPayment);

    // Show success modal
    showSuccessModal(completedPayment);
    currentPlanData = {};
}

function sendToWebhook(paymentData) {
    const webhookUrl = "https://hook.eu2.make.com/45wo0urbhv7xwv45fl345r53rf827xbj";
    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => {
        if (response.ok) {
            console.log("Data successfully sent to webhook");
        } else {
            console.error("Failed to send data to webhook", response.statusText);
        }
    })
    .catch(error => {
        console.error("Error sending data to webhook:", error);
    });
}

// Utility functions
function showProcessing() {
    const processing = document.createElement('div');
    processing.id = 'processingOverlay';
    processing.innerHTML = `
        <div class="processing-content">
            <div class="spinner"></div>
            <h3>Processing Payment...</h3>
            <p>Please wait while we process your payment</p>
        </div>`;
    processing.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); 
        display: flex; align-items: center; justify-content: center; z-index: 10000; color: white; text-align: center;`;
    document.body.appendChild(processing);
}

function hideProcessing() {
    const processing = document.getElementById('processingOverlay');
    if (processing) processing.remove();
}

function showError(message) {
    hideProcessing();
    alert('Error: ' + message);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[0-9]{10,15}$/; // Adjust based on your requirements
    return phoneRegex.test(phoneNumber);
}

function showSuccessModal(paymentData) {
    console.log('paymentData.finalPrice:', paymentData.finalPrice);
    const successModal = document.createElement('div');
    successModal.id = 'successModal';
    successModal.classList.add('modal');
    successModal.innerHTML = `
        <div class="modal-content success-content">
            <div class="success-icon">✓</div>
            <h2>Payment Successful!</h2>
            <div class="success-details">
                <p><strong>Plan:</strong> ${paymentData.name}</p>
                
                <p><strong>Amount:</strong> $${paymentData.finalPrice.toFixed(2)}</p>
                <p><strong>Transaction ID:</strong> ${paymentData.transactionId}</p>
                <p><strong>Payment Method:</strong> ${paymentData.paymentMethod}</p>
            </div>
            <button onclick="closeModal('successModal')" class="cta-button">Continue</button>
        </div>`;
    document.body.appendChild(successModal);
    successModal.style.display = 'block';
}
            

            // JS for NEW div-based plans table
            document.querySelectorAll('.get-plan-button').forEach((button, buttonIndex) => {
    button.addEventListener('click', function () {
        // Find the header row to get all plan names
        const headerRow = document.querySelector('.plans-table .table-header');
        const planNameCells = headerRow.querySelectorAll('.table-cell.plan-name');

        // Find the capital row and fee row
        const allRows = Array.from(document.querySelectorAll('.plans-table .table-row'));
        let capitalRowElement = null;
        let feeRowElement = null;

        allRows.forEach(row => {
            const firstCellText = row.querySelector('.table-cell-first').textContent.trim().toLowerCase();
            if (firstCellText.startsWith('capital')) {
                capitalRowElement = row;
            } else if (firstCellText.startsWith('fee(usd)')) {
                feeRowElement = row;
            }
        });

        if (planNameCells.length > buttonIndex && capitalRowElement && feeRowElement) {
            const planName = planNameCells[buttonIndex].textContent.trim();
            const capitalCells = capitalRowElement.querySelectorAll('.table-cell.plan-capital');
            const feeCells = feeRowElement.querySelectorAll('.table-cell.plan-price');

            if (capitalCells.length > buttonIndex && feeCells.length > buttonIndex) {
                const planCapital = capitalCells[buttonIndex].textContent.trim();
                const planPrice = feeCells[buttonIndex].textContent.trim();
                showSignupForm(planName, planCapital, planPrice);
            } else {
                console.error('Could not find capital or price cell for button index:', buttonIndex);
            }
        } else {
            console.error('Could not find plan name, capital row, or fee row for button index:', buttonIndex, planNameCells.length, capitalRowElement, feeRowElement);
        }
    });
});


            const chatPopupHTML = `
                <div id="liveChatPopup" class="modal" style="padding-top:0; bottom: 0; top: auto; left: auto; right: 20px; width: 350px; height:auto; max-height: 80vh;">
                    <div class="modal-content" style="margin: 0; height:100%; border-radius:10px 10px 0 0; padding:15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;"><h3 style="margin:0;">Live Support</h3><span class="close-button" data-modal-id="liveChatPopup">&times;</span></div>
                        <div id="chatBox" style="height: 300px; overflow-y: auto; background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-bottom: 10px; border: 1px solid #ccc;"><p style="color: #333;"><strong>Support Agent:</strong> Hello! How can I help you today?</p></div>
                        <div style="display: flex;"><input type="text" id="chatInput" placeholder="Type your message..." style="flex: 1; border-radius: 5px 0 0 5px; margin-bottom:0;"><button id="sendChatBtn" style="padding: 10px 15px; border-radius: 0 5px 5px 0; margin-top:0; width:auto;">Send</button></div>
                    </div>
                </div>`;

            function openChat() {
                closeAllModals();
                document.body.insertAdjacentHTML('beforeend', chatPopupHTML);
                const chatPopupNode = document.getElementById('liveChatPopup');
                chatPopupNode.style.display = 'block';
                document.getElementById('sendChatBtn').addEventListener('click', sendChatMessage);
                document.getElementById('chatInput').addEventListener('keypress', e => e.key === 'Enter' && sendChatMessage());
            }

            function sendChatMessage() {
                const input = document.getElementById('chatInput'); const message = input.value.trim(); const chatBox = document.getElementById('chatBox');
                if (message && chatBox) {
                    chatBox.innerHTML += `<p style="color: #333; text-align: right;"><strong>You:</strong>${sanitizeInput(message)}</p>`; input.value = ''; chatBox.scrollTop = chatBox.scrollHeight;
                    setTimeout(() => { chatBox.innerHTML += '<p style="color: #333;"><strong>Support Agent:</strong> Thanks for your message! We will get back to you shortly.</p>'; chatBox.scrollTop = chatBox.scrollHeight; }, 1000);
                }
            }

            const floatingChatIcon = document.getElementById('floatingChatIcon');
            if (floatingChatIcon) floatingChatIcon.addEventListener('click', openChat);
            
            const talkToSupportCtaBtn = document.getElementById('talkToSupportCtaBtn');
            if (talkToSupportCtaBtn) talkToSupportCtaBtn.addEventListener('click', openChat);

            const paymentProvidersContainer = document.querySelector('.payment-providers-container');
            const paymentProviders = document.querySelector('.payment-providers');
            if (paymentProvidersContainer && paymentProviders) {
                paymentProviders.style.animationPlayState = 'running'; 
                paymentProvidersContainer.addEventListener('mouseenter', () => paymentProviders.style.animationPlayState = 'paused');
                paymentProvidersContainer.addEventListener('mouseleave', () => paymentProviders.style.animationPlayState = 'running');
            }

            document.body.addEventListener('click', function(event) {
                if (event.target.classList.contains('close-button') && event.target.dataset.modalId) {
                    closeModal(event.target.dataset.modalId);
                }
            });
            document.getElementById('contactUsCtaBtn').addEventListener('click', function () {
    const contactFormModal = document.createElement('div');
    contactFormModal.id = 'contactFormModal';
    contactFormModal.classList.add('modal');
    contactFormModal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" data-modal-id="contactFormModal">&times;</span>
            <h2>Contact Us</h2>
            <form id="contactForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">Full Name</label>
                    <input type="text" name="fullName" required>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">Email</label>
                    <input type="email" name="email" required>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">Message</label>
                    <textarea name="message" rows="5" required></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>`;
    document.body.appendChild(contactFormModal);
    contactFormModal.style.display = 'block';

    // Close modal functionality
    contactFormModal.querySelector('.close-button').addEventListener('click', function () {
        contactFormModal.style.display = 'none';
        contactFormModal.remove();
    });

    
    // Handle form submission
    contactFormModal.querySelector('#contactForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you shortly.');
        contactFormModal.style.display = 'none';
        contactFormModal.remove();
    });
}) });

    