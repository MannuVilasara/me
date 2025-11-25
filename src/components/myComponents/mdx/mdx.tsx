import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import React, { ReactNode } from 'react';

/* ---------- Table ---------- */
interface TableProps {
  data: {
    headers: string[];
    rows: string[][];
  };
}

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>);

  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

/* ---------- CustomLink ---------- */
interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: ReactNode;
}

function CustomLink({ href, children, ...rest }: CustomLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

/* ---------- RoundedImage ---------- */
function RoundedImage(props: ImageProps) {
  return <Image {...props} className="rounded-lg" alt={props.alt || ''} />;
}

/* ---------- Code ---------- */
interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: string;
}

function Code({ children, ...props }: CodeProps) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

/* ---------- slugify ---------- */
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/* ---------- createHeading ---------- */
function createHeading(level: number) {
  const Heading: React.FC<{ children: ReactNode }> = ({ children }) => {
    const slug = typeof children === 'string' ? slugify(children) : undefined;

    return React.createElement(
      `h${level}`,
      slug ? { id: slug } : undefined,
      slug
        ? [
            React.createElement('a', {
              href: `#${slug}`,
              key: `link-${slug}`,
              className: 'anchor',
            }),
            children,
          ]
        : children
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

/* ---------- Components Map ---------- */
const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

/* ---------- CustomMDX ---------- */
export function CustomMDX(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
