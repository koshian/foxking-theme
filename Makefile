TARGET=~/Dropbox/Public

all: foxking.min.css hatenablog.min.js

foxking.css: foxking.less
	lessc -x --02 foxking.less >foxking.css

foxking.min.css: foxking.css
	yuicompressor foxking.css > foxking.min.css

hatenablog.min.js: hatenablog.js
	yuicompressor hatenablog.js > hatenablog.min.js

clean:
	rm -f foxking.css foxking.min.css hatenablog.min.js

install: foxking.min.css hatenablog.min.js
	install -C foxking.min.css $(TARGET)/foxking.css
	install -C hatenablog.min.js $(TARGET)/hatenablog.js

