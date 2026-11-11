# Testing Strategy & Commands

> **Agent Instruction:** Every new feature or bug fix MUST include tests. Follow the testing patterns below. Do NOT skip tests to "save time."

## Test Commands

<!-- TODO: Replace with your actual test commands -->

| Command | Purpose |
|---------|---------|
| `npm test` | Run full test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test -- path/to/file.test.js` | Run a specific test file |
| `npm run lint` | Run linter |

## Testing Standards

*(Adapted from [apache/airflow](https://github.com/apache/airflow/blob/-/AGENTS.md) testing patterns)*

- Add tests for new behavior — cover **success**, **failure**, and **edge cases**.
- Test file locations mirror source: `backend/services/auth.js` → `backend/tests/services/auth.test.js`.
- Use descriptive test names: `should return 404 when user not found` not `test1`.
- Use mocking sparingly — prefer real implementations where possible.
- Do NOT mock what you don't own unless absolutely necessary.

## Test Structure

```javascript
describe('UserService', () => {
  describe('findById', () => {
    it('should return the user when found', async () => {
      // Arrange
      const userId = '123';
      // Act
      const result = await userService.findById(userId);
      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(userId);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      await expect(userService.findById('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });
});
```

## Coverage Expectations

<!-- TODO: Set your actual coverage thresholds -->

| Metric | Minimum |
|--------|---------|
| Statements | 70% |
| Branches | 60% |
| Functions | 70% |
| Lines | 70% |

## What to Test

| Layer | What to test |
|-------|-------------|
| Controllers | HTTP status codes, response format, input validation |
| Services | Business logic, error cases, edge cases |
| Models | Query correctness, data transformations |
| Utils | All public functions with various inputs |

---

*(Maintainers: Update commands and coverage thresholds for your actual project.)*
