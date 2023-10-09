import { Image } from '@chakra-ui/react';
import { FC } from 'react';

interface IProps {
  size?: number;
}

const Logo: FC<IProps> = ({ size = 175 }) => {
  return <Image src="/assets/images/logo.svg" objectFit="contain" w={`${size}px`} />;
};

export { Logo };
