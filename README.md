# Gulp for Gold - Ulitmate Lightweight Boilerplate
A starting point for static sites using Gulp, PostCSS, Rucksack (PostCSS), H5BP, Nunjucks and BrowserSync

![alt tag](http://ahmed-badawy.com/blog/wp-content/uploads/2015/02/gulp.png)


## Usage
- Clone then `npm install` to suck in the dependencies.
- Run `gulp build` to build your `src` files, which will be rendered in `./build`.
- Or run `gulp` to build and fire up a BrowserSync server at `localhost:4444`.

## Structure
- Templates live in `./src/templates`.
- Pages live in `./src/html`.
- CSS lives in `./src/styles`.
- JS lives in `./src/scripts`.
- Fonts lives in `./src/fonts`.
- Images & SVGs lives in `./src/images`.

## Includes
- sexy CSS-File (@import) Structure
- webpack: https://github.com/shama/webpack-stream + sourcemaps + babel es6 features
- preCSS [postCSS]: https://github.com/jonathantneal/precss
- autoprefixer [postCSS]: https://github.com/postcss/autoprefixer
- postcss-inline-svg [postCSS]: https://github.com/TrySound/postcss-inline-svg
- flexboxgrid: http://flexboxgrid.com/ 
- lost [postCSS]: https://github.com/peterramsing/lost (alternative for flexbox)
- browserSync: https://www.browsersync.io/
- rucksack: https://simplaio.github.io/rucksack/
- imagemin + pngquant: https://www.npmjs.com/package/gulp-imagemin
- nunjucks: https://mozilla.github.io/nunjucks/
- html 5 Boilerplate: https://html5boilerplate.com/
- gulp FTP: https://www.npmjs.com/package/gulp-ftp

