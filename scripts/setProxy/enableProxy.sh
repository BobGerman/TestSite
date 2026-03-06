#!/bin/bash

# Add proxy settings to .bashrc
echo "export http_proxy=http://127.0.0.1:8000" >> ~/.bashrc
echo "export https_proxy=http://127.0.0.1:8000" >> ~/.bashrc
echo "export HTTP_PROXY=http://127.0.0.1:8000" >> ~/.bashrc
echo "export HTTPS_PROXY=http://127.0.0.1:8000" >> ~/.bashrc

# Re-source .bashrc to apply changes
source ~/.bashrc

echo "Proxy settings enabled"