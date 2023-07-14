import { Router } from 'express';
import { Book } from '../models/book.js';
var router = Router();  

// CREATE
router.post('/', async (req, res) => {
    const properties = [
        'title',
        'author',
        'isbn',
        'genre',
    ];
    
    try {
        const data = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => properties.includes(key))
        );
        const new_book = await Book.create(data);
        res.status(201).json({
            message: 'A new book has been created',
            data: new_book,
        });
    } catch (err) {
        res.status(400).json({
            message: 'Error in create a new registry',
            err,
        });
    };
});

// READ
router.get('/', async (_, res) => {
    try {
        const books = await Book.findAll({
            attributes: ['title', 'author', 'isbn', 'genre'],
        });
        res.status(200).json({
            message: 'Listing books...',
            data: books,
        });
    } catch (err){
        res.status(400).json({
            message: 'Error in listing all books',
            err,
        });
    };
});

// READ
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findAll({where:{id:id}});
        res.status(200).json({
            message: `Listing the book with id ${id}`,
            data: book,
        });
    } catch (err){
        res.status(400).json({
            message: `Error in listing the book with id ${id}`,
            err,
        });
    };
});

// UPDATE
router.patch('/:id', async (req, res) => {

    const properties = [
        'title',
        'author',
        'isbn',
        'genre',
    ];

    try {
        const id = req.params.id;
        const new_data = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => properties.includes(key))
        );
        const att_book = await Book.update(new_data, {where:{id:id}});
        res.status(201).json({
            message: `The book with id ${id} has been updated`,
            new_data: att_book,
        });
    } catch (err) {
        res.status(400).json({
            message: `Error in update the book with id ${id}`,
            err,
        });
    };
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Book.destroy({where:{id:id}});
        res.status(200).json({
            message: `The book with id ${id} has been removed`,
        });
    } catch (err) {
        res.status(400).json({
            message: `Couldn't delete the book with id ${id}`,
        });
    };
});

export default router;