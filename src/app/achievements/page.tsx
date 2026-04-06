"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, GridLegacy as Grid, Card, CardContent, Divider, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { achievements as staticAchievements } from '@/data/achievements';
import { clubs, teams, societies, communities } from '@/data/orgs';

const ALL_ORGS = [...clubs, ...teams, ...societies, ...communities];

function slugToLogo(slug: string): string {
  const org = ALL_ORGS.find((o) => o.link.endsWith('/' + slug.split('/').pop()));
  return org?.image ?? '';
}

function slugToName(slug: string): string {
  const org = ALL_ORGS.find((o) => o.link.endsWith('/' + slug.split('/').pop()));
  return org?.name ?? slug;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  year: string;
  club: string;
  logo: string;
}

const GradientTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: { fontSize: '2rem', marginBottom: theme.spacing(3) },
}));

const YearHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(6),
  fontWeight: 600,
  [theme.breakpoints.down('sm')]: { fontSize: '1.5rem', marginBottom: theme.spacing(3), marginTop: theme.spacing(4) },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows?.[3] || '0 4px 6px rgba(0,0,0,0.1)',
  width: '100%',
  [theme.breakpoints.down('sm')]: { flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
}));

export default function AchievementsPage() {
  const [allData, setAllData] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClub, setSelectedClub] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    fetch('/api/achievements')
      .then(async (res) => {
        const dbRows = res.ok ? await res.json() : [];
        const dbMapped: Achievement[] = dbRows.map((r: { id: number; title: string; description: string; year: string; org_slug: string; logo?: string }) => ({
          id: r.id + 10000, // avoid ID collision with static data
          title: r.title,
          description: r.description,
          year: r.year,
          club: slugToName(r.org_slug),
          logo: r.logo || slugToLogo(r.org_slug),
        }));
        // DB entries come first (newer), then static entries
        setAllData([...dbMapped, ...staticAchievements]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = allData
    .filter((a) => selectedClub === 'all' || a.club === selectedClub)
    .filter((a) => selectedYear === 'all' || a.year === selectedYear)
    .sort((a, b) => {
      if (b.year !== a.year) return parseInt(b.year) - parseInt(a.year);
      return b.id - a.id;
    });

  const grouped = filtered.reduce((acc: Record<string, Achievement[]>, a) => {
    if (!acc[a.year]) acc[a.year] = [];
    acc[a.year].push(a);
    return acc;
  }, {});

  const clubs_list = ['all', ...Array.from(new Set(allData.map((a) => a.club))).sort()];
  const years_list = ['all', ...Array.from(new Set(allData.map((a) => a.year))).sort((a, b) => parseInt(b) - parseInt(a))];

  return (
    <Box sx={{ padding: { xs: '100px 16px 32px', sm: '80px 24px 32px' }, textAlign: 'center' }}>
      <GradientTitle variant="h2">Achievements</GradientTitle>

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>
      ) : (
        <>
          <Box sx={{
            display: 'flex', justifyContent: 'center', gap: 2, mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
          }}>
            <FormControl sx={{ minWidth: 160 }} size="small">
              <Select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)} displayEmpty>
                {clubs_list.map((c) => (
                  <MenuItem key={c} value={c}>{c === 'all' ? 'All Clubs/Teams' : c}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} displayEmpty>
                {years_list.map((y) => (
                  <MenuItem key={y} value={y}>{y === 'all' ? 'All Years' : y}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ maxWidth: '1000px', margin: '0 auto' }}>
            {Object.entries(grouped)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([year, items]) => (
                <Box key={year} sx={{ mb: 5 }}>
                  <YearHeading variant="h4">{year}</YearHeading>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    {items.map((a) => (
                      <Grid item xs={12} md={6} key={a.id} sx={{ display: 'flex', width: '100%' }}>
                        <StyledCard>
                          {a.logo && (
                            <Box sx={{
                              width: { xs: '100%', sm: 100 }, flexShrink: 0,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              p: 1, mb: { xs: 1, sm: 0 },
                            }}>
                              <Box component="img"
                                sx={{ height: 'auto', maxHeight: { xs: 120, sm: 100 }, width: { xs: '80%', sm: '100%' }, objectFit: 'contain' }}
                                alt={`${a.club} logo`}
                                src={a.logo}
                              />
                            </Box>
                          )}
                          <CardContent sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' }, pt: { xs: 0, sm: 2 } }}>
                            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                              {a.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                              {a.description}
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                              {a.club}
                            </Typography>
                          </CardContent>
                        </StyledCard>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            {Object.keys(grouped).length === 0 && (
              <Typography color="text.secondary" py={6}>No achievements found.</Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
