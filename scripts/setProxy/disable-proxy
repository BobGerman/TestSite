#!/bin/bash

# Remove proxy settings from .bashrc
sed -i '/export http_proxy=http:\/\/127.0.0.1:8000/d' ~/.bashrc
sed -i '/export https_proxy=http:\/\/127.0.0.1:8000/d' ~/.bashrc
sed -i '/export HTTP_PROXY=http:\/\/127.0.0.1:8000/d' ~/.bashrc
sed -i '/export HTTPS_PROXY=http:\/\/127.0.0.1:8000/d' ~/.bashrc

# Re-source .bashrc to apply changes
source ~/.bashrc

echo "Proxy settings disabled"