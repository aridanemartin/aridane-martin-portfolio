import { defineCollection, z } from 'astro:content';

export const collections = {
  work: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
      url: z.string(),
    }),
  }),
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      lastUpdateDate: z.coerce.date().optional(),
      timeToRead: z.number().optional(),
      isActive: z.boolean().default(true),
      tags: z.array(z.string()),
      author: z.string().optional(),
      img: z.string().optional(),
      img_alt: z.string().optional(),
    }),
  }),
};
