//! docker build ------------------

//? docker build .

//! check build image ------------- single file with all the dependency and lib to eun the pogram 
//? docker image ls

// ! run the image in a container 
// ? docker run image_ID

// ! Ccheck runing container check 
// ? docker ps

//! stop runing container 
// ? docker stop container_id

// ! container ar baire app ke access krte port binding korte hbe  taholei sei app ke container ar baire theke access kora jabe ..for this ---------------------

// ? docker run -p 3001:3000 image_id

// ! container ke run korar pore setar terminal stack hoye thake sei terminal ke r use kra jaina tai container ke run krar somoy detached mood a run krte hoi 
// ? docker run -d -p 30001:3000 image_id

// ! same app ,same port multiple container a run kora possible karon protita container individually akta env hoye jai kono container ar sathe segulor relation thakena ..abr kono container a multiple image run kora jabe alada alada port a 

// ! all container (runnnind  ,stop , all)
// ? docker ps -a

// ! container  remove korte ---------
// ? docker rm container_id/name

// ! if any container's need -- stop korlei sathe sathe removw hoye jabe
// ? docker run -d --rm -p 3001:3000 image_id

// ! container run korar time a kono custome name set krte hole 
// ? docker run -d --rm --name "myapp" -p 3001:3000 image_id

// ! docker image build ar somoy image ar name and tag deya jai 
// ? docker build -t name:tag .

// ! docker image remove krte --------
//? docker rmi name:tag

// ! kono pogram ar terminal ke use kre user input niye kaj krte hole interactive mood niye kaj krte hbe jekhane terminal ke use krte parbe 
// ? docker run -it image_id

// ! docker hub a image ke push korte hole --------------
// ? docker push dockerhubrepo:tag

// ! existing docker image ar tag and name change krte hole 
// ? docker tag oldname:tag newname:tag

// ! docker volume : jokhon container ar baire kono repo/directory te run kora container programer ar data,file aigulo rakhar need hoi and sei container remove hoye geleo jen sei file ,data gulo thake tokhon volume use kra hoi 

// ? docker run -it --rm -v myvolume:/myapp/ image_id

// ! volume related command 
// ? docker volume --help

// ! kono image build ar jonne env variable ar need hole --like database credentials for database image build 
//? docker run -d --env envVariable_name=value --name mysqldb mysql

// ! kono container ar details like inspect details dekhar jonne 
// ? docker inspect container_name
