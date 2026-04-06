
"use client"

import React from 'react';
import { Box } from '@mui/material';

// Import section components
import Hero from '../components/Hero';
import About from '../components/About';
import Achievements from '../components/Achievements';
import Techfest from '../components/Techfest';
import AnnouncementsPopup from '../components/AnnouncementsPopup';

function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AnnouncementsPopup />
      <Hero />
      <About />
      <Achievements />
      <Techfest />
    </Box>
  );
}

export default Home; 
