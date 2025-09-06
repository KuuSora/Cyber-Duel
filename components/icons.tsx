import React from 'react';

// FIX: Updated all icon components to accept standard SVG props like `style`.
export const FirewallIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const ServerIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

export const DatabaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7a8 8 0 0116 0" />
  </svg>
);

export const GatewayIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.5 9.5h17M3.5 14.5h17" />
  </svg>
);

export const MailServerIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const DNSServerIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 4.8a9 9 0 118.4 0M12 20.25a9 9 0 01-8.166-5.418" />
  </svg>
);

export const BackupServerIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7H8z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4" />
  </svg>
);

export const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, title, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
    {title && <title>{title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.606 11.955 11.955 0 019 2.606c.342-1.052.555-2.12.555-3.217l-3.376-3.376" />
  </svg>
);

export const SkullIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" {...rest}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0V6zM11.25 14.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" clipRule="evenodd" />
    <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.22 12.03a.75.75 0 011.06 0L12 13.72l1.72-1.69a.75.75 0 111.06 1.06L13.06 14.78l1.72 1.69a.75.75 0 11-1.06 1.06L12 15.84l-1.72 1.69a.75.75 0 01-1.06-1.06L10.94 14.78l-1.72-1.69a.75.75 0 010-1.06z" />
  </svg>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 017.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Action Icons
export const ProbeIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
export const DDoSIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);
export const ExploitIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.5 9.5l2.8-2.8a2 2 0 012.8 0l2.8 2.8M20.5 9.5l-2.8-2.8a2 2 0 00-2.8 0l-2.8 2.8M3.5 14.5l2.8 2.8a2 2 0 002.8 0l2.8-2.8M20.5 14.5l-2.8 2.8a2 2 0 01-2.8 0l-2.8-2.8" /></svg>
);
export const BruteForceIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-12 0v1a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11V9a2 2 0 012-2m0 0a2 2 0 014 0" /></svg>
);
export const PhishingIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.05 5A5 5 0 0119 8.95M15.05 1A9 9 0 0123 8.94m-1 7.98v.01M12 12a2 2 0 100-4 2 2 0 000 4z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
export const WallIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16M8 4v16m8-16v16" /></svg>
);
export const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
);
export const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
);