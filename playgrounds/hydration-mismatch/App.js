import React, { useEffect, useState } from 'react';

export const FONT_DELAY_MS = 700;
export const HYDRATION_DELAY_MS = 4000;

function formatTime() {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());
}

export function App() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const renderedAt = formatTime();

  useEffect(() => {
    performance.mark('repro-hydration-complete');
    setHasHydrated(true);
  }, []);

  return React.createElement(
    'main',
    null,
    React.createElement(
      'section',
      null,
      React.createElement(
        'p',
        { className: 'repro-kicker' },
        'Intentionally broken React hydration',
      ),
      React.createElement(
        'h1',
        { className: 'repro-lcp' },
        `Current time: ${renderedAt}`,
      ),
    ),
    React.createElement(
      'aside',
      { className: 'repro-panel' },
      React.createElement(
        'p',
        null,
        React.createElement(
          'span',
          {
            className: 'repro-status',
            'data-hydrated': hasHydrated,
          },
          hasHydrated ? 'Hydration complete' : 'Waiting to hydrate',
        ),
        ` React hydration is delayed by ${HYDRATION_DELAY_MS / 1000} seconds.`,
      ),
      React.createElement(
        'p',
        null,
        'In Chrome DevTools, start a Performance recording, reload this page, wait for the green status, and stop. Save the trace and search it for ',
        React.createElement('code', null, 'LargestContentfulPaint::Candidate'),
        '.',
      ),
      React.createElement(
        'p',
        null,
        `The heading first paints in Arial. After ${FONT_DELAY_MS} ms, the playground swaps in a larger serif font. Hydration then renders a different time, causing React to remount this DOM and submit the larger heading as a new LCP candidate.`,
      ),
    ),
  );
}
