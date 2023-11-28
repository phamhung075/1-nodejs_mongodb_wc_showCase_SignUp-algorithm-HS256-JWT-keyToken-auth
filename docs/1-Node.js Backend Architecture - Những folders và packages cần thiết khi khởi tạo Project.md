![[Pasted image 20231126083104.png]]

VS extension

![[Pasted image 20231126092230.png]]
khởi động dự án
## File và folder cần thiết bắt đầu dự án nodejs

``` 
npm init -y // không cần điền thông tin ta muốn -> ra packet json luôn
```


tạo các file và folder sau:
file server là file khởi động network nodejs chứ không phải file khai báo như middleware
folder models: ánh xạ tới controller
controllers : không thể thiếu
services :
utils : chứa hàm, classe, tính năng thường hay sử dụng
configs : khác .env 


![[Pasted image 20231126084919.png]]

code khởi động dự án
``` 
npm i express --save
```

package-lock.json : tracking các file ta đã cài

.gitignore
ctrl + shift + P > add gitignore (require extension git ignore)

![[Pasted image 20231126092205.png]]


app.js
``` js
const express = require ('express')
const app = express()

// init middlewares

// init db

// init router

// hanling error

module.exports = app


```

server.js
khai báo port, không chỉnh sửa nữa sau khi tạo, thông thin sẽ chỉnh sửa trong app.js
``` js
const app = require("./src/app");
const PORT = 3055;
const server = app.listen( PORT , () => {
    console.log(`WSV eCommerce start with port ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit Server Express`))
});

```

trong java, lập trình OOP, có tính kế thừa, đóng gói ...
trong typescript, javascript hướng vào export module, người ta đem hướng đối tượng đưa vào module này module khác, đóng gói trong chính module đó, javascript mang hơi hướng lập trình đối tượng, thay vì đối tượng, người ta sẽ sử dụng module