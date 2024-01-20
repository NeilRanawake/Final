'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import booksData from "../components/books.json";
import Book from "../components/Book";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BackgroundImage, Center, Text, Box, Grid, Container, Pagination  } from '@mantine/core';
import useMediaQueries from '../components/useMediaQueries';
import getItemsPerPage  from '../components/itemsPerPage';
import classes from './Demo.module.css';
import styles from './Demo.module.css';


export default function IndexPage() {

  const books: Book[] = booksData as Book[];
  const screenSize = useMediaQueries();
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(booksData);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage(screenSize));


  useEffect(() => {
    // Initialize itemsPerPage with the correct value based on screen size
    setItemsPerPage(getItemsPerPage(screenSize));
  }, [screenSize]);

  useEffect(() => {
    // Filter books based on search term
    const filtered = booksData.filter(
      (book) => book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Ensure active page doesn't exceed the total number of pages
    const totalPages = Math.ceil((filtered.length || booksData.length) / itemsPerPage);
    const validActivePage = activePage > totalPages ? totalPages : activePage;
  
    // Update active page to a valid page if needed
    if (activePage !== validActivePage) {
      setActivePage(validActivePage);
    }
  
    // Update filteredBooks with the current range
    const startIndex = (validActivePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newFilteredBooks = filtered.slice(startIndex, endIndex);
  
    // Update filteredBooks only if there are results or when searchTerm is empty
    setFilteredBooks((prevFilteredBooks) => {
      if (filtered.length > 0) {
        return newFilteredBooks;
      } else {
        // If no results and searchTerm is not empty, reset to all books
        return booksData.slice(startIndex, endIndex);
      }
    });
  }, [itemsPerPage, activePage, searchTerm, screenSize]);
  
  
  return (
<>
{/* Fixed Header  className={classes.fixedHeader} */}
<div className={classes.fixedHeader}>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />    
</div>
    
    <div className={styles.wrapper}>
        <h4 className={styles.homeTitle}>Home Page</h4>
      <Box maw='auto' mx="auto">
      <BackgroundImage
        src="/stairs.jpg"
        radius="sm"
        h='50vh'
        style={{ marginBottom: '20px' }}
      >
        <Center p="md" style={{ textAlign: 'center'}}>
          <Text style={{ color:"white", fontWeight:'400' }} >
          Buddha Dhamma School International is not just another Dhamma School. It aims at a specific goal. Spiritual progress of every individual right up to enlightenment is our aim
          </Text>
        </Center>
      </BackgroundImage>
      
    </Box>

      {/* Grid Container for Books */}
      <Container size="xl" className="" >
      <Grid justify="center" gutter='sm' >
        {filteredBooks.map((book, index) => (
          <Grid.Col span={{ xs: 12, sm: 6, md: 5, lg: 4, xl: 3 }} key={index} className="flex-row-md" style={{ marginBottom: '16px' }}>
            <Book book={book} />
            
          </Grid.Col>
        ))}
      </Grid>
    </Container>

    <Pagination style={{ marginBottom: '10px' }} value={activePage} onChange={setActivePage} total={Math.ceil(booksData.length / itemsPerPage)} withEdges />
    <div>
    <Footer />
    </div>
  </div>
   
  </>   
    );
  }
