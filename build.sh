#!/bin/sh
basePath=$(pwd)

$(hash node 2>/dev/null)
if ! [ $? ]; then
    echo -e "\t\t请先安装nodejs -------> https://nodejs.org/"
    exit 1
else
    echo -e "\t\t nodejs\t\t $(node --version)"
fi

$(hash npm 2>/dev/null)
if ! [ $? ]; then
    echo -e "\t\t Can't find command npm"
    exit 1
else
    echo -e "\t\t npm\t\t $(npm --version)"
fi

$(hash ng 2>/dev/null)
if ! [ $? ]; then
    echo -e "\t\tinstall angular cli to build the project"
    npm install -g @angular/cli
else
    echo -e "\t\t angular-cli\t\t $(ng --version)"
fi

# index
echo -e "\t\tBuild for index page "
cd ./index && npm install && ng build --prod

cd ./dist/index/ && tar -cf index.tar ./* && cp index.tar $basePath

cd "$basePath"

# admin
echo -e "\t\tBuild for admin page "
cd $basePath/admin && npm install && ng build --prod
cd ./dist/admin/ && sed '6s/\"\/\"/\"\/admin\/\"/g' index.html > index.txt && cp index.txt index.html
 cd .. && tar -cf admin.tar ./admin/ && cp admin.tar $basePath
