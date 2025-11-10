import Script from 'next/script';

export function WebVitals() {
  return (
    <>
      <Script
        id="web-vitals"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if ('PerformanceObserver' in window) {
              const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  // You can send these to analytics
                  console.log(entry.name, entry.value);
                }
              });
              
              observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
            }
          `,
        }}
      />
    </>
  );
}
