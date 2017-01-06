# gulpfile

## Install

1: Install modules

```shell
npm install
```

2: Install Ruby and [scss-lint](https://github.com/brigade/scss-lint)

```shell
gem install scss_lint
```

3: Set up folder structure

```
.
├── assets
│   ├── scripts
│   └── styles
│       └── partials
├── dist
    ├── scripts
    ├── styles
    └── images
```

## Usage

1: Watch changes in scss and js files and generate the sourcemaps

```shell
gulp
```

2: Generate minified / uglified css and js files without sourcemaps

```shell
gulp production
```