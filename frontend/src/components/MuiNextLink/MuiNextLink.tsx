/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-props-no-spreading */
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';

// See:
// https://github.com/mui-org/material-ui/blob/0620bb0c47c9aa52a863d8ccca5ce7352274bc65/examples/nextjs-with-typescript/src/components/Link.tsx
// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

/* eslint-disable react/require-default-props */
// TODO: Extract interface as a separate file.
interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
}

// HACK: This solution is not good.
/* eslint-disable-next-line react/display-name */
export const NextLinkComposed = forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>((props, ref) => {
  const {
    to,
    linkAs,
    href,
    replace,
    scroll,
    passHref,
    shallow,
    prefetch,
    locale,
    ...other
  } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

// TODO: Extract type as a separate file.
export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const MuiNextLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    role, // Link don't have roles.
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === 'string' &&
    (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <Anchor
          className={className}
          href={href as any}
          ref={ref as any}
          {...other}
        />
      );
    }

    return (
      <MuiLink className={className} href={href as any} ref={ref} {...other} />
    );
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed
        className={className}
        ref={ref as any}
        to={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      {...other}
    />
  );
});

MuiNextLink.displayName = 'MuiNextLink';

export default MuiNextLink;
