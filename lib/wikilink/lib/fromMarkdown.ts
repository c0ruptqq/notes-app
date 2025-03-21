import { isSupportedFileFormat } from "./isSupportedFileFormat";

const defaultWikiLinkResolver = (target: string) => {
  // for [[#heading]] links
  if (!target) {
    return [];
  }
  let permalink = target.replace(/\/index$/, "");
  // TODO what to do with [[index]] link?
  if (permalink.length === 0) {
    permalink = "/";
  }
  return [permalink];
};

export interface FromMarkdownOptions {
  pathFormat?:
  | "raw" // default; use for regular relative or absolute paths
  | "obsidian-absolute" // use for Obsidian-style absolute paths (with no leading slash)
  | "obsidian-short"; // use for Obsidian-style shortened paths (shortest path possible)
  permalinks?: string[]; // list of permalinks to match possible permalinks of a wiki link against
  wikiLinkResolver?: (name: string) => string[]; // function to resolve wiki links to an array of possible permalinks
  newClassName?: string; // class name to add to links that don't have a matching permalink
  wikiLinkClassName?: string; // class name to add to all wiki links
  hrefTemplate?: (permalink: string) => string; // function to generate the href attribute of a link
}

// mdas-util-from-markdown extension
// https://github.com/syntax-tree/mdast-util-from-markdown#extension
function fromMarkdown(opts: FromMarkdownOptions = {}) {
  const pathFormat = opts.pathFormat || "raw";
  const permalinks = opts.permalinks || [];
  const wikiLinkResolver = opts.wikiLinkResolver || defaultWikiLinkResolver;
  const newClassName = opts.newClassName || "new";
  const wikiLinkClassName = opts.wikiLinkClassName || "internal";
  const defaultHrefTemplate = (permalink: string) => permalink;

  const hrefTemplate = opts.hrefTemplate || defaultHrefTemplate;

  function top(stack) {
    return stack[stack.length - 1];
  }

  function enterWikiLink(token) {
    this.enter(
      {
        type: "wikiLink",
        data: {
          isEmbed: token.isType === "embed",
          target: null, // the target of the link, e.g. "Foo Bar#Heading" in "[[Foo Bar#Heading]]"
          alias: null, // the alias of the link, e.g. "Foo" in "[[Foo Bar|Foo]]"
          permalink: null, // TODO shouldn't this be named just "link"?
          exists: null, // TODO is this even needed here?
          // fields for mdast-util-to-hast (used e.g. by remark-rehype)
          hName: null,
          hProperties: null,
          hChildren: null,
        },
      },
      token
    );
  }

  function exitWikiLinkTarget(token) {
    const target = this.sliceSerialize(token);
    const current = top(this.stack);
    current.data.target = target;
  }

  function exitWikiLinkAlias(token) {
    const alias = this.sliceSerialize(token);
    const current = top(this.stack);
    current.data.alias = alias;
  }

  function exitWikiLink(token) {
    const wikiLink = top(this.stack);
    const {
      data: { isEmbed, target, alias },
    } = wikiLink;
    this.exit(token);
    // eslint-disable-next-line no-useless-escape
    const wikiLinkWithHeadingPattern = /^(.*?)(#.*)?$/u;
    const [, path, heading = ""] = target.match(wikiLinkWithHeadingPattern);

    const possibleWikiLinkPermalinks = wikiLinkResolver(path);

    const matchingPermalink = permalinks.find((e) => {
      return possibleWikiLinkPermalinks.find((p) => {
        if (pathFormat === "obsidian-short") {
          if (e === p || e.endsWith(p)) {
            return true;
          }
        } else if (pathFormat === "obsidian-absolute") {
          if (e === "/" + p) {
            return true;
          }
        } else {
          if (e === p) {
            return true;
          }
        }
        return false;
      });
    });

    // TODO this is ugly
    const link =
      matchingPermalink ||
      (pathFormat === "obsidian-absolute"
        ? "/" + possibleWikiLinkPermalinks[0]
        : possibleWikiLinkPermalinks[0]) ||
      "";

    wikiLink.data.exists = !!matchingPermalink;
    wikiLink.data.permalink = link;

    // remove leading # if the target is a heading on the same page
    const displayName = alias || target.replace(/^#/, "");
    const headingId = heading.replace(/\s+/g, "-").toLowerCase();
    let classNames = wikiLinkClassName;
    if (!matchingPermalink) {
      classNames += " " + newClassName;
    }

    if (isEmbed) {
      const [isSupportedFormat, format] = isSupportedFileFormat(target);
      if (!isSupportedFormat) {
        // Temporarily render note transclusion as a regular wiki link
        if (!format) {
          wikiLink.data.hName = "a";
          wikiLink.data.hProperties = {
            className: classNames + " " + "transclusion",
            href: hrefTemplate(link) + headingId,
          };
          wikiLink.data.hChildren = [{ type: "text", value: displayName }];

        } else {
          wikiLink.data.hName = "p";
          wikiLink.data.hChildren = [
            {
              type: "text",
              value: `![[${target}]]`,
            },
          ];
        }
      } else if (format === "pdf") {
        wikiLink.data.hName = "iframe";
        wikiLink.data.hProperties = {
          className: classNames,
          width: "100%",
          src: `${hrefTemplate(link)}#toolbar=0`,
        };
      } else {
        wikiLink.data.hName = "img";
        wikiLink.data.hProperties = {
          className: classNames,
          src: hrefTemplate(link),
          alt: displayName,
        };
      }
    } else {
      wikiLink.data.hName = "span";
    wikiLink.data.hProperties = {
      className: `inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 ${classNames}`,
      "data-href": hrefTemplate(link) + headingId,
    };
    wikiLink.data.hChildren = [
      { 
        type: "element",
        tagName: "a",
        properties: {
          href: hrefTemplate(link) + headingId,
          className: "text-inherit no-underline",
          style: "text-decoration: none !important;",
        },
        children: [{ type: "text", value: displayName }]
      }
    ];
  }
  }

  return {
    enter: {
      wikiLink: enterWikiLink,
    },
    exit: {
      wikiLinkTarget: exitWikiLinkTarget,
      wikiLinkAlias: exitWikiLinkAlias,
      wikiLink: exitWikiLink,
    },
  };
}

export { fromMarkdown };
