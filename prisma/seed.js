const prisma = require("../prisma");
const seed = async (numAuthors = 20, booksPerAuthor = 3) => {
    for(let i = 0; i < numAuthors; i++) {
        const books = [];
        for(let j = 0; j < booksPerAuthor; j++) {
            books.push({title: `Book ${i}${j}`});
        }

        await prisma.author.create({
            data: {
                name: `Author ${i}`,
                books: {
                    create: books
                }
            }
        });
    }
};

seed()
    .then(async () => await prisma.$disconnect())
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        ProcessingInstruction.exit(1);
    });