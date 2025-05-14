import tailwindCSS, {
  Options as TailwindCSSOptions,
} from "lume/plugins/tailwindcss.ts";
import lightningCSS from "lume/plugins/lightningcss.ts";
import minifyHTML from "lume/plugins/minify_html.ts";

import basePath from "lume/plugins/base_path.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";

import date, { Options as DateOptions } from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";

import favicon, { Options as FaviconOptions } from "lume/plugins/favicon.ts";
import feed, { Options as FeedOptions } from "lume/plugins/feed.ts";
import sitemap, { Options as SitemapOptions } from "lume/plugins/sitemap.ts";

import { merge } from "lume/core/utils/object.ts";

import "lume/types.ts";

export interface Options {
  tailwindCSS?: Partial<TailwindCSSOptions>;
  date?: Partial<DateOptions>;
  favicon?: Partial<FaviconOptions>;
  feed?: Partial<FeedOptions>;
  sitemap?: Partial<SitemapOptions>;
}

export const defaults: Options = {
  favicon: {
    input: "uploads/favicon.svg",
  },
  feed: {
    output: ["/feed.xml", "/feed.json"],
    query: "type=post",
    info: {
      title: "=metas.site",
      description: "=metas.description",
    },
    items: {
      title: "=title",
    },
  },
};

export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    site
      .use(tailwindCSS(options.tailwindCSS))
      .use(lightningCSS())
      .use(minifyHTML())

      .use(basePath())
      .use(resolveUrls())
      .use(slugifyUrls())

      .use(date(options.date))
      .use(metas())

      .use(favicon(options.favicon))
      .use(feed(options.feed))
      .use(sitemap(options.sitemap))

      .add("style.css")
      .add("uploads");
  };
}
