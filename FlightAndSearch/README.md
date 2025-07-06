/

        -src/
          index.js// server
          model.js/
          controllers/
          middlewares/
          services/
          utils/
          config/
        -tests/[later]
        -static/
        -temp/
{
  "development":{
    "username":<Your_DB_LOGIN_NAME>
    "password":<YOUR_DB_PASSWORD>
    "database":"Flights_Search_DB_DEV
    "dialect":"mysql"
  }
}
'''''
-Once you have added your db config as listed above,go to the src folder from your terminal and execute `npx sequelize db:create`

`npx sequelize db:migrate`

        ## DB Design
         -Airplane Table
         -Flight
         -Airport
         -City
        
        -A flight belongs to an airplane but one airplane can be ued int multiple flights
        -A city has many airports but one airport belongs to a city
        -One airport can have many flights ,but a flight belong to one airport 

      ## Tables

      ### City ->id,name,created_at,updated_at
      ###Airport->id,name,address,city_id,created_at,updated_at
       Relationship->City has many airport and Airport belongs to one city(one to many)

       npx sequeize model:generate --name Airport --attributes name:string,address:String,cityId:integer