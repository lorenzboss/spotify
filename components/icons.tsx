import { IconSvgProps } from "@/lib/definitions";

export const Logo = ({ size = 36, ...props }) => (
  <svg fill="none" height={size} viewBox="0 0 32 32" width={size} {...props}>
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const LinkedInIcon = ({ size = 24, ...props }) => {
  return (
    <svg height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GithubIcon = ({ size = 24, ...props }) => {
  return (
    <svg height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({ size = 24, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({ size = 24, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({ size = 24, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = ({ size = 24, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const AvatarIcon = ({ size = 24, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M12.0002 1.25C9.37683 1.25 7.25018 3.37665 7.25018 6C7.25018 8.62335 9.37683 10.75 12.0002 10.75C14.6235 10.75 16.7502 8.62335 16.7502 6C16.7502 3.37665 14.6235 1.25 12.0002 1.25ZM8.75018 6C8.75018 4.20507 10.2053 2.75 12.0002 2.75C13.7951 2.75 15.2502 4.20507 15.2502 6C15.2502 7.79493 13.7951 9.25 12.0002 9.25C10.2053 9.25 8.75018 7.79493 8.75018 6Z"
      fill="#A1A1AA"
    />
    <path
      d="M2.72778 5.8181C2.62732 5.41625 2.22012 5.17193 1.81828 5.27239C1.41643 5.37285 1.17211 5.78006 1.27257 6.1819L1.65454 7.70977C2.3593 10.5288 4.49604 12.7496 7.25018 13.5787L7.25018 18.052C7.25015 18.9505 7.25012 19.6997 7.33009 20.2945C7.41449 20.9223 7.60016 21.4891 8.05563 21.9445C8.5111 22.4 9.0779 22.5857 9.7057 22.6701C10.3005 22.7501 11.0497 22.75 11.9482 22.75H12.0522C12.9507 22.75 13.6999 22.7501 14.2947 22.6701C14.9225 22.5857 15.4892 22.4 15.9447 21.9445C16.4002 21.4891 16.5859 20.9223 16.6703 20.2945C16.7502 19.6997 16.7502 18.9505 16.7502 18.052L16.7502 13.859C17.7313 14.1515 18.4808 15.0039 18.6058 16.0671L19.2553 21.5876C19.3037 21.999 19.6764 22.2933 20.0878 22.2449C20.4992 22.1965 20.7934 21.8237 20.745 21.4124L20.0956 15.8918C19.8512 13.8151 18.0912 12.25 16.0002 12.25H8.0847C5.64125 11.6764 3.71957 9.78523 3.10975 7.34596L2.72778 5.8181ZM8.75018 18V13.75H15.2502V18C15.2502 18.964 15.2486 19.6116 15.1836 20.0946C15.1216 20.5561 15.0144 20.7536 14.8841 20.8839C14.7537 21.0142 14.5562 21.1214 14.0948 21.1835C13.6117 21.2484 12.9642 21.25 12.0002 21.25C11.0362 21.25 10.3886 21.2484 9.90557 21.1835C9.44411 21.1214 9.24661 21.0142 9.11629 20.8839C8.98598 20.7536 8.87875 20.5561 8.81671 20.0946C8.75177 19.6116 8.75018 18.964 8.75018 18Z"
      fill="#A1A1AA"
    />
  </svg>
);

export const MusicIcon = ({ size = 24, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    fill="#A1A1AA"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);
