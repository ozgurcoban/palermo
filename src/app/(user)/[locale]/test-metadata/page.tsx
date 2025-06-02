import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const metadata = constructMetadata({
    title: "Test Page",
    description: "Testing metadata",
    locale: "sv",
    noIndex: true, // Explicit blockering
  });
  
  console.log('Current environment:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  });
  
  console.log('Robots meta:', metadata.robots);
  
  return metadata;
}

export default function TestPage() {
  return (
    <div className="p-8">
      <h1>Metadata Test Page</h1>
      <p>Check console/terminal for metadata output</p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
        <p><strong>VERCEL_ENV:</strong> {process.env.VERCEL_ENV || 'not set'}</p>
      </div>
    </div>
  );
}