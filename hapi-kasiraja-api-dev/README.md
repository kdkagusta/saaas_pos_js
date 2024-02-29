## kasirAja API
contoh rest api POS ( point of sales ) built with hapi.js

### frontend
`ReactJS Web App - kasirAja`: [Link](https://github.com/ajikamaludin/react-kasiraja-web)

`React Native Mobile App - kasirAja`: [Link](https://github.com/ajikamaludin/react-native-kasiraja-mobile)

### table structure
![table structure](https://github.com/ajikamaludin/hapi-kasiraja-api/raw/dev/documents/tables.png)
### feature
- PostgreSQL database
- bisa lebih dari 1 toko `multi store`
- bisa lebih dari 1 kasir `multi users`
- pengelolaan kategori, produk, stok, dan pelanggan
- pembelian
- penjualan
- diskon penjualan

### documention API
`Postman (import file)` : [Link](https://github.com/ajikamaludin/hapi-kasiraja-api/tree/dev/documents/postman-collection)

### Support me

<a href="https://trakteer.id/ajikamaludin" target="_blank"><img id="wse-buttons-preview" src="https://cdn.trakteer.id/images/embed/trbtn-blue-2.png" height="40" style="border:0px;height:40px;" alt="Trakteer Saya"></a>


### start 
- install

        npm install

- config .env file for database

        cp .env.example .env

- migrate database

        npm run migrate up

- run the app

        npm run start

- test

        curl -i -H 'Accept: application/json' http://localhost:5000/

response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
	    "status": Ok!
    }
