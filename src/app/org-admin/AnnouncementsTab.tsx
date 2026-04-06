"use client";

import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, Snackbar, Alert, CircularProgress, Card, CardContent,
  CardActions, Chip, Switch, FormControlLabel,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

interface Announcement {
  id: number;
  org_slug: string;
  title: string;
  body: string;
  link: string;
  active: string;
  created_at: string;
}

const EMPTY = { org_slug: '', title: '', body: '', link: '', active: 'Y' };

export default function AnnouncementsTab({ orgSlugs }: { orgSlugs: string[] }) {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...EMPTY, org_slug: orgSlugs[0] ?? '' });
  const [dialog, setDialog] = useState<{ open: boolean; mode: 'add' | 'edit'; item: Announcement | null }>({
    open: false, mode: 'add', item: null,
  });
  const [snack, setSnack] = useState<{ open: boolean; msg: string; sev: 'success' | 'error' }>({
    open: false, msg: '', sev: 'success',
  });

  const toast = (msg: string, sev: 'success' | 'error' = 'success') => setSnack({ open: true, msg, sev });

  async function load() {
    const res = await fetch('/org-admin/api/announcements');
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm({ ...EMPTY, org_slug: orgSlugs[0] ?? '' });
    setDialog({ open: true, mode: 'add', item: null });
  }

  function openEdit(item: Announcement) {
    setForm({ org_slug: item.org_slug, title: item.title, body: item.body, link: item.link ?? '', active: item.active });
    setDialog({ open: true, mode: 'edit', item });
  }

  async function handleSubmit() {
    if (!form.title || !form.body) return toast('Title and body are required', 'error');

    const payload = {
      ...form,
      ...(dialog.mode === 'edit' && { id: dialog.item!.id }),
    };

    const res = await fetch('/org-admin/api/announcements', {
      method: dialog.mode === 'add' ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast(dialog.mode === 'add' ? 'Announcement posted' : 'Updated');
      setDialog({ open: false, mode: 'add', item: null });
      load();
    } else {
      const text = await res.text();
      let msg = 'Failed';
      try { msg = JSON.parse(text).error || msg; } catch {}
      toast(msg, 'error');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this announcement?')) return;
    const res = await fetch(`/org-admin/api/announcements?id=${id}`, { method: 'DELETE' });
    if (res.ok) { toast('Deleted'); load(); }
    else toast('Failed', 'error');
  }

  async function toggleActive(item: Announcement) {
    await fetch('/org-admin/api/announcements', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, active: item.active === 'Y' ? 'N' : 'Y' }),
    });
    load();
  }

  if (loading) return <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>;

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h6" fontWeight={700}>Announcements</Typography>
          <Typography variant="body2" color="text.secondary">
            Active announcements appear as a popup on the home page and in /announcements.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={openAdd}>Post</Button>
      </Box>

      {items.length === 0 && (
        <Typography color="text.secondary" textAlign="center" py={4}>No announcements yet.</Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => (
          <Card key={item.id} variant="outlined" sx={{ borderRadius: 2, opacity: item.active === 'Y' ? 1 : 0.5 }}>
            <CardContent sx={{ pb: 0 }}>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <Chip label={item.org_slug} size="small" variant="outlined" color="primary" />
                <Chip
                  label={item.active === 'Y' ? 'Active' : 'Hidden'}
                  size="small"
                  color={item.active === 'Y' ? 'success' : 'default'}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                  {new Date(item.created_at).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography fontWeight={700} fontSize="0.95rem">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>{item.body}</Typography>
              {item.link && (
                <Typography variant="body2" mt={0.5}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Link ↗</a>
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ pt: 0 }}>
              <Button size="small" startIcon={<Edit />} onClick={() => openEdit(item)}>Edit</Button>
              <Button size="small" color="error" startIcon={<Delete />} onClick={() => handleDelete(item.id)}>Delete</Button>
              <Button size="small" onClick={() => toggleActive(item)} sx={{ ml: 'auto' }}>
                {item.active === 'Y' ? 'Hide' : 'Show'}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Dialog open={dialog.open} onClose={() => setDialog({ ...dialog, open: false })} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>{dialog.mode === 'add' ? 'Post Announcement' : 'Edit Announcement'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {orgSlugs.length > 1 && (
              <TextField select fullWidth label="Org" value={form.org_slug}
                onChange={(e) => setForm(p => ({ ...p, org_slug: e.target.value }))}
                SelectProps={{ native: true }}>
                {orgSlugs.map((s) => <option key={s} value={s}>{s}</option>)}
              </TextField>
            )}
            <TextField fullWidth required label="Title" value={form.title}
              onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} />
            <TextField fullWidth required multiline rows={3} label="Body" value={form.body}
              onChange={(e) => setForm(p => ({ ...p, body: e.target.value }))} />
            <TextField fullWidth label="Link (optional)" value={form.link}
              onChange={(e) => setForm(p => ({ ...p, link: e.target.value }))}
              placeholder="https://..." />
            {dialog.mode === 'edit' && (
              <FormControlLabel
                control={<Switch checked={form.active === 'Y'} onChange={(e) => setForm(p => ({ ...p, active: e.target.checked ? 'Y' : 'N' }))} />}
                label="Active (visible on site)"
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ ...dialog, open: false })}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{dialog.mode === 'add' ? 'Post' : 'Update'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack(s => ({ ...s, open: false }))}>
        <Alert severity={snack.sev} onClose={() => setSnack(s => ({ ...s, open: false }))}>{snack.msg}</Alert>
      </Snackbar>
    </>
  );
}
