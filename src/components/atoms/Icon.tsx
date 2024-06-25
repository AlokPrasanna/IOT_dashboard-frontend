import React, { ReactNode } from 'react';

interface IconProps {
    icon: ReactNode;
    style?: React.CSSProperties;
    onclick: () => void;
}

const Icon:React.FC<IconProps> = ({icon , onclick , style = {display:"flex" , alignItems:"center" , justifyContent:"center", position:"absolute"}}) => {
  return (
    <button style={style} onClick={onclick}>
      {icon}
    </button>
  )
}

export default Icon
