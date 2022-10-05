// React
import {forwardRef, useMemo, Fragment} from 'react';

// MUI Components
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// MUI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

// React Router
import { Link as RouterLink } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = useMemo(
    () =>
      forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}


export const mainListItems = (
  <Fragment>
    <ListItemLink to="/dashboard/home" primary="Dashboard" icon={<DashboardIcon />} />
    <ListItemLink to="/dashboard/account" primary="Account" icon={<AccountBoxIcon />} />
    <Divider sx={{ my: 1 }} />
    <ListItemLink to="/dashboard/garages" primary="Garages" icon={<WarehouseIcon />} />
    <ListItemLink to="/dashboard/items" primary="Items" icon={<ShoppingBasketIcon />} />
  </Fragment>
);