import { ListItem, ListItemProps } from '@mui/material';
import NextLink from 'next/link';
import { forwardRef, ReactNode } from 'react';

interface ListItemLinkProps extends Omit<ListItemProps, 'href'> {
  href: string;
  children: ReactNode;
}

// See:
// https://github.com/anasyusef/Society-app-react-rails/blob/8cc416446392411f4598f5ed1484911f7a7693ec/app/javascript/components/Dashboard/Dashboard.jsx
// Updated for Next.js 13 compatibility - avoid nested <a> tags
const ListItemLink = forwardRef<HTMLAnchorElement, ListItemLinkProps>(
  (props, ref) => {
    const { href, children, ...other } = props;

    return (
      <NextLink
        href={href}
        ref={ref}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ListItem component='span' {...other}>
          {children}
        </ListItem>
      </NextLink>
    );
  },
);

ListItemLink.displayName = 'ListItemLink';

export default ListItemLink;
