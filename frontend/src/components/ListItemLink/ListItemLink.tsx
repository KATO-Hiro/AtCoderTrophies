import { ListItem } from '@material-ui/core';

// See:
// https://github.com/anasyusef/Society-app-react-rails/blob/8cc416446392411f4598f5ed1484911f7a7693ec/app/javascript/components/Dashboard/Dashboard.jsx
function ListItemLink(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component='a' {...props} />;
}

export default ListItemLink;
