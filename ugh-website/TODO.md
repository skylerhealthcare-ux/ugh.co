# Payment Verification & Auth Integration TODO

## Approved Plan Steps (Sequential)

### Phase 1: Backend Updates
- [x] **1.1** Update `ugh-website/server/models/Order.js`: Add `claimedAmount`, `proofUrl`, `proofFileName`, `deliveryNote` fields. Add `uploadProof()` method.

- [ ] **1.3** Update `ugh-website/server/routes/api.js`: 
  - In POST `/orders`: Send confirmation email after save.
  - New POST `/api/payments/verify/:orderNumber`: Multer file upload, validate amount==total, save proof, update status='verified', send emails.
  - Extend `/customers`: Add login flow (send login OTP), verify-login endpoint.
- [ ] **1.4** Update `ugh-website/server/services/emailService.js`: Add `sendPaymentVerificationEmail(order)`, `sendLoginConfirmationEmail(customer)`.

### Phase 2: Frontend Auth (Required for Checkout)
- [ ] **2.1** Update `ugh-website/app.js`: Add `loginCustomer(email)`, `verifyOTP(email, otp)`, `isLoggedIn()` (localStorage token).
- [ ] **2.2** Update `ugh-website/product.html` & `ugh-website/index.html`: Add login/signup modals (email → OTP), require login before checkout.

### Phase 3: Payment Verification Flow

- [ ] **3.2** Update `ugh-website/app.js`: In checkout submit → POST `/api/orders` → if bank_transfer, redirect `payment-verification.html?order=ORDER_NUMBER`.
- [ ] **3.3** Update `ugh-website/styles.css`: Styles for auth modals, verification page.

### Phase 4: Integration & Testing
- [ ] **4.1** Update server.js: Add multer config if needed globally.
- [ ] **4.2** Test full flow: Signup/login → checkout → order → verification upload → status update → emails.
- [ ] **4.3** Update TODO.md: Mark complete → attempt_completion.


