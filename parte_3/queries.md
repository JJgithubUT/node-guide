## 🔷 1. ¿Qué son las consultas para APIs?

Cuando haces una petición a una **API REST**, puedes incluir parámetros para **filtrar**, **ordenar**, **buscar**, **limitar resultados**, etc. Estos parámetros se colocan en la **URL**, después del signo de interrogación (`?`) y separados por `&`.

---

## 🔷 2. Sintaxis general de consultas en URLs

```
/endpoint?clave1=valor1&clave2=valor2
```

**Ejemplo:**

```
/movies?genre=action&year=2024
```

---

## 🔷 3. Tipos comunes de consultas (Query Parameters)

### ✅ a) **Filtro simple**

Usado para filtrar recursos por valores exactos.

```url
GET /movies?genre=action
```

### ✅ b) **Múltiples filtros**

Puedes combinar varios parámetros.

```url
GET /movies?genre=action&year=2024&rating=PG-13
```

### ✅ c) **Ordenamiento**

Convención común: usar `sort` o `order`.

```url
GET /movies?sort=title        → ascendente
GET /movies?sort=-title       → descendente (con signo -)
```

Algunos usan parámetros separados:

```url
GET /movies?sort_by=year&order=desc
```

### ✅ d) **Paginación**

Controlar cuántos resultados quieres por página.

```url
GET /movies?page=2&limit=10
```

### ✅ e) **Búsqueda parcial (like o contains)**

Buscar coincidencias.

```url
GET /movies?title_like=batman
GET /movies?title_contains=dark
```

(La clave varía según el backend o librería que uses, como `json-server`, `Mongo`, `Django`, etc.)

---

## 🔷 4. Expresiones avanzadas (filtros condicionales)

Dependen del framework o sistema, pero aquí hay convenciones típicas:

| Expresión    | Significado               | Ejemplo                          |
| ------------ | ------------------------- | -------------------------------- |
| `gt`         | Greater Than (>)          | `/movies?year_gt=2020`           |
| `gte`        | Greater Than or Equal (≥) | `/movies?rating_gte=7`           |
| `lt`         | Less Than (<)             | `/movies?duration_lt=90`         |
| `lte`        | Less Than or Equal (≤)    | `/movies?rating_lte=8`           |
| `ne` o `not` | Not Equal (!=)            | `/movies?genre_ne=romance`       |
| `in`         | Dentro de lista           | `/movies?genre_in=action,comedy` |
| `nin`        | No está en la lista       | `/movies?year_nin=2000,2001`     |

---

## 🔷 5. URL Parameters vs Query Parameters

| Tipo             | Ejemplo                          | Uso común             |
| ---------------- | -------------------------------- | --------------------- |
| URL Parameters   | `/movies/:id` → `/movies/123`    | Identificar recurso   |
| Query Parameters | `/movies?genre=action&year=2024` | Filtrar, buscar, etc. |

---

## 🔷 6. Operadores lógicos (si el backend lo permite)

* `AND`: al combinar varios parámetros:
  `/movies?genre=action&year=2023`

* `OR`: no siempre está disponible, pero algunas APIs lo permiten:
  `/movies?genre=action,comedy`

* `NOT`: depende de la API:
  `/movies?genre_ne=romance`

---

## 🔷 7. Regex y expresiones regulares en consultas

Algunas APIs soportan búsquedas con expresiones regulares, ejemplo en MongoDB o ciertas APIs avanzadas:

```url
/movies?title=/^The/
```

En `path-to-regexp` en Node.js puedes definir rutas que usan expresiones:

```js
app.get('/movies/:id(\\d+)', ...)
```

Eso solo permite que `:id` sean dígitos.

---

## 🔷 8. Buenas prácticas

* Escapar caracteres especiales (espacios como `%20`)
* Usar nombres de parámetros consistentes
* No exponer datos sensibles en URLs
