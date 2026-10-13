import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { postQuery, postSlugsQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch(postSlugsQuery)
  return slugs.map((slug: string) => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(postQuery, { slug: params.slug })

  if (!post) {
    notFound()
  }

  const whatsappUrl = `https://wa.me/233240000000?text=${encodeURIComponent(
    `Hi Small Madam, I read your article "${post.title}" and I would love to get personalized guidance.`
  )}`

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <article className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-6">
          <Link href="/blog" className="text-sm font-medium text-green-600 hover:underline">
            &larr; Back to all articles
          </Link>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="text-sm text-gray-500 mb-8">
          Published on {new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>

        {post.mainImage && (
          <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-sm">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-green max-w-none bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 mb-12">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }: any) => (
                  <div className="relative h-64 md:h-80 w-full my-6 rounded-xl overflow-hidden">
                    <Image
                      src={urlFor(value).url()}
                      alt="Blog inline image"
                      fill
                      className="object-cover"
                    />
                  </div>
                ),
              },
            }}
          />
        </div>

        {/* WhatsApp Conversion Funnel Box */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-3">Ready to Transform Your Health?</h3>
          <p className="text-green-100 mb-6 max-w-lg mx-auto">
            Get personalized meal plans and expert nutrition coaching tailored specifically for your body and lifestyle.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-700 font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-green-50 transition"
          >
            Chat with Small Madam on WhatsApp
          </a>
        </div>
      </article>

      <Footer />
    </main>
  )
}