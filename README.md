# gulpfile

## Install

1: Install modules

```shell
npm install
```

2: Install [scss-lint](https://github.com/brigade/scss-lint) with Ruby being installed

```shell
gem install scss_lint
```

3: Set up folder structure

```
.
├── assets
│   ├── scripts
|   ├── images
│   └── styles
│       └── partials
├── dist
    ├── scripts
    ├── styles
    └── images
```

## Usage

1: Build

```
gulp build
```

2: Watch changes in scss and js files and generate the sourcemaps

```shell
gulp
```

3: Generate minified / uglified css and js files without sourcemaps

```shell
gulp production
```

