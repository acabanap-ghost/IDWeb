import { describe, it } from 'node:test';
import assert from 'node:assert';

const BASE_URL = 'http://localhost:3000/api';

describe('Pruebas de integración - Backend', () => {
    let adminCookie = '';
    let userCookie = '';
    let createdItemId = null;

    it('Debe rechazar acceso al catálogo sin sesión activa (401)', async () => {
        const res = await fetch(`${BASE_URL}/catalogo`);
        const body = await res.json();

        assert.strictEqual(res.status, 401);
        assert.strictEqual(body.success, false);
    });

    it('Debe iniciar sesión como usuario común (rol user) y bloquear creación en catálogo (403)', async () => {
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: 'maria@unsa.edu.pe', password: '123456' })
        });
        const loginBody = await loginRes.json();
        userCookie = loginRes.headers.get('set-cookie');

        assert.strictEqual(loginRes.status, 200);
        assert.strictEqual(loginBody.data.rol, 'user');
        assert.ok(userCookie);

        // Puede consultar el catálogo
        const getRes = await fetch(`${BASE_URL}/catalogo`, {
            headers: { Cookie: userCookie }
        });
        assert.strictEqual(getRes.status, 200);

        // No debe poder crear elementos (solo admin)
        const postRes = await fetch(`${BASE_URL}/catalogo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: userCookie
            },
            body: JSON.stringify({
                nombre: 'Taller de Prueba',
                descripcion: 'Intento sin permisos',
                categoria: 'General',
                precio: 30
            })
        });
        const postBody = await postRes.json();

        assert.strictEqual(postRes.status, 403);
        assert.strictEqual(postBody.success, false);
    });

    it('Debe iniciar sesión como admin y consultar /me (200)', async () => {
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: 'juan@unsa.edu.pe', password: '123456' })
        });
        const loginBody = await loginRes.json();
        adminCookie = loginRes.headers.get('set-cookie');

        assert.strictEqual(loginRes.status, 200);
        assert.strictEqual(loginBody.success, true);
        assert.ok(adminCookie);

        const meRes = await fetch(`${BASE_URL}/auth/me`, {
            headers: { Cookie: adminCookie }
        });
        const meBody = await meRes.json();

        assert.strictEqual(meRes.status, 200);
        assert.strictEqual(meBody.data.rol, 'admin');
    });

    it('Debe crear, consultar por ID, actualizar y eliminar un elemento como admin (CRUD completo)', async () => {
        // 1. Crear (POST /api/catalogo)
        const createRes = await fetch(`${BASE_URL}/catalogo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: adminCookie
            },
            body: JSON.stringify({
                nombre: 'Taller de Natación',
                descripcion: 'Clases en piscina olímpica',
                categoria: 'Natacion',
                precio: 95
            })
        });
        const createBody = await createRes.json();

        assert.strictEqual(createRes.status, 201);
        assert.strictEqual(createBody.success, true);
        assert.strictEqual(createBody.data.nombre, 'Taller de Natación');
        createdItemId = createBody.data.id;

        // 2. Consultar por ID (GET /api/catalogo/:id)
        const getByIdRes = await fetch(`${BASE_URL}/catalogo/${createdItemId}`, {
            headers: { Cookie: adminCookie }
        });
        const getByIdBody = await getByIdRes.json();

        assert.strictEqual(getByIdRes.status, 200);
        assert.strictEqual(getByIdBody.data.id, createdItemId);

        // 3. Actualizar (PUT /api/catalogo/:id)
        const updateRes = await fetch(`${BASE_URL}/catalogo/${createdItemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Cookie: adminCookie
            },
            body: JSON.stringify({
                nombre: 'Taller de Natación Avanzada',
                descripcion: 'Entrenamiento competitivo',
                categoria: 'Natacion',
                precio: 110,
                estado: 'activo'
            })
        });
        const updateBody = await updateRes.json();

        assert.strictEqual(updateRes.status, 200);
        assert.strictEqual(updateBody.data.nombre, 'Taller de Natación Avanzada');
        assert.strictEqual(updateBody.data.precio, 110);

        // 4. Eliminar (DELETE /api/catalogo/:id)
        const deleteRes = await fetch(`${BASE_URL}/catalogo/${createdItemId}`, {
            method: 'DELETE',
            headers: { Cookie: adminCookie }
        });
        const deleteBody = await deleteRes.json();

        assert.strictEqual(deleteRes.status, 200);
        assert.strictEqual(deleteBody.success, true);

        // 5. Verificar que ya no existe (404)
        const notFoundRes = await fetch(`${BASE_URL}/catalogo/${createdItemId}`, {
            headers: { Cookie: adminCookie }
        });
        const notFoundBody = await notFoundRes.json();

        assert.strictEqual(notFoundRes.status, 404);
        assert.strictEqual(notFoundBody.success, false);
    });

    it('Debe cerrar sesión correctamente (200)', async () => {
        const logoutRes = await fetch(`${BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: { Cookie: adminCookie }
        });
        const logoutBody = await logoutRes.json();

        assert.strictEqual(logoutRes.status, 200);
        assert.strictEqual(logoutBody.success, true);
    });
});