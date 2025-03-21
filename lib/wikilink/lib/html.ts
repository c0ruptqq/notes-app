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

export interface HtmlOptions {
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

// Micromark HtmlExtension
// https://github.com/micromark/micromark#htmlextension
function html(opts: HtmlOptions = {}) {
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

  function enterWikiLink() {
    let stack = this.getData("wikiLinkStack");
    if (!stack) this.setData("wikiLinkStack", (stack = []));

    stack.push({});
  }

  function exitWikiLinkTarget(token) {
    const target = this.sliceSerialize(token);
    const current = top(this.getData("wikiLinkStack"));
    current.target = target;
  }

  function exitWikiLinkAlias(token) {
    const alias = this.sliceSerialize(token);
    const current = top(this.getData("wikiLinkStack"));
    current.alias = alias;
  }

  function exitWikiLink(token) {
    const wikiLink = this.getData("wikiLinkStack").pop();
    const { target, alias } = wikiLink;
    const isEmbed = token.isType === "embed";
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

    // remove leading # if the target is a heading on the same page
    const displayName = alias || target.replace(/^#/, "");
    // replace spaces with dashes and lowercase headings
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
          this.tag(
            `<a href="${hrefTemplate(link + headingId)}" class="${classNames} transclusion">`
          );
          this.raw(displayName);
          this.tag("</a>");
        } else {
          this.raw(`![[${target}]]`);
        }
      } else if (format === "pdf") {
        this.tag(
          `<iframe width="100%" src="${hrefTemplate(
            link
          )}#toolbar=0" class="${classNames}" />`
        );
      } else {
        this.tag(
          `<img src="${hrefTemplate(
            link
          )}" alt="${displayName}" class="${classNames}" />`
        );
      }
    } else {
      this.tag(
        `<span class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 ${classNames}" data-href="${hrefTemplate(link + headingId)}">`
      );
      this.tag(`<a href="${hrefTemplate(link + headingId)}" class="text-inherit no-underline" style="text-decoration: none !important;">`);
      this.raw(displayName);
      this.tag("</a>");
      this.tag("</span>");
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

export { html };
