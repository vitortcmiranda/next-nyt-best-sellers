export default interface BestsellerCategoriesResponse{
    list_name: string;
    display_name: string;
    list_name_encoded: string;
    oldest_published_date: string;
    newest_published_date: string;
    updated: string;
    books?: Book[];
}

interface Book {
    rank: number;
    rank_last_week: number;
    weeks_on_list: number;
    asterisk: number;
    dagger: number;
    publisher: string;
    description: string;
    title: string;
    author: string;
    contributor: string;
    book_image: string;
    book_image_width: number;
    book_image_height: number;
    amazon_product_url: string;
    buy_links: BuyLink[];
}

interface BuyLink {
    name: string;
    url: string;
}