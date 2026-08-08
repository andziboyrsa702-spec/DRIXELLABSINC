import React from 'react';

export const JsonLd: React.FC = () => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Drixel Labs Inc.',
    url: 'https://drixel.co.za',
    logo: 'https://drixel.co.za/logo.png',
    description: 'Drixel Labs Inc. develops purposeful brands, products, and technologies through exceptional design and engineering.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'South Africa',
    },
    sameAs: [
      'https://linkedin.com',
      'https://x.com',
      'https://github.com',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
