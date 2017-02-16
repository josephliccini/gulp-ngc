'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var gulp = _interopDefault(require('gulp'));
var through = _interopDefault(require('through2'));
var _angular_compilerCli_src_main = require('@angular/compiler-cli/src/main');

var index = (configPath) => {
    let args = {
        _: [],
        p: configPath
    };

    return gulp.src(configPath)
        .pipe(through.obj((file, encoding, callback) => {
            _angular_compilerCli_src_main.main(args)
                .then((code) => {
                    let err = code === 0
                        ? null
                        : new gutil.PluginError(
                            'gulp-ngc',
                            'Compilation error. See details in the ngc output',
                            {fileName: file.path});
                    callback(err, file);
                });
        }));
};

module.exports = index;
