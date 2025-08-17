import * as React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ExternalLink as ExternalLinkIcon, ArrowRight } from "lucide-react";

const linkVariants = cva(
  "inline-flex items-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-200",
  {
    variants: {
      variant: {
        default: "text-hc-primary hover:text-hc-blue-secondary underline-offset-4 hover:underline",
        button: "bg-hc-primary text-white px-4 py-2 rounded-md hover:opacity-90 font-medium",
        nav: "text-gray-700 hover:text-hc-primary hover:bg-gray-100 px-3 py-2 rounded-md font-medium",
        breadcrumb: "text-gray-500 hover:text-hc-primary text-sm",
        sidebar: "text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg font-medium",
        emergency: "text-hc-emergency hover:text-white hover:bg-hc-emergency px-3 py-2 rounded-md font-bold border-2 border-hc-emergency",
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
      external: {
        true: "after:content-['_↗'] after:text-xs after:ml-1",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      external: false,
    },
  }
);

export interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  to?: string;
  href?: string;
  variant?: VariantProps<typeof linkVariants>['variant'];
  size?: VariantProps<typeof linkVariants>['size'];
  external?: boolean;
  openInNewTab?: boolean;
  showExternalIcon?: boolean;
  showArrow?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      to,
      href,
      variant,
      size,
      external = false,
      openInNewTab = false,
      showExternalIcon = false,
      showArrow = false,
      className,
      children,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const linkUrl = to || href;
    const isExternal = external || (linkUrl && (linkUrl.startsWith('http') || linkUrl.startsWith('mailto:') || linkUrl.startsWith('tel:')));
    const shouldOpenInNewTab = openInNewTab || isExternal;

    // Enhanced accessibility attributes
    const accessibilityProps = {
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...(shouldOpenInNewTab && {
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': ariaLabel ? `${ariaLabel} (opens in new tab)` : `${children} (opens in new tab)`,
      }),
    };

    const linkClassName = cn(
      linkVariants({ variant, size, external: isExternal, className })
    );

    // External links or mailto/tel links
    if (isExternal || !to) {
      return (
        <a
          ref={ref}
          href={linkUrl}
          className={linkClassName}
          {...accessibilityProps}
          {...props}
        >
          {children}
          {showExternalIcon && isExternal && (
            <ExternalLinkIcon className="ml-1 h-4 w-4" aria-hidden="true" />
          )}
          {showArrow && !isExternal && (
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          )}
          {/* Screen reader announcement for external links */}
          {isExternal && !ariaLabel && (
            <span className="sr-only">
              (opens in new window)
            </span>
          )}
        </a>
      );
    }

    // Internal React Router links
    return (
      <RouterLink
        ref={ref}
        to={linkUrl}
        className={linkClassName}
        {...accessibilityProps}
        {...props}
      >
        {children}
        {showArrow && (
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        )}
      </RouterLink>
    );
  }
);

Link.displayName = "Link";

// Specialized healthcare link variants
export const NavigationLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => (
    <Link
      ref={ref}
      variant="nav"
      {...props}
    >
      {children}
    </Link>
  )
);

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => (
    <Link
      ref={ref}
      variant="breadcrumb"
      {...props}
    >
      {children}
    </Link>
  )
);

export const SidebarLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => (
    <Link
      ref={ref}
      variant="sidebar"
      {...props}
    >
      {children}
    </Link>
  )
);

export const EmergencyLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...props }, ref) => (
    <Link
      ref={ref}
      variant="emergency"
      className={cn("pulse-critical", className)}
      {...props}
    >
      {children}
    </Link>
  )
);

export const ExternalLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => (
    <Link
      ref={ref}
      external={true}
      showExternalIcon={true}
      {...props}
    >
      {children}
    </Link>
  )
);

NavigationLink.displayName = "NavigationLink";
BreadcrumbLink.displayName = "BreadcrumbLink";
SidebarLink.displayName = "SidebarLink";
EmergencyLink.displayName = "EmergencyLink";
ExternalLink.displayName = "ExternalLink";

export { Link, linkVariants };
