import fs from 'fs';

export interface BookDetails {
  title: string;
  author: string;
  publisher: string;
}

export class FileUtils {

    static async writeBookDetails(book: BookDetails) {
      fs.writeFileSync(
        `output/book-details-${Date.now()}.txt`,
        `Title: ${book.title}
        Author: ${book.author}
        Publisher: ${book.publisher}`
      );
    }

}
