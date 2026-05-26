# Code Examples & Patterns

> **Agent Instruction:** Follow the approved patterns below. If you find yourself writing something that looks like an anti-pattern, stop and reconsider.

## ✅ Approved Patterns

### API Endpoint Pattern

```javascript
// Controller: handles HTTP only
const getUser = async (req, res) => {
  const user = await userService.findById(req.params.id);
  res.json(user);
};

// Service: contains business logic
const findById = async (id) => {
  const user = await userModel.findUnique({ where: { id } });
  if (!user) throw new NotFoundError('User not found');
  return user;
};
```

### Error Handling Pattern

```javascript
// Use standardized error response format
res.status(400).json({
  error: {
    code: "VALIDATION_ERROR",
    message: "Email is required."
  }
});
```

### Import Pattern

```javascript
// Group imports: external → internal → relative
import express from 'express';
import { validateInput } from '@/middleware/validation';
import { UserService } from './userService';
```

## ❌ Anti-Patterns — Do NOT Use

### ❌ Business Logic in Controllers

```javascript
// BAD: controller doing too much
const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ error: 'Not found' });
  const enriched = { ...user, fullName: `${user.first} ${user.last}` };
  res.json(enriched);
};
```

### ❌ Direct DB Access Outside Models

```javascript
// BAD: service accessing DB directly
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// Always use model layer instead
```

### ❌ Hardcoded Configuration

```javascript
// BAD
const API_URL = 'https://api.example.com';

// GOOD
const API_URL = process.env.API_URL;
```

### ❌ Swallowing Errors

```javascript
// BAD
try { await doSomething(); } catch (e) { /* silent */ }

// GOOD
try { await doSomething(); } catch (e) { logger.error('Failed:', e); throw e; }
```

---

*(Maintainers: Add examples from your actual codebase. Replace the generic examples above with real patterns specific to your project.)*
