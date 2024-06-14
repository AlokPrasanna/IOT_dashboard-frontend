import React, { ReactNode } from 'react';

interface IconProps {
    icon: ReactNode;
    style?: React.CSSProperties;
    onclick: () => void;
}

const Icon:React.FC<IconProps> = ({icon , onclick , style}) => {
  return (
    <button style={style} onClick={onclick}>
      {icon}
    </button>
  )
}

export default Icon
