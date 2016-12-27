# Topic Study Todos

PRIMARY: refactor data from REST to just be array of objects (instead of array with quotes and verses props).
Tried using `Promise.all()`, but the result was the same as `Observable.forkJoin()`. The solution must be a custom
shim (maybe `{option.soft}` as a 2nd param) to handle x requests & return an array with `null` for failed requests.

1. Functionality 1-2
2. Styles 4

## Styles

1. setup Sass structure to render specified component styles (use native Sass compiler opts)
2. install Bourbon
3. style app (at least layout) before continuing dev
4. finish styling app

## Functionality

1. wire up @Output @Input between topics - app module - topic-post
2. get toggling side panel working (mostly for mobile)
