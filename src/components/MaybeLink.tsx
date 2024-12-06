import Link from "next/link";

interface Props {
  href: string;
  condition: boolean;
  className: string;
  children: React.ReactNode;
}

export function MaybeLink({ href, condition, className, children }: Props) {
  if (condition) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}
