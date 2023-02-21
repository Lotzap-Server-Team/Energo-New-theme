import {
  Box,
  Tooltip,
  Badge,
  TooltipProps,
  tooltipClasses,
  styled,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);



function Logo() {
  const theme = useTheme();

  return (

      <LogoWrapper to="/overview">

        <img src="https://i.ibb.co/Bsk3sWr/Energo-logo.png" alt="" width={100}/>

      </LogoWrapper>
  );
}

export default Logo;
