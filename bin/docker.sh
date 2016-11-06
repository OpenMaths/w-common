#!/bin/bash

set -e

dockerfile_path=./bin/Dockerfile
project_name=openmaths-148214
cluster_name=openmaths
cloudsdk_compute_zone=europe-west1-b
external_registry_endpoint=eu.gcr.io/${project_name}
cloudsdk_service_key_path=gcloud-service-key.json
container_name=w-common
container_port=80
container_port_local=5201
image_name=${external_registry_endpoint}/${container_name}

function show_help {
    echo "-h    shows this dialog"
    echo "-b    builds docker image"
    echo "-p    builds docker image"
    echo "-l    script treated as if run in local environment"
}

while getopts "h?bpl" opt; do
    case "$opt" in
    h|\?)
        show_help
        exit 0
        ;;
    b)  build=true
        ;;
    p)  push=true
        ;;
    l)  local=true
        ;;
    esac
done

shift $((OPTIND-1))

[ "$1" = "--" ] && shift

if [ "${build}" = "true" ]; then
    echo "[mode=BUILD]"

    if [ "${local}" = "true" ]; then
        echo "[mode=LOCAL]"

        docker rm -f ${container_name} || true
        docker build -f ${dockerfile_path} -t ${image_name}:latest .
    else
        # ensure that .env is present and configured correctly in non-local environment
        docker build --rm=false -f ${dockerfile_path} -t ${image_name}:latest .
    fi
    
    docker run -d -p ${container_port_local}:${container_port} --name ${container_name} ${image_name}:latest; sleep 5
    echo "[Testing whether ${container_name} responds on port ${container_port_local}]"
    curl --retry 10 --retry-delay 5 -v http://localhost:${container_port_local}

    if [ "${CIRCLE_SHA1}" ]; then
        docker tag ${image_name}:latest ${image_name}:${CIRCLE_SHA1}
    fi
fi

if [ "${push}" = "true" ]; then
    echo "[mode=PUSH]"

    # ensure that gcloud-service-key.json is present and configured correctly in non-local environment
    gcloud --quiet auth activate-service-account --key-file ${cloudsdk_service_key_path}
    gcloud --quiet config set project ${project_name}
    gcloud --quiet config set container/cluster ${cluster_name}
    gcloud --quiet config set compute/zone ${cloudsdk_compute_zone}
    gcloud --quiet docker -- push ${image_name}
fi