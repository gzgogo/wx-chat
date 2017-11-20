/**
 * Created by G.zhen on 2015/11/9.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            //Compact Format
            all: {
                src: ['build/**', '!build']
            },
            html: {
                src: ['build/*.html']
            },
            css: {
                src: ['build/css/**.css']
            },
            js: {
                src: ['build/js/**.js']
            }
        },
        copy: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['**'],
                        dest: 'build'}
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['*.html'],
                        dest: 'build/js'}
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/css',
                        src: ['**.css'],
                        dest: 'build/css'}
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/js',
                        src: ['**.js'],
                        dest: 'build/js'}
                ]
            }
        },
        //为css3属性添加前缀
        autoprefixer: {
            build: {
                //动态文件对象
                file: [
                    {
                        expand: true,
                        cwd: 'build/css',
                        src: [ '*.css' ],
                        dest: 'build/css'
                    }
                ]
            }
        },
        //压缩css
        cssmin: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //美化代码
                beautify: {
                    //中文ascii化，非常有用！防止中文乱码的神配置
                    ascii_only: true
                }
            },
            build: {
                files: [
                    {
                        expand: true,
                        //相对路径
                        cwd: 'build/css',
                        src: '*.css',
                        dest: 'build/css'
                    }
                ]
            }
        },
        //压缩js
        uglify: {
            build: {
                options: {
                    mangle: false, //不混淆变量名
                    preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                    footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
                },
                files: [
                    {
                        expand: true,
                        //相对路径
                        cwd: 'build/js',
                        src: '*.js',
                        dest: 'build/js/'
                    }
                ]
            }
        },
        jshint: {
            src: 'build/js/*.js'
        },
        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: false,
                removeRedundantAttributes: false,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'build',
                        src: ['*.html'],
                        dest: 'build'
                    }
                ]
            }
        },
        watch: {
            scripts: {
                files: ['app/js/index.js','app/js/chat.js'],
                tasks: ['clean:js','copy:js','jshint','uglify']
            },
            css: {
                files: ['app/css/*.css'],
                tasks: ['clean:css','copy:css','cssmin']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'build/index.html',
                    'build/css/common.css',
                    'build/css/index.css',
                    'build/js/index.js'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            server: {
                options: {
                    port: 9001,
                    base: './build'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('mincss', ['cssmin']);
    grunt.registerTask('addprefix', ['autoprefixer']);
    grunt.registerTask('minjs', ['uglify']);
    grunt.registerTask('checkjs', ['jshint']);
    grunt.registerTask('default',['clean:all','copy:all','autoprefixer','cssmin','jshint','uglify','connect','watch']);
};