type WonogiriLogoProps = {
  className?: string;
};

export default function WonogiriLogo({ className }: WonogiriLogoProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 4 31 9v10c0 8-4.5 13.4-11 17-6.5-3.6-11-9-11-17V9l11-5Z"
        fill="#f7f5ef"
        stroke="#39542f"
        strokeWidth="1.4"
      />
      <path d="M20 8.5 27 13v7.5c0 5.5-3 9.3-7 11.9-4-2.6-7-6.4-7-11.9V13l7-4.5Z" fill="#e6c76e" stroke="#212f1c" strokeWidth="0.9" />
      <path d="M14 24.5c2.3-1.8 4.6-2.7 6-2.7s3.7.9 6 2.7" stroke="#39542f" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M15.2 18.6c1.8-.8 3.3-1.2 4.8-1.2s3 .4 4.8 1.2" stroke="#b0623d" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="20" cy="15.8" r="1.8" fill="#8b4226" />
      <path d="M20 11.7v2.4M16.8 13.2l1.6 1.7M23.2 13.2l-1.6 1.7" stroke="#212f1c" strokeWidth="1" strokeLinecap="round" />
      <path d="M10 28h20" stroke="#39542f" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 30.2h16" stroke="#8ba368" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}