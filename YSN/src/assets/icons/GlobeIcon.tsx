const GlobeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.6 9h16.8M3.6 15h16.8"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9Z"
    />
  </svg>
);

export default GlobeIcon;
