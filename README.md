# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

安装依赖的过程如果报错如下：

```bash
node_modules/.pnpm/better-sqlite3@11.8.1/node_modules/better-sqlite3: Running install script, failed in 22s
.../node_modules/better-sqlite3 install$ prebuild-install || node-gyp rebuild --release
│ prebuild-install warn install connect ETIMEDOUT 20.205.243.166:443
│ C:\myself\nuxt-site\node_modules\.pnpm\better-sqlite3@11.8.1\node_modules\better-sqlite3>if not defined npm_config_node_gyp (node "C:\Us…
│ gyp info it worked if it ends with ok
│ gyp info using node-gyp@11.1.0
│ gyp info using node@18.16.0 | win32 | x64
│ gyp ERR! find Python
│ gyp ERR! find Python Python is not set from command line or npm configuration
│ gyp ERR! find Python Python is not set from environment variable PYTHON
│ gyp ERR! find Python checking if the py launcher can be used to find Python 3
│ gyp ERR! find Python - executable path is ""
│ gyp ERR! find Python - "" could not be run
│ gyp ERR! find Python checking if "python3" can be used
│ gyp ERR! find Python - executable path is ""
│ gyp ERR! find Python - "" could not be run
│ gyp ERR! find Python checking if "python" can be used
│ gyp ERR! find Python - executable path is ""
│ gyp ERR! find Python - "" could not be run
│ gyp ERR! find Python checking if Python is C:\Users\DBC20250317\AppData\Local\Programs\Python\Python311\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Users\DBC20250317\AppData\Local\Programs\Python\Python311\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files\Python311\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files\Python311\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Users\DBC20250317\AppData\Local\Programs\Python\Python311-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Users\DBC20250317\AppData\Local\Programs\Python\Python311-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files\Python311-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files\Python311-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files (x86)\Python311-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files (x86)\Python311-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Users\DBC20250317\AppData\Local\Programs\Python\Python310\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Users\DBC20250317\AppData\Local\Programs\Python\Python310\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files\Python310\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files\Python310\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Users\DBC20250317\AppData\Local\Programs\Python\Python310-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Users\DBC20250317\AppData\Local\Programs\Python\Python310-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files\Python310-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files\Python310-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files (x86)\Python310-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files (x86)\Python310-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Users\DBC20250317\AppData\Local\Programs\Python\Python39\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Users\DBC20250317\AppData\Local\Programs\Python\Python39\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files\Python39\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files\Python39\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Users\DBC20250317\AppData\Local\Programs\Python\Python39-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Users\DBC20250317\AppData\Local\Programs\Python\Python39-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files\Python39-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files\Python39-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files (x86)\Python39-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files (x86)\Python39-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Users\DBC20250317\AppData\Local\Programs\Python\Python38\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Users\DBC20250317\AppData\Local\Programs\Python\Python38\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files\Python38\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files\Python38\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Users\DBC20250317\AppData\Local\Programs\Python\Python38-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Users\DBC20250317\AppData\Local\Programs\Python\Python38-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files\Python38-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files\Python38-32\python.exe" could not be run
│ gyp ERR! find Python checking if Python is C:\Program Files (x86)\Python38-32\python.exe
│ gyp ERR! find Python - version is ""
│ gyp ERR! find Python - version is  - should be >=3.6.0
│ gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
│ gyp ERR! find Python - "C:\Program Files (x86)\Python38-32\python.exe" could not be run
│ gyp ERR! find Python
│ gyp ERR! find Python **********************************************************
│ gyp ERR! find Python You need to install the latest version of Python.
│ gyp ERR! find Python Node-gyp should be able to find and use Python. If not,
│ gyp ERR! find Python you can try one of the following options:
│ gyp ERR! find Python - Use the switch --python="C:\Path\To\python.exe"
│ gyp ERR! find Python (accepted by both node-gyp and npm)
│ gyp ERR! find Python - Set the environment variable PYTHON
│ gyp ERR! find Python - Set the npm configuration variable python:
│ gyp ERR! find Python npm config set python "C:\Path\To\python.exe"
│ gyp ERR! find Python For more information consult the documentation at:
│ gyp ERR! find Python https://github.com/nodejs/node-gyp#installation
│ gyp ERR! find Python **********************************************************
│ gyp ERR! find Python
│ gyp ERR! configure error
│ gyp ERR! stack Error: Could not find any Python installation to use
│ gyp ERR! stack at PythonFinder.fail (C:\Users\DBC20250317\AppData\Roaming\nvm\v18.16.0\node_modules\pnpm\dist\node_modules\node-gyp\lib\…
│ gyp ERR! stack at PythonFinder.findPython (C:\Users\DBC20250317\AppData\Roaming\nvm\v18.16.0\node_modules\pnpm\dist\node_modules\node-gy…
│ gyp ERR! stack at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
│ gyp ERR! stack at async configure (C:\Users\DBC20250317\AppData\Roaming\nvm\v18.16.0\node_modules\pnpm\dist\node_modules\node-gyp\lib\co…
│ gyp ERR! stack at async run (C:\Users\DBC20250317\AppData\Roaming\nvm\v18.16.0\node_modules\pnpm\dist\node_modules\node-gyp\bin\node-gyp…
│ gyp ERR! System Windows_NT 10.0.26100
│ gyp ERR! command "C:\\Program Files\\nodejs\\node.exe" "C:\\Users\\DBC20250317\\AppData\\Roaming\\nvm\\v18.16.0\\node_modules\\pnpm\\dis…
│ gyp ERR! cwd C:\myself\nuxt-site\node_modules\.pnpm\better-sqlite3@11.8.1\node_modules\better-sqlite3
│ gyp ERR! node -v v18.16.0
│ gyp ERR! node-gyp -v v11.1.0
│ gyp ERR! not ok
└─ Failed in 22s at C:\myself\nuxt-site\node_modules\.pnpm\better-sqlite3@11.8.1\node_modules\better-sqlite3
 ELIFECYCLE  Command failed with exit code 1.
```

解决方案：

```js
npm config set proxy http://your-proxy:port
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
