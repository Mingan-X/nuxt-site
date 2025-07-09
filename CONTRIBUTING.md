# Contributing Guide

## Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Examples

```bash
feat: add user authentication
fix: resolve memory leak in image processing
docs: update API documentation
style: format code with prettier
refactor: extract utility functions
perf: optimize database queries
test: add unit tests for user service
build: update webpack configuration
ci: add GitHub Actions workflow
chore: update dependencies
```

### Scopes (Optional)

You can add a scope to provide additional contextual information:

```bash
feat(auth): add login functionality
fix(ui): resolve button alignment issue
docs(api): update endpoint documentation
```

## Release Process

This project uses [release-it](https://github.com/release-it/release-it) for automated versioning and changelog generation.

### Available Scripts

- `pnpm run release:dry` - Dry run to see what would be released
- `pnpm run release` - Interactive release (will prompt for version)
- `pnpm run release:patch` - Release a patch version (0.0.x)
- `pnpm run release:minor` - Release a minor version (0.x.0)
- `pnpm run release:major` - Release a major version (x.0.0)
- `pnpm run release:alpha` - Release an alpha pre-release
- `pnpm run release:beta` - Release a beta pre-release

### Before Releasing

1. Ensure all changes are committed
2. Make sure you're on the main/master branch
3. Run tests to ensure everything works
4. Run `pnpm run release:dry` to preview the release

### Semantic Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version when you make incompatible API changes
- **MINOR** version when you add functionality in a backwards compatible manner
- **PATCH** version when you make backwards compatible bug fixes
