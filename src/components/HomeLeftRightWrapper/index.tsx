import { JSXChildrenProp } from '../../types';
import { Left, Right, Wrapper } from './styled';

interface HomeLeftRightWrapperProps {
  alwaysVertical?: boolean;
  left: JSXChildrenProp;
  right: JSXChildrenProp;
  className?: string;
}

const HomeLeftRightWrapper = ({
  left,
  right,
  className = '',
  alwaysVertical = false,
}: HomeLeftRightWrapperProps) => (
  <Wrapper className={className} $alwaysVertical={alwaysVertical}>
    <Left>{left}</Left>
    <Right>{right}</Right>
  </Wrapper>
);

export default HomeLeftRightWrapper;
