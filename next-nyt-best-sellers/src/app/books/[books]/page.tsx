import React from 'react';
import Image from 'next/image'; // Assuming you are using Next.js
import { getBooksByCategory } from '@/app/aggregates/nytimes-api/nytimes-api';
import BestsellerCategoriesResponse from '@/app/aggregates/nytimes-api/nytimes-api-response';


export default async function Books({ params }){ 
    const { books } = await params;
    const booksByCategory : BestsellerCategoriesResponse = await getBooksByCategory(books);
    return <>
    <div className="px-6 py-20 container mx-auto">
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {booksByCategory.books && booksByCategory.books.map((book) => (
                <article key={book.description} className='border border-neutral-800 rounded-lg hover:bg-neutral-900'>
                    <Image src={book.book_image} alt={book.title} width={400} height={600} className="w-full object-cover rounded-t-lg" />
                    <div className='p-4 space-y-4'>
                        <h2 className='font-bold text-center'>
                            {book.title}
                        </h2>
                        <p className='text-neutral-400 text-small text-center'>By {book.author}</p>
                        {book.description? (<p className='text-neutral-400 text-sm leading-6 text-center'>{book.description}</p>): null}
                    </div>
                </article>
            ))}
        </div>
    </div>
    </>
}