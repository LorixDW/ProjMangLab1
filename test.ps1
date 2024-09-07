Param(
    [string]$image = $(throw "Scipt require image parametr"),
    [string]$version = $(throw "Script require version parametr"),
    [bool]$rm = $false
)

Write-host $image 
Write-host $version
Write-host $rm

if($rm){
    docker stop $(docker ps -aq --filter ancestor=$image)
    docker rm $(docker ps -aq --filter ancestor=$image)
}
docker rmi $image
docker build --tag $image .
docker image tag $image ${image}:${version}