# Two-Factor Authentication (2FA)

Two-factor Authentication enhances security by requiring two types of credentials before granting access. It combines something you know (like a password) and something you have (like your phone). This section covers the generation of a QR Code for setting up 2FA and the process for verifying the authentication code.

## Installation

Before implementing 2FA, ensure you have the necessary packages installed:

```bash
npm install speakeasy qrcode express
```


## QR Code Generation

To set up 2FA, start by generating a QR Code:

**Endpoint**: `GET http://localhost:3000/qrcode`

Use this endpoint to generate a QR Code which needs to be scanned using a two-factor authentication app (such as Google Authenticator). The QR Code contains the necessary information for the app to generate time-based one-time passwords (TOTPs).

## Authentication Code Verification

After setting up 2FA and generating TOTPs, verify these codes through the following endpoint:

**Endpoint**: `POST http://localhost:3000/verify`

This endpoint is used to verify the TOTPs generated by your two-factor authentication app. You need to send the TOTP along with your request to authenticate.

---

Note: Replace `http://localhost:3000` with your actual server address when deploying to production.
