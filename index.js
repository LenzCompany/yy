import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import { serve } from '@hono/node-server';
import { readFile } from 'fs/promises';

const app = new Hono();

// Middleware untuk Swagger UI
app.get('/docs', swaggerUI({ url: '/api-docs' }));

// Endpoint untuk mendapatkan data pengguna
app.get('/users', (c) => {
  return c.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ]);
});

// Endpoint untuk mendapatkan detail pengguna berdasarkan ID
app.get('/users/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ id: id, name: 'John Doe' });
});

// Endpoint untuk menambahkan pengguna baru
app.post('/users', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'User created', user: body }, 201);
});

// Endpoint untuk memperbarui pengguna berdasarkan ID
app.put('/users/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  return c.json({ message: 'User updated', id: id, user: body });
});

// Endpoint untuk menghapus pengguna berdasarkan ID
app.delete('/users/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'User deleted', id: id });
});

// Endpoint untuk dokumentasi API dalam format OpenAPI
app.get('/api-docs', async (c) => {
  const swaggerJson = await readFile('./swagger.json', 'utf-8');
  return c.json(JSON.parse(swaggerJson));
});

// Jalankan server menggunakan @hono/node-server
serve(app, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
