# Header Bidding System Dashboard

A modern, real-time header bidding management system built with React and Prebid.js that helps publishers optimize their ad revenue through programmatic advertising.

## Features

- **Real-time Bid Management**
  - Integration with multiple SSPs (AppNexus, Rubicon, OpenX, PubMatic)
  - Dynamic floor pricing based on ad size and device type
  - Automated bid timeout handling

- **Analytics Dashboard**
  - Real-time bidding metrics
  - Revenue tracking and analysis
  - Bidder performance comparison
  - Customizable time period selection

- **Performance Monitoring**
  - Latency tracking per bidder
  - System health monitoring
  - Error rate analysis
  - Timeout monitoring

- **Advanced Settings**
  - Bidder configuration
  - Custom timeout settings
  - Floor price management
  - Analytics preferences

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Prebid.js
- Google Publisher Tag (GPT)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── services/         # Business logic and API calls
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

## Configuration

The system supports multiple SSP configurations through the Settings page. Default bidders include:
- AppNexus
- Rubicon
- OpenX
- PubMatic

## Best Practices

- Lazy loading of ads for better performance
- Real-time bid monitoring and analytics
- Automatic fallback handling
- Responsive ad unit support