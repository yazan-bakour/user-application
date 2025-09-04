# User Application

This is User happy flow application built with [Next.js](https://nextjs.org/), [React Hook Form](https://react-hook-form.com/), and [NextUI](https://nextui.org/).

## 🚀 Live Demo

[View Live Demo](https://user-application-bice.vercel.app)

## 🔧 API Configuration

### Environment Setup

To connect your own backend API, configure the endpoint URL by creating a `.env.local` file in the project root and adding:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-endpoint.com
```

### Demo Data vs Live API

- **Without API URL**: The application uses demo data for demonstration purposes
- **With API URL**: The application will make real API calls to your configured backend

### API Integration

- **API Models**: Check `types.ts` for all API data models and interfaces
- **API Structure**: Review `useFormData` hook to understand the expected API URL structure and fetch method implementation
- **Endpoints**: The application expects RESTful endpoints that match the data models defined in the types file

### API Requirements

Your backend should implement endpoints that correspond to the data structures defined in `types.ts` and follow the request/response patterns shown in the `useFormData` hook.