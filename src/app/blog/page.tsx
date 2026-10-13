import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { postsQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'

export const revalidate = 60 // Revalidate page every 60 seconds

export const metadata: Metadata = {
  title: 'Nutrition & Wellness Blog in Ghana',
  description:
    'Practical nutrition, healthy eating, and wellness advice for everyday life in Ghana.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Nutrition & Wellness Blog in Ghana',
    description:
      'Practical nutrition, healthy eating, and wellness advice for everyday life in Ghana.',
    url: '/blog',
    type: 'website',
  },
}

export default async function BlogIndexPage() {
  const posts = await client.fetch(postsQuery)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">Expert Advice & Insights</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">The Nutrition Guide Blog</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Discover practical tips for healthy eating, weight management, and vibrant wellness tailored for real life in Ghana.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">No blog posts published yet. Check back soon or visit the studio to create your first post!</p>
            <Link href="/studio" className="inline-block mt-4 bg-green-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-green-700 transition">
              Open Sanity Studio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
                {post.mainImage && (
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-gray-400 mb-2">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug.current}`} className="hover:text-green-600 transition">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="inline-flex items-center text-green-600 font-semibold text-sm hover:text-green-700"
                  >
                    Read Full Article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}