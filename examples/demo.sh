#!/usr/bin/env bash -ex

curl -X POST --data-binary "@./add_two_numbers.ts" http://localhost:8080/module
curl -X POST --data '{"mid":"src_1"}'  http://localhost:8080/spawn
curl http://localhost:8080/process/pid_1