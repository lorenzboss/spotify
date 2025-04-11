import { SVGProps } from "react";

export type Artist = {
  id: string;
  name: string;
  images: { url: string }[];
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
