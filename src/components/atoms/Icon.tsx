import React, { ReactNode } from 'react';

interface IconProps {
    icon: ReactNode;
    style?: React.CSSProperties;
    onclick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Icon: React.FC<IconProps> = ({ icon, onclick = () => {}, style = { display: "flex", alignItems: "center", justifyContent: "center", position: "absolute" } }) => {
  return (
    <button style={style} onClick={onclick}>
      {icon}
    </button>
  );
};

export default Icon;
