import React from 'react';
import Image from 'next/image'; // Assuming you are using Next.js
import { getBooksByCategory } from '@/app/aggregates/nytimes-api/nytimes-api';
import BestsellerCategoriesResponse from '@/app/aggregates/nytimes-api/nytimes-api-response';

export default async function Books({ params }){ 
    const { books } = await params;
    const booksByCategory : BestsellerCategoriesResponse = await getBooksByCategory(books);

    const getMedalIcon = (index) => {
        switch(index) {
            case 0:
                return '🥇';
            case 1:
                return '🥈';
            case 2:
                return '🥉';
            default:
                return null;
        }
    };

    const getMedalBorderColor = (index) => {
        switch(index) {
            case 0:
                return 'border-yellow-500 bg-yellow-500';
            case 1:
                return 'border-gray-400 bg-gray-400';
            case 2:
                return 'border-yellow-700 bg-yellow-700';
            default:
                return 'border-neutral-800 bg-blue-600';
        }
    };

    return (
        <div className="px-6 py-20 container mx-auto">
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {booksByCategory.books && booksByCategory.books.map((book, index) => (
                    <article 
                        key={book.description} 
                        className={`relative border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-neutral-100 ${getMedalBorderColor(index).split(' ')[0]}`}
                    >
                        {index < 3 && (
                            <span className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 text-4xl border-4 ${getMedalBorderColor(index).split(' ')[0]} hover:scale-110 transition-transform duration-300`}>
                                {getMedalIcon(index)}
                            </span>
                        )}
                        <Image src={book.book_image} alt={book.title} width={400} height={600} className="w-full object-cover rounded-t-lg" />
                        <div className='p-4 space-y-4'>
                            <h2 className='font-bold text-center text-lg'>
                                {book.title}
                            </h2>
                            <p className='text-neutral-400 text-sm text-center'>By {book.author}</p>
                            {book.description ? (
                                <p className='text-neutral-400 text-sm leading-6 text-center'>{book.description}</p>
                            ) : null}
                            <div className='text-center'>
                                <a href={book.buy_links[0].url} target="_blank" rel="noopener noreferrer">
                                    <button className={`mt-4 px-4 py-2 text-white rounded-lg hover:bg-opacity-80 transition-colors duration-300 ${index < 3 ? getMedalBorderColor(index).split(' ')[1] : 'bg-[#207F89]'}`}>
                                        Buy on Amazon
                                    </button>
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}