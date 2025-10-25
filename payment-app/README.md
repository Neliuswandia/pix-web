# PixWeb Payment App

This is a separate Next.js application that handles the payment interface for PixWeb images.

## Features

- Blurred image preview
- Payment modal with secure checkout
- Support for individual images and collections
- Multiple payment methods (M-Pesa, Airtel Money, Credit Card, Bank Transfer)
- Real-time payment processing simulation
- Full resolution image access after payment

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The app will run on http://localhost:3001 (different port from main app)

## Routes

- `/` - Single image payment page (use ?id=1&collection=abc123 parameters)
- `/collection/[id]` - Collection payment page for multiple images

## Usage

### For Single Images:
- Visit: `http://localhost:3001/?id=1&collection=abc123`
- Shows blurred image with payment modal
- After payment, image becomes unblurred

### For Collections:
- Visit: `http://localhost:3001/collection/abc123`
- Shows grid of blurred images
- Users can select multiple images
- Batch payment for selected images

## Integration with Main App

The main PixWeb app should generate links like:
- Single image: `http://localhost:3001/?id={imageId}&collection={collectionId}`
- Collection: `http://localhost:3001/collection/{collectionId}`

## Payment Methods

Currently supports:
- M-Pesa
- Airtel Money  
- Credit Card
- Bank Transfer

## Security

- All payments are processed securely
- Image access is controlled until payment completion
- Blurred previews protect premium content
