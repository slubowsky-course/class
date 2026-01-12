import type { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  //children: string[];
  style: React.CSSProperties
}

export default function Header(props: HeaderProps) {
  return (
    <header style={props.style}>
        {props.children}
    </header>
  )
}
