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
const Anchor = styled('a')({}) as any;

/* eslint-disable react/require-default-props */
// TODO: Extract interface as a separate file.
interface NextLinkComposedProps {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
  replace?: NextLinkProps['replace'];
  scroll?: NextLinkProps['scroll'];
  shallow?: NextLinkProps['shallow'];
  prefetch?: NextLinkProps['prefetch'];
  locale?: NextLinkProps['locale'];
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>;
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
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
    shallow,
    prefetch,
    locale,
    children,
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
      locale={locale}
      ref={ref}
      {...other}
    >
      {children}
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
    <NextLinkComposed
      className={className}
      ref={ref as any}
      to={href}
      {...other}
    >
      <MuiLink component='span' {...other} />
    </NextLinkComposed>
  );
});

MuiNextLink.displayName = 'MuiNextLink';

export default MuiNextLink;
