Write me a set of bash scripts in the setProxy folder.

The first one, enableProxy.sh, should add these lines to .bashrc and then re-source it:

```sh
export http_proxy=http://127.0.0.1:8000
export https_proxy=http://127.0.0.1:8000
export HTTP_PROXY=http://127.0.0.1:8000
export HTTPS_PROXY=http://127.0.0.1:8000
```

The second one, disableProxy.sh, should undo these changes.